import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Payload = Record<string, unknown>;

function clean(value: unknown, max = 7000) {
  return String(value ?? "").trim().slice(0, max);
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function htmlEscape(value: string) {
  return value.replace(
    /[&<>'"]/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;",
      }[char] || char)
  );
}

function label(key: string) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (value) => value.toUpperCase());
}

export async function POST(req: Request) {
  try {
    const raw = (await req.json()) as Payload;

    // Honeypot bot protection
    if (clean(raw.website, 200)) {
      return NextResponse.json({
        message:
          "Thank you. ENASH has received your questionnaire.",
      });
    }

    const pages = Array.isArray(raw.pages)
      ? raw.pages
          .map((page) => clean(page, 100))
          .filter(Boolean)
          .join(", ")
      : clean(raw.pages);

    const submission = {
      lodgeName: clean(raw.lodgeName, 180),
      existingWebsite: clean(raw.existingWebsite, 300),
      location: clean(raw.location, 300),
      contactNumber: clean(raw.contactNumber, 100),
      businessEmail: clean(raw.businessEmail, 180),
      employees: clean(raw.employees, 30),

      numberOfRooms: clean(raw.numberOfRooms, 30),
      checkIn: clean(raw.checkIn, 50),
      checkOut: clean(raw.checkOut, 50),
      roomTypes: clean(raw.roomTypes, 7000),
      prices: clean(raw.prices, 7000),
      guestCapacity: clean(raw.guestCapacity, 5000),
      seasonalPricing: clean(raw.seasonalPricing, 7000),

      availability: clean(raw.availability, 100),
      roomSelection: clean(raw.roomSelection, 100),
      paymentRequirement: clean(
        raw.paymentRequirement,
        100
      ),
      paymentProvider: clean(raw.paymentProvider, 100),
      cancellationPolicy: clean(
        raw.cancellationPolicy,
        7000
      ),
      bookingRequirements: clean(
        raw.bookingRequirements,
        7000
      ),

      pages,

      logoAvailable: clean(raw.logoAvailable, 100),
      professionalPhotos: clean(
        raw.professionalPhotos,
        100
      ),
      socialMedia: clean(raw.socialMedia, 3000),
      whatsapp: clean(raw.whatsapp, 100),
      additionalInformation: clean(
        raw.additionalInformation,
        7000
      ),

      receivedAt: new Date().toISOString(),
    };

    if (
      !submission.lodgeName ||
      !submission.businessEmail ||
      !isEmail(submission.businessEmail)
    ) {
      return NextResponse.json(
        {
          error:
            "Please provide a valid lodge name and business email address.",
        },
        { status: 400 }
      );
    }

    if (
      !submission.location ||
      !submission.contactNumber ||
      !submission.numberOfRooms ||
      !submission.roomTypes ||
      !submission.prices ||
      !submission.availability ||
      !submission.roomSelection ||
      !submission.paymentRequirement
    ) {
      return NextResponse.json(
        {
          error:
            "Please complete all required questionnaire fields.",
        },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.ENASH_CONTACT_TO;
    const from = process.env.RESEND_FROM_EMAIL;

    if (!apiKey || !to || !from) {
      console.error(
        "ENASH questionnaire email is not configured. Required: RESEND_API_KEY, ENASH_CONTACT_TO, RESEND_FROM_EMAIL."
      );

      return NextResponse.json(
        {
          error:
            "The questionnaire service is temporarily unavailable. Please email contactus@enash.co.za.",
        },
        { status: 503 }
      );
    }

    const subject = `ENASH Lodge Website Questionnaire — ${submission.lodgeName}`;

    const rows = Object.entries(submission)
      .filter(([, value]) => value)
      .map(
        ([key, value]) =>
          `<tr>
            <td style="padding:10px 12px;border-bottom:1px solid #ddd;font-weight:700;vertical-align:top;width:240px">
              ${htmlEscape(label(key))}
            </td>
            <td style="padding:10px 12px;border-bottom:1px solid #ddd;white-space:pre-wrap">
              ${htmlEscape(String(value))}
            </td>
          </tr>`
      )
      .join("");

    const text = Object.entries(submission)
      .filter(([, value]) => value)
      .map(
        ([key, value]) =>
          `${label(key)}: ${String(value)}`
      )
      .join("\n\n");

    const html = `
      <div style="font-family:Arial,sans-serif;color:#111">
        <h1 style="font-size:26px;margin-bottom:25px">
          ${htmlEscape(subject)}
        </h1>

        <table style="border-collapse:collapse;width:100%;max-width:950px">
          ${rows}
        </table>
      </div>
    `;

    const emailRes = await fetch(
      "https://api.resend.com/emails",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [to],
          reply_to: submission.businessEmail,
          subject,
          text,
          html,
        }),
      }
    );

    if (!emailRes.ok) {
      const providerError = await emailRes.text();

      console.error(
        "Resend questionnaire delivery failed:",
        providerError.slice(0, 1000)
      );

      return NextResponse.json(
        {
          error:
            "Your questionnaire could not be delivered. Please email contactus@enash.co.za.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      message:
        "Thank you. ENASH has received your questionnaire and will follow up using the details provided.",
    });
  } catch (error) {
    console.error(
      "Lodge questionnaire route error:",
      error
    );

    return NextResponse.json(
      {
        error: "Invalid questionnaire request.",
      },
      { status: 400 }
    );
  }
}