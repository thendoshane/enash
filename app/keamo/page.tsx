"use client";

import { FormEvent, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Status = "idle" | "sending" | "success" | "error";

export default function KeamoQuestionnairePage() {
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

      businessName: String(formData.get("businessName") || ""),
      contactName: String(formData.get("contactName") || ""),
      phone: String(formData.get("phone") || ""),
      email: String(formData.get("email") || ""),
      location: String(formData.get("location") || ""),

      businessDescription: String(
        formData.get("businessDescription") || ""
      ),
      services: String(formData.get("services") || ""),
      openingHours: String(formData.get("openingHours") || ""),
      bookingType: String(formData.get("bookingType") || ""),
      bookingDetails: String(formData.get("bookingDetails") || ""),

      websitePages: formData
        .getAll("websitePages")
        .map(String)
        .join(", "),

      socialMedia: String(formData.get("socialMedia") || ""),
      whatsapp: String(formData.get("whatsapp") || ""),
      logo: String(formData.get("logo") || ""),
      photos: String(formData.get("photos") || ""),
      existingWebsite: String(
        formData.get("existingWebsite") || ""
      ),

      additionalInformation: String(
        formData.get("additionalInformation") || ""
      ),
    };

    try {
      const response = await fetch("/api/keamo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "The questionnaire could not be submitted."
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

      <main className="keamo-page">
        <section className="keamo-hero">
          <div className="keamo-container">
            <div className="keamo-eyebrow">
              ENASH · WEBSITE PROJECT
            </div>

            <h1>Let&apos;s build your restaurant website.</h1>

            <p>
              Tell us a little about your business and what you need.
              This will help us understand your requirements and prepare
              the right website for you.
            </p>
          </div>
        </section>

        <section className="keamo-content">
          <div className="keamo-container keamo-layout">

            <aside className="keamo-sidebar">
              <div className="keamo-sidebar-inner">
                <span className="keamo-label">
                  QUICK QUESTIONNAIRE
                </span>

                <h2>
                  Help us understand what you need.
                </h2>

                <p>
                  It should only take a few minutes. You do not need
                  technical knowledge to complete it.
                </p>

                <div className="keamo-step">
                  <span>01</span>
                  <div>
                    <strong>Your business</strong>
                    <p>Basic restaurant information.</p>
                  </div>
                </div>

                <div className="keamo-step">
                  <span>02</span>
                  <div>
                    <strong>Website requirements</strong>
                    <p>What you want the website to do.</p>
                  </div>
                </div>

                <div className="keamo-step">
                  <span>03</span>
                  <div>
                    <strong>Content</strong>
                    <p>Photos, logo and social media.</p>
                  </div>
                </div>
              </div>
            </aside>

            <div className="keamo-form-wrapper">

              {status === "success" && (
                <div className="keamo-message success">
                  <strong>Thank you — your questionnaire has been received.</strong>
                  <p>
                    ENASH will review the information and get back to you.
                  </p>
                </div>
              )}

              {status === "error" && (
                <div className="keamo-message error">
                  <strong>Something went wrong.</strong>
                  <p>{error}</p>
                </div>
              )}

              <form
                className="keamo-form"
                onSubmit={handleSubmit}
              >
                {/* Anti-spam field */}
                <div className="keamo-honeypot">
                  <label htmlFor="website">Website</label>
                  <input
                    id="website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* SECTION 01 */}
                <section className="keamo-section">
                  <div className="keamo-number">01</div>

                  <div className="keamo-heading">
                    <h2>About your business</h2>
                    <p>
                      Tell us about your restaurant and how we can
                      contact you.
                    </p>
                  </div>

                  <div className="keamo-grid">

                    <div className="keamo-field">
                      <label htmlFor="businessName">
                        Business / restaurant name *
                      </label>
                      <input
                        id="businessName"
                        name="businessName"
                        type="text"
                        required
                      />
                    </div>

                    <div className="keamo-field">
                      <label htmlFor="contactName">
                        Your name *
                      </label>
                      <input
                        id="contactName"
                        name="contactName"
                        type="text"
                        required
                      />
                    </div>

                    <div className="keamo-field">
                      <label htmlFor="phone">
                        Contact number *
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                      />
                    </div>

                    <div className="keamo-field">
                      <label htmlFor="email">
                        Email address *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                      />
                    </div>

                    <div className="keamo-field keamo-full">
                      <label htmlFor="location">
                        Restaurant location *
                      </label>
                      <input
                        id="location"
                        name="location"
                        type="text"
                        placeholder="Area / suburb / city"
                        required
                      />
                    </div>

                    <div className="keamo-field keamo-full">
                      <label htmlFor="businessDescription">
                        Tell us briefly about your restaurant *
                      </label>
                      <textarea
                        id="businessDescription"
                        name="businessDescription"
                        rows={5}
                        placeholder="What type of restaurant is it? What do you offer?"
                        required
                      />
                    </div>

                  </div>
                </section>

                {/* SECTION 02 */}
                <section className="keamo-section">
                  <div className="keamo-number">02</div>

                  <div className="keamo-heading">
                    <h2>Website requirements</h2>
                    <p>
                      Tell us what you want customers to be able to
                      do on your website.
                    </p>
                  </div>

                  <div className="keamo-stack">

                    <div className="keamo-field">
                      <label htmlFor="services">
                        Products / services / menu
                      </label>
                      <textarea
                        id="services"
                        name="services"
                        rows={5}
                        placeholder="Tell us what you sell or the services you provide."
                      />
                    </div>

                    <div className="keamo-field">
                      <label htmlFor="openingHours">
                        Opening hours
                      </label>
                      <textarea
                        id="openingHours"
                        name="openingHours"
                        rows={4}
                        placeholder="Example: Monday-Friday 09:00-22:00"
                      />
                    </div>

                    <div className="keamo-field">
                      <label htmlFor="bookingType">
                        What type of booking do you need?
                      </label>

                      <select
                        id="bookingType"
                        name="bookingType"
                        defaultValue=""
                      >
                        <option value="">
                          Select an option
                        </option>
                        <option value="Table reservations">
                          Table reservations
                        </option>
                        <option value="Events / functions">
                          Events / functions
                        </option>
                        <option value="Appointments">
                          Appointments
                        </option>
                        <option value="Online orders">
                          Online orders
                        </option>
                        <option value="Multiple">
                          Multiple
                        </option>
                        <option value="Not sure">
                          Not sure
                        </option>
                      </select>
                    </div>

                    <div className="keamo-field">
                      <label htmlFor="bookingDetails">
                        Tell us more about the booking system
                      </label>

                      <textarea
                        id="bookingDetails"
                        name="bookingDetails"
                        rows={5}
                        placeholder="Example: Customers should choose a date, time and number of people."
                      />
                    </div>

                    <div className="keamo-field">
                      <label>
                        What pages would you like?
                      </label>

                      <div className="keamo-checkboxes">

                        {[
                          "Home",
                          "About",
                          "Menu",
                          "Gallery",
                          "Bookings",
                          "Contact",
                          "Location",
                          "Events",
                          "Reviews",
                          "Other",
                        ].map((page) => (
                          <label
                            key={page}
                            className="keamo-checkbox"
                          >
                            <input
                              type="checkbox"
                              name="websitePages"
                              value={page}
                            />
                            <span>{page}</span>
                          </label>
                        ))}

                      </div>
                    </div>

                  </div>
                </section>

                {/* SECTION 03 */}
                <section className="keamo-section">
                  <div className="keamo-number">03</div>

                  <div className="keamo-heading">
                    <h2>Your content</h2>
                    <p>
                      Let us know what materials you already have.
                    </p>
                  </div>

                  <div className="keamo-stack">

                    <div className="keamo-field">
                      <label htmlFor="existingWebsite">
                        Do you currently have a website?
                      </label>

                      <input
                        id="existingWebsite"
                        name="existingWebsite"
                        type="url"
                        placeholder="https://"
                      />
                    </div>

                    <div className="keamo-field">
                      <label htmlFor="logo">
                        Do you have a logo?
                      </label>

                      <select
                        id="logo"
                        name="logo"
                        defaultValue=""
                      >
                        <option value="">
                          Select an option
                        </option>
                        <option value="Yes">
                          Yes
                        </option>
                        <option value="No">
                          No
                        </option>
                        <option value="Need one designed">
                          I need one designed
                        </option>
                      </select>
                    </div>

                    <div className="keamo-field">
                      <label htmlFor="photos">
                        Do you have professional photos?
                      </label>

                      <select
                        id="photos"
                        name="photos"
                        defaultValue=""
                      >
                        <option value="">
                          Select an option
                        </option>
                        <option value="Yes">
                          Yes
                        </option>
                        <option value="Some">
                          Some
                        </option>
                        <option value="No">
                          No
                        </option>
                      </select>
                    </div>

                    <div className="keamo-field">
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

                    <div className="keamo-field">
                      <label htmlFor="whatsapp">
                        WhatsApp number
                      </label>

                      <input
                        id="whatsapp"
                        name="whatsapp"
                        type="tel"
                      />
                    </div>

                    <div className="keamo-field">
                      <label htmlFor="additionalInformation">
                        Anything else we should know?
                      </label>

                      <textarea
                        id="additionalInformation"
                        name="additionalInformation"
                        rows={6}
                        placeholder="Any specific ideas, requirements or questions?"
                      />
                    </div>

                  </div>
                </section>

                {/* SUBMIT */}
                <section className="keamo-submit">

                  <div>
                    <span className="keamo-label">
                      FINAL STEP
                    </span>

                    <h2>Send your requirements</h2>

                    <p>
                      We&apos;ll review your information and contact
                      you to discuss the website.
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

      <Footer />

      <style jsx>{`
        .keamo-page {
          background: #fff;
          color: #111;
        }

        .keamo-container {
          width: min(1180px, calc(100% - 40px));
          margin: 0 auto;
        }

        .keamo-hero {
          background: #111;
          color: #fff;
          padding: 105px 0 95px;
        }

        .keamo-eyebrow,
        .keamo-label {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: .14em;
          text-transform: uppercase;
        }

        .keamo-eyebrow {
          margin-bottom: 24px;
          opacity: .65;
        }

        .keamo-hero h1 {
          max-width: 900px;
          margin: 0;
          font-size: clamp(48px, 7vw, 82px);
          line-height: .96;
          letter-spacing: -.055em;
        }

        .keamo-hero p {
          max-width: 680px;
          margin: 30px 0 0;
          color: #ccc;
          font-size: 19px;
          line-height: 1.7;
        }

        .keamo-content {
          padding: 85px 0 120px;
        }

        .keamo-layout {
          display: grid;
          grid-template-columns: 280px minmax(0, 1fr);
          gap: 90px;
          align-items: start;
        }

        .keamo-sidebar-inner {
          position: sticky;
          top: 30px;
        }

        .keamo-label {
          color: #777;
        }

        .keamo-sidebar h2 {
          margin: 18px 0 15px;
          font-size: 28px;
          line-height: 1.1;
          letter-spacing: -.03em;
        }

        .keamo-sidebar > div > p {
          color: #666;
          font-size: 14px;
          line-height: 1.7;
        }

        .keamo-step {
          display: flex;
          gap: 14px;
          padding: 18px 0;
          border-top: 1px solid #ddd;
        }

        .keamo-step > span {
          color: #888;
          font-size: 12px;
          font-weight: 700;
        }

        .keamo-step strong {
          font-size: 14px;
        }

        .keamo-step p {
          margin: 5px 0 0;
          color: #777;
          font-size: 13px;
        }

        .keamo-section {
          padding-bottom: 70px;
          margin-bottom: 70px;
          border-bottom: 1px solid #ddd;
        }

        .keamo-number {
          margin-bottom: 12px;
          color: #888;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: .1em;
        }

        .keamo-heading {
          margin-bottom: 35px;
        }

        .keamo-heading h2,
        .keamo-submit h2 {
          margin: 0;
          font-size: 34px;
          line-height: 1.05;
          letter-spacing: -.04em;
        }

        .keamo-heading p,
        .keamo-submit p {
          margin: 10px 0 0;
          color: #777;
          font-size: 15px;
          line-height: 1.6;
        }

        .keamo-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 25px 20px;
        }

        .keamo-stack {
          display: grid;
          gap: 25px;
        }

        .keamo-full {
          grid-column: 1 / -1;
        }

        .keamo-field {
          display: flex;
          flex-direction: column;
          gap: 9px;
        }

        .keamo-field label {
          font-size: 13px;
          font-weight: 700;
          line-height: 1.4;
        }

        .keamo-field input,
        .keamo-field select,
        .keamo-field textarea {
          width: 100%;
          box-sizing: border-box;
          border: 1px solid #ccc;
          border-radius: 0;
          background: #fff;
          color: #111;
          padding: 14px 15px;
          font: inherit;
          font-size: 15px;
          outline: none;
        }

        .keamo-field input,
        .keamo-field select {
          height: 50px;
        }

        .keamo-field textarea {
          min-height: 120px;
          resize: vertical;
          line-height: 1.6;
        }

        .keamo-field input:focus,
        .keamo-field select:focus,
        .keamo-field textarea:focus {
          border-color: #111;
        }

        .keamo-checkboxes {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          border: 1px solid #ddd;
        }

        .keamo-checkbox {
          display: flex !important;
          flex-direction: row !important;
          align-items: center;
          gap: 11px;
          padding: 15px;
          border-bottom: 1px solid #ddd;
          cursor: pointer;
          font-size: 14px !important;
        }

        .keamo-checkbox:nth-child(odd) {
          border-right: 1px solid #ddd;
        }

        .keamo-checkbox:last-child,
        .keamo-checkbox:nth-last-child(2) {
          border-bottom: 0;
        }

        .keamo-checkbox input {
          width: 17px;
          height: 17px;
          margin: 0;
        }

        .keamo-submit {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 30px;
          padding: 35px;
          background: #111;
          color: #fff;
        }

        .keamo-submit .keamo-label {
          color: #aaa;
        }

        .keamo-submit h2 {
          margin-top: 12px;
        }

        .keamo-submit p {
          max-width: 550px;
          color: #aaa;
        }

        .keamo-submit button {
          min-width: 220px;
          padding: 16px 24px;
          border: 0;
          background: #fff;
          color: #111;
          font: inherit;
          font-weight: 700;
          cursor: pointer;
        }

        .keamo-submit button:disabled {
          opacity: .5;
          cursor: not-allowed;
        }

        .keamo-message {
          margin-bottom: 35px;
          padding: 22px 25px;
          border: 1px solid #ccc;
        }

        .keamo-message strong {
          display: block;
          margin-bottom: 6px;
        }

        .keamo-message p {
          margin: 0;
          color: #555;
          line-height: 1.6;
        }

        .keamo-message.success {
          border-color: #111;
        }

        .keamo-honeypot {
          position: absolute;
          left: -9999px;
          width: 1px;
          height: 1px;
          overflow: hidden;
        }

        @media (max-width: 900px) {
          .keamo-layout {
            grid-template-columns: 1fr;
            gap: 50px;
          }

          .keamo-sidebar-inner {
            position: static;
          }
        }

        @media (max-width: 650px) {
          .keamo-container {
            width: calc(100% - 28px);
          }

          .keamo-hero {
            padding: 70px 0 65px;
          }

          .keamo-hero h1 {
            font-size: 48px;
          }

          .keamo-content {
            padding: 60px 0 80px;
          }

          .keamo-grid {
            grid-template-columns: 1fr;
          }

          .keamo-full {
            grid-column: auto;
          }

          .keamo-checkboxes {
            grid-template-columns: 1fr;
          }

          .keamo-checkbox:nth-child(odd) {
            border-right: 0;
          }

          .keamo-checkbox:last-child,
          .keamo-checkbox:nth-last-child(2) {
            border-bottom: 1px solid #ddd;
          }

          .keamo-checkbox:last-child {
            border-bottom: 0;
          }

          .keamo-submit {
            flex-direction: column;
            align-items: stretch;
            padding: 25px;
          }

          .keamo-submit button {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}