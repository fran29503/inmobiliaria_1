"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button"

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", market: "", message: "" })
  const [sent, setSent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(r => setTimeout(r, 1500))
    setSent(true)
    setIsSubmitting(false)
  }

  return (
    <section id="contact" ref={ref} className="contact section-padding" style={{ background: "var(--bg-cream)" }}>
      <div className="section-wrap" style={{ maxWidth: "720px" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: "56px" }}
        >
          <p className="t-label" style={{ color: "var(--gold)", marginBottom: "12px" }}>Private Inquiry</p>
          <h2 className="t-h2" style={{ marginBottom: "16px" }}>Your extraordinary home awaits.</h2>
          <p className="t-body-lg">
            Whether you&apos;re exploring our collection or envisioning something custom, we&apos;re here to bring your vision to life.
          </p>
        </motion.div>

        {!sent ? (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="contact__form"
          >
            <div className="contact__row">
              <div className="contact__field">
                <label className="contact__label">Full Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  className="contact__input"
                  placeholder="John Doe"
                />
              </div>
              <div className="contact__field">
                <label className="contact__label">Email Address</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  className="contact__input"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="contact__field">
              <label className="contact__label">Market of Interest</label>
              <select
                value={form.market}
                onChange={(e) => set("market", e.target.value)}
                className="contact__input contact__select"
              >
                <option value="">Select a city...</option>
                {["Miami", "Boca Raton", "Los Angeles", "New York"].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="contact__field">
              <label className="contact__label">Your Vision</label>
              <textarea
                required
                value={form.message}
                onChange={(e) => set("message", e.target.value)}
                className="contact__input contact__textarea"
                placeholder="Tell us about the residence you're looking for..."
                rows={5}
              />
            </div>

            <InteractiveHoverButton
              type="submit"
              text={isSubmitting ? "Sending..." : "Send Inquiry"}
              variant="dark"
              disabled={isSubmitting}
              style={{ width: "100%", justifyContent: "center" }}
            />
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="contact__success"
          >
            <div className="contact__success-icon">✓</div>
            <h3 className="t-h3" style={{ marginBottom: "12px" }}>
              Thank you{form.name ? `, ${form.name.split(" ")[0]}` : ""}.
            </h3>
            <p className="t-body">
              Your inquiry has been received. A member of the Bugs Properties team will be in touch within 24 hours.
            </p>
          </motion.div>
        )}
      </div>

      <style>{`
        .contact__form {
          background: #fff;
          border-radius: 12px;
          padding: 48px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        }
        .contact__row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        .contact__field {
          margin-bottom: 24px;
        }
        .contact__label {
          display: block;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-secondary);
          margin-bottom: 10px;
        }
        .contact__input {
          width: 100%;
          background: var(--bg-cream);
          border: 1px solid transparent;
          border-radius: 6px;
          padding: 16px 18px;
          font-size: 15px;
          font-family: 'Open Sans', sans-serif;
          color: var(--text-primary);
          transition: border-color 0.25s, background 0.25s;
        }
        .contact__input:focus {
          outline: none;
          border-color: var(--gold);
          background: #fff;
        }
        .contact__input::placeholder {
          color: var(--text-muted);
        }
        .contact__select {
          appearance: none;
          cursor: pointer;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%234A4A4A' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 18px center;
          background-color: var(--bg-cream);
        }
        .contact__textarea {
          resize: vertical;
          min-height: 140px;
        }
        .contact__submit {
          width: 100%;
          justify-content: center;
          margin-top: 8px;
        }

        .contact__success {
          background: #fff;
          border-radius: 12px;
          padding: 64px 48px;
          text-align: center;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        }
        .contact__success-icon {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: var(--gold);
          color: #fff;
          font-size: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
        }

        @media (max-width: 640px) {
          .contact__form { padding: 32px 24px; }
          .contact__row { grid-template-columns: 1fr; }
          .contact__success { padding: 48px 24px; }
        }
      `}</style>
    </section>
  )
}
