"use client";

import { FormEvent, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Status = "idle" | "sending" | "success" | "error";

export default function LodgeQuestionnairePage() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatus("sending");
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      website: String(formData.get("website") || ""),
      lodgeName: String(formData.get("lodgeName") || ""),
      existingWebsite: String(formData.get("existingWebsite") || ""),
      location: String(formData.get("location") || ""),
      contactNumber: String(formData.get("contactNumber") || ""),
      businessEmail: String(formData.get("businessEmail") || ""),
      employees: String(formData.get("employees") || ""),

      numberOfRooms: String(formData.get("numberOfRooms") || ""),
      checkIn: String(formData.get("checkIn") || ""),
      checkOut: String(formData.get("checkOut") || ""),
      roomTypes: String(formData.get("roomTypes") || ""),
      prices: String(formData.get("prices") || ""),
      guestCapacity: String(formData.get("guestCapacity") || ""),
      seasonalPricing: String(formData.get("seasonalPricing") || ""),

      availability: String(formData.get("availability") || ""),
      roomSelection: String(formData.get("roomSelection") || ""),
      paymentRequirement: String(
        formData.get("paymentRequirement") || ""
      ),
      paymentProvider: String(
        formData.get("paymentProvider") || ""
      ),
      cancellationPolicy: String(
        formData.get("cancellationPolicy") || ""
      ),
      bookingRequirements: String(
        formData.get("bookingRequirements") || ""
      ),

      pages: formData.getAll("pages").map(String),

      logoAvailable: String(
        formData.get("logoAvailable") || ""
      ),
      professionalPhotos: String(
        formData.get("professionalPhotos") || ""
      ),
      socialMedia: String(
        formData.get("socialMedia") || ""
      ),
      whatsapp: String(formData.get("whatsapp") || ""),
      additionalInformation: String(
        formData.get("additionalInformation") || ""
      ),
    };

    try {
      const response = await fetch("/api/lodge-questionnaire", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "The questionnaire could not be submitted."
        );
      }

      setStatus("success");
      form.reset();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setStatus("error");

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    }
  }

  return (
    <>
      <Header />

      <main className="lodge-questionnaire">
        <section className="lodge-hero">
          <div className="lodge-container lodge-hero-inner">
            <div className="lodge-eyebrow">
              ENASH · LODGE WEBSITE PROJECT
            </div>

            <h1>Tell us about your lodge.</h1>

            <p>
              Complete this questionnaire so we can prepare your
              website, online booking system and online payment
              setup.
            </p>
          </div>
        </section>

        <section className="lodge-content">
          <div className="lodge-container lodge-layout">
            <aside className="lodge-sidebar">
              <div className="lodge-sidebar-sticky">
                <span className="lodge-small-title">
                  WHAT WE NEED
                </span>

                <h2>
                  Help us understand your business.
                </h2>

                <p>
                  The information you provide will help ENASH
                  design the right booking and website
                  experience for your guests.
                </p>

                <div className="lodge-feature">
                  <span>01</span>
                  <div>
                    <strong>Accommodation</strong>
                    <p>
                      Rooms, units, prices and guest capacity.
                    </p>
                  </div>
                </div>

                <div className="lodge-feature">
                  <span>02</span>
                  <div>
                    <strong>Bookings</strong>
                    <p>
                      Availability, reservations and room
                      selection.
                    </p>
                  </div>
                </div>

                <div className="lodge-feature">
                  <span>03</span>
                  <div>
                    <strong>Payments</strong>
                    <p>
                      How guests should pay for their bookings.
                    </p>
                  </div>
                </div>

                <div className="lodge-feature">
                  <span>04</span>
                  <div>
                    <strong>Website</strong>
                    <p>
                      Pages, images, social media and content.
                    </p>
                  </div>
                </div>
              </div>
            </aside>

            <div className="lodge-form-wrapper">
              {status === "success" && (
                <div className="lodge-message lodge-success">
                  <strong>
                    Questionnaire submitted successfully.
                  </strong>

                  <p>
                    Thank you. ENASH has received your
                    information and will follow up with you.
                  </p>
                </div>
              )}

              {status === "error" && (
                <div className="lodge-message lodge-error">
                  <strong>Submission failed.</strong>

                  <p>{error}</p>
                </div>
              )}

              <form
                className="lodge-form"
                onSubmit={handleSubmit}
              >
                <div className="lodge-honeypot">
                  <label htmlFor="website">
                    Website
                  </label>

                  <input
                    id="website"
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* 01 */}
                <section className="lodge-section">
                  <div className="lodge-section-number">
                    01
                  </div>

                  <div className="lodge-section-heading">
                    <h2>Business information</h2>
                    <p>
                      Tell us about the lodge and how we can
                      contact you.
                    </p>
                  </div>

                  <div className="lodge-grid">
                    <div className="lodge-field">
                      <label htmlFor="lodgeName">
                        Lodge / business name *
                      </label>

                      <input
                        id="lodgeName"
                        name="lodgeName"
                        type="text"
                        required
                      />
                    </div>

                    <div className="lodge-field">
                      <label htmlFor="existingWebsite">
                        Existing website
                      </label>

                      <input
                        id="existingWebsite"
                        name="existingWebsite"
                        type="url"
                        placeholder="https://"
                      />
                    </div>

                    <div className="lodge-field lodge-full">
                      <label htmlFor="location">
                        Lodge address / location *
                      </label>

                      <input
                        id="location"
                        name="location"
                        type="text"
                        required
                      />
                    </div>

                    <div className="lodge-field">
                      <label htmlFor="contactNumber">
                        Contact number *
                      </label>

                      <input
                        id="contactNumber"
                        name="contactNumber"
                        type="tel"
                        required
                      />
                    </div>

                    <div className="lodge-field">
                      <label htmlFor="businessEmail">
                        Business email *
                      </label>

                      <input
                        id="businessEmail"
                        name="businessEmail"
                        type="email"
                        required
                      />
                    </div>

                    <div className="lodge-field">
                      <label htmlFor="employees">
                        Number of employees
                      </label>

                      <input
                        id="employees"
                        name="employees"
                        type="number"
                        min="0"
                      />
                    </div>
                  </div>
                </section>

                {/* 02 */}
                <section className="lodge-section">
                  <div className="lodge-section-number">
                    02
                  </div>

                  <div className="lodge-section-heading">
                    <h2>Accommodation</h2>
                    <p>
                      Give us the details of your rooms or
                      accommodation units.
                    </p>
                  </div>

                  <div className="lodge-grid">
                    <div className="lodge-field">
                      <label htmlFor="numberOfRooms">
                        Number of rooms / units *
                      </label>

                      <input
                        id="numberOfRooms"
                        name="numberOfRooms"
                        type="number"
                        min="1"
                        required
                      />
                    </div>

                    <div className="lodge-field">
                      <label htmlFor="checkIn">
                        Check-in time
                      </label>

                      <input
                        id="checkIn"
                        name="checkIn"
                        type="text"
                        placeholder="e.g. 14:00"
                      />
                    </div>

                    <div className="lodge-field">
                      <label htmlFor="checkOut">
                        Check-out time
                      </label>

                      <input
                        id="checkOut"
                        name="checkOut"
                        type="text"
                        placeholder="e.g. 10:00"
                      />
                    </div>

                    <div className="lodge-field lodge-full">
                      <label htmlFor="roomTypes">
                        Room / unit types *
                      </label>

                      <textarea
                        id="roomTypes"
                        name="roomTypes"
                        required
                        rows={5}
                        placeholder={`Example:
Standard Room
Deluxe Room
Family Room`}
                      />
                    </div>

                    <div className="lodge-field lodge-full">
                      <label htmlFor="prices">
                        Prices *
                      </label>

                      <textarea
                        id="prices"
                        name="prices"
                        required
                        rows={5}
                        placeholder={`Example:
Standard Room: R850 per night
Deluxe Room: R1,200 per night`}
                      />
                    </div>

                    <div className="lodge-field lodge-full">
                      <label htmlFor="guestCapacity">
                        Maximum guests per room / unit
                      </label>

                      <textarea
                        id="guestCapacity"
                        name="guestCapacity"
                        rows={4}
                        placeholder="Example: Standard Room - 2 guests"
                      />
                    </div>

                    <div className="lodge-field lodge-full">
                      <label htmlFor="seasonalPricing">
                        Weekend / holiday / seasonal pricing
                      </label>

                      <textarea
                        id="seasonalPricing"
                        name="seasonalPricing"
                        rows={5}
                        placeholder="Tell us about any different rates."
                      />
                    </div>
                  </div>
                </section>

                {/* 03 */}
                <section className="lodge-section">
                  <div className="lodge-section-number">
                    03
                  </div>

                  <div className="lodge-section-heading">
                    <h2>Bookings & payments</h2>
                    <p>
                      Tell us how you want guests to book and
                      pay online.
                    </p>
                  </div>

                  <div className="lodge-stack">
                    <div className="lodge-field">
                      <label htmlFor="availability">
                        Should guests see live availability? *
                      </label>

                      <select
                        id="availability"
                        name="availability"
                        required
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select an option
                        </option>
                        <option value="Yes - live availability">
                          Yes - live availability
                        </option>
                        <option value="No - enquiry only">
                          No - enquiry only
                        </option>
                        <option value="Not sure">
                          Not sure
                        </option>
                      </select>
                    </div>

                    <div className="lodge-field">
                      <label htmlFor="roomSelection">
                        Should guests select a specific
                        room/unit? *
                      </label>

                      <select
                        id="roomSelection"
                        name="roomSelection"
                        required
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select an option
                        </option>
                        <option value="Specific room/unit">
                          Specific room/unit
                        </option>
                        <option value="Room type only">
                          Room type only
                        </option>
                        <option value="Not sure">
                          Not sure
                        </option>
                      </select>
                    </div>

                    <div className="lodge-field">
                      <label htmlFor="paymentRequirement">
                        Payment requirement *
                      </label>

                      <select
                        id="paymentRequirement"
                        name="paymentRequirement"
                        required
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select an option
                        </option>
                        <option value="Full payment">
                          Full payment
                        </option>
                        <option value="Deposit">
                          Deposit
                        </option>
                        <option value="Pay later">
                          Pay later
                        </option>
                        <option value="Not sure">
                          Not sure
                        </option>
                      </select>
                    </div>

                    <div className="lodge-field">
                      <label htmlFor="paymentProvider">
                        Preferred payment provider
                      </label>

                      <select
                        id="paymentProvider"
                        name="paymentProvider"
                        defaultValue=""
                      >
                        <option value="">
                          Select an option
                        </option>
                        <option value="PayFast">
                          PayFast
                        </option>
                        <option value="Peach Payments">
                          Peach Payments
                        </option>
                        <option value="Yoco">
                          Yoco
                        </option>
                        <option value="Bank transfer">
                          Bank transfer
                        </option>
                        <option value="Not sure">
                          Not sure
                        </option>
                        <option value="Other">
                          Other
                        </option>
                      </select>
                    </div>

                    <div className="lodge-field">
                      <label htmlFor="cancellationPolicy">
                        Cancellation / refund policy
                      </label>

                      <textarea
                        id="cancellationPolicy"
                        name="cancellationPolicy"
                        rows={5}
                      />
                    </div>

                    <div className="lodge-field">
                      <label htmlFor="bookingRequirements">
                        Additional booking requirements
                      </label>

                      <textarea
                        id="bookingRequirements"
                        name="bookingRequirements"
                        rows={5}
                      />
                    </div>
                  </div>
                </section>

                {/* 04 */}
                <section className="lodge-section">
                  <div className="lodge-section-number">
                    04
                  </div>

                  <div className="lodge-section-heading">
                    <h2>Website requirements</h2>
                    <p>
                      Select what you would like included in
                      the new website.
                    </p>
                  </div>

                  <div className="lodge-field">
                    <label>
                      Website pages
                    </label>

                    <div className="lodge-checkbox-grid">
                      {[
                        "Home",
                        "About",
                        "Accommodation",
                        "Gallery",
                        "Bookings",
                        "Contact",
                        "Activities",
                        "Location",
                        "Terms and Conditions",
                        "Privacy Policy",
                      ].map((page) => (
                        <label
                          key={page}
                          className="lodge-checkbox"
                        >
                          <input
                            type="checkbox"
                            name="pages"
                            value={page}
                          />
                          <span>{page}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="lodge-stack">
                    <div className="lodge-field">
                      <label htmlFor="logoAvailable">
                        Logo available?
                      </label>

                      <select
                        id="logoAvailable"
                        name="logoAvailable"
                        defaultValue=""
                      >
                        <option value="">
                          Select an option
                        </option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        <option value="Needs design">
                          Needs design
                        </option>
                      </select>
                    </div>

                    <div className="lodge-field">
                      <label htmlFor="professionalPhotos">
                        Professional photos available?
                      </label>

                      <select
                        id="professionalPhotos"
                        name="professionalPhotos"
                        defaultValue=""
                      >
                        <option value="">
                          Select an option
                        </option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        <option value="Some">Some</option>
                      </select>
                    </div>

                    <div className="lodge-field">
                      <label htmlFor="socialMedia">
                        Social media links
                      </label>

                      <textarea
                        id="socialMedia"
                        name="socialMedia"
                        rows={4}
                        placeholder="Facebook, Instagram, TikTok, etc."
                      />
                    </div>

                    <div className="lodge-field">
                      <label htmlFor="whatsapp">
                        WhatsApp number
                      </label>

                      <input
                        id="whatsapp"
                        name="whatsapp"
                        type="tel"
                      />
                    </div>

                    <div className="lodge-field">
                      <label htmlFor="additionalInformation">
                        Anything else we should know?
                      </label>

                      <textarea
                        id="additionalInformation"
                        name="additionalInformation"
                        rows={6}
                      />
                    </div>
                  </div>
                </section>

                {/* 05 */}
                <section className="lodge-submit">
                  <div>
                    <span className="lodge-small-title">
                      05 · FINAL STEP
                    </span>

                    <h2>Submit your questionnaire</h2>

                    <p>
                      Once submitted, ENASH will review the
                      information and use it to plan your lodge
                      website.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                  >
                    {status === "sending"
                      ? "Submitting..."
                      : "Submit questionnaire"}
                  </button>
                </section>
              </form>
            </div>
          </div>
        </section>
      </main>

      <style jsx>{`
        .lodge-questionnaire {
          background: #fff;
          color: #111;
        }

        .lodge-container {
          width: min(1180px, calc(100% - 40px));
          margin: 0 auto;
        }

        .lodge-hero {
          background: #111;
          color: #fff;
          padding: 110px 0 100px;
        }

        .lodge-hero-inner {
          max-width: 900px;
        }

        .lodge-eyebrow,
        .lodge-small-title {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .lodge-eyebrow {
          margin-bottom: 24px;
          opacity: 0.65;
        }

        .lodge-hero h1 {
          margin: 0;
          max-width: 850px;
          font-size: clamp(48px, 7vw, 88px);
          line-height: 0.95;
          letter-spacing: -0.055em;
          font-weight: 700;
        }

        .lodge-hero p {
          max-width: 680px;
          margin: 30px 0 0;
          font-size: 19px;
          line-height: 1.7;
          color: #cfcfcf;
        }

        .lodge-content {
          padding: 90px 0 120px;
        }

        .lodge-layout {
          display: grid;
          grid-template-columns: 280px minmax(0, 1fr);
          gap: 90px;
          align-items: start;
        }

        .lodge-sidebar-sticky {
          position: sticky;
          top: 30px;
        }

        .lodge-small-title {
          color: #777;
        }

        .lodge-sidebar h2 {
          margin: 18px 0 15px;
          font-size: 27px;
          line-height: 1.1;
          letter-spacing: -0.03em;
        }

        .lodge-sidebar > p {
          color: #666;
          font-size: 14px;
          line-height: 1.7;
          margin-bottom: 35px;
        }

        .lodge-feature {
          display: flex;
          gap: 14px;
          padding: 18px 0;
          border-top: 1px solid #ddd;
        }

        .lodge-feature > span {
          font-size: 12px;
          color: #888;
          font-weight: 700;
        }

        .lodge-feature strong {
          display: block;
          font-size: 14px;
        }

        .lodge-feature p {
          margin: 5px 0 0;
          color: #777;
          font-size: 13px;
          line-height: 1.5;
        }

        .lodge-form-wrapper {
          min-width: 0;
        }

        .lodge-form {
          width: 100%;
        }

        .lodge-section {
          padding: 0 0 70px;
          margin-bottom: 70px;
          border-bottom: 1px solid #ddd;
        }

        .lodge-section-number {
          color: #888;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.1em;
          margin-bottom: 12px;
        }

        .lodge-section-heading {
          margin-bottom: 35px;
        }

        .lodge-section-heading h2,
        .lodge-submit h2 {
          margin: 0;
          font-size: 34px;
          line-height: 1.05;
          letter-spacing: -0.04em;
        }

        .lodge-section-heading p,
        .lodge-submit p {
          margin: 10px 0 0;
          color: #777;
          font-size: 15px;
          line-height: 1.6;
        }

        .lodge-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 25px 20px;
        }

        .lodge-stack {
          display: grid;
          gap: 25px;
        }

        .lodge-full {
          grid-column: 1 / -1;
        }

        .lodge-field {
          display: flex;
          flex-direction: column;
          gap: 9px;
        }

        .lodge-field label {
          font-size: 13px;
          font-weight: 700;
          line-height: 1.4;
        }

        .lodge-field input,
        .lodge-field select,
        .lodge-field textarea {
          width: 100%;
          box-sizing: border-box;
          border: 1px solid #cfcfcf;
          background: #fff;
          color: #111;
          border-radius: 0;
          padding: 14px 15px;
          font: inherit;
          font-size: 15px;
          outline: none;
          transition: border-color 0.15s ease;
        }

        .lodge-field input,
        .lodge-field select {
          height: 50px;
        }

        .lodge-field textarea {
          resize: vertical;
          min-height: 120px;
          line-height: 1.6;
        }

        .lodge-field input:focus,
        .lodge-field select:focus,
        .lodge-field textarea:focus {
          border-color: #111;
        }

        .lodge-field input::placeholder,
        .lodge-field textarea::placeholder {
          color: #999;
        }

        .lodge-checkbox-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          border: 1px solid #ddd;
        }

        .lodge-checkbox {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 15px;
          border-bottom: 1px solid #ddd;
          cursor: pointer;
          font-size: 14px;
        }

        .lodge-checkbox:nth-child(odd) {
          border-right: 1px solid #ddd;
        }

        .lodge-checkbox:nth-last-child(-n + 2) {
          border-bottom: 0;
        }

        .lodge-checkbox input {
          width: 17px;
          height: 17px;
          margin: 0;
          accent-color: #111;
        }

        .lodge-submit {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 30px;
          padding: 35px;
          background: #111;
          color: #fff;
        }

        .lodge-submit .lodge-small-title {
          color: #aaa;
        }

        .lodge-submit h2 {
          margin-top: 12px;
        }

        .lodge-submit p {
          color: #aaa;
          max-width: 560px;
        }

        .lodge-submit button {
          flex: 0 0 auto;
          border: 0;
          background: #fff;
          color: #111;
          padding: 16px 24px;
          font: inherit;
          font-weight: 700;
          cursor: pointer;
          min-width: 210px;
        }

        .lodge-submit button:hover {
          opacity: 0.9;
        }

        .lodge-submit button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .lodge-message {
          margin-bottom: 35px;
          padding: 22px 25px;
          border: 1px solid #ccc;
        }

        .lodge-message strong {
          display: block;
          font-size: 16px;
          margin-bottom: 6px;
        }

        .lodge-message p {
          margin: 0;
          color: #555;
          line-height: 1.6;
        }

        .lodge-success {
          border-color: #111;
        }

        .lodge-error {
          border-color: #999;
        }

        .lodge-honeypot {
          position: absolute;
          left: -9999px;
          width: 1px;
          height: 1px;
          overflow: hidden;
        }

        @media (max-width: 900px) {
          .lodge-layout {
            grid-template-columns: 1fr;
            gap: 50px;
          }

          .lodge-sidebar-sticky {
            position: static;
          }

          .lodge-sidebar {
            max-width: 650px;
          }
        }

        @media (max-width: 650px) {
          .lodge-container {
            width: min(100% - 28px, 1180px);
          }

          .lodge-hero {
            padding: 75px 0 65px;
          }

          .lodge-hero h1 {
            font-size: 48px;
          }

          .lodge-content {
            padding: 60px 0 80px;
          }

          .lodge-grid {
            grid-template-columns: 1fr;
          }

          .lodge-full {
            grid-column: auto;
          }

          .lodge-checkbox-grid {
            grid-template-columns: 1fr;
          }

          .lodge-checkbox:nth-child(odd) {
            border-right: 0;
          }

          .lodge-checkbox:nth-last-child(-n + 2) {
            border-bottom: 1px solid #ddd;
          }

          .lodge-checkbox:last-child {
            border-bottom: 0;
          }

          .lodge-submit {
            flex-direction: column;
            align-items: stretch;
            padding: 25px;
          }

          .lodge-submit button {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}