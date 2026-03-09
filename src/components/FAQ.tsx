"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"

const FAQS = [
  {
    q: "Can I customize the design of my home?",
    a: "Absolutely. Every Bugs Properties residence can be tailored to your vision. Our design team works closely with you to select finishes, layouts, and architectural details that perfectly reflect your personal style and lifestyle requirements.",
  },
  {
    q: "What locations does Bugs Properties operate in?",
    a: "We specialize in premier markets across the United States, including Miami, Boca Raton, Los Angeles, and New York. Each market is curated for its unique character, investment potential, and exceptional quality of life.",
  },
  {
    q: "How does the buying process work?",
    a: "Our process begins with a private consultation to understand your vision and requirements. We then curate a personalized selection of properties, arrange exclusive viewings, and guide you through every step of the negotiation and closing process — seamlessly from start to finish.",
  },
  {
    q: "Do you work with custom home builds?",
    a: "Yes. Beyond our existing portfolio, Bugs Properties partners with acclaimed architects and builders to create fully bespoke residences on selected lots. Contact us to explore custom build opportunities in your preferred market.",
  },
  {
    q: "How long does the property acquisition process typically take?",
    a: "Timelines vary depending on property type and market conditions. Typically, from initial consultation to closing, the process takes 60 to 120 days. Our team ensures every step is handled with precision, discretion, and efficiency.",
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section className="faq section-padding" style={{ background: "#FAFAF8" }}>
      <div className="section-wrap" style={{ maxWidth: "860px" }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="faq__header"
        >
          <p className="t-label" style={{ color: "var(--gold)", marginBottom: "12px" }}>FAQ</p>
          <h2 className="t-h2" style={{ marginBottom: "8px" }}>Frequently asked questions.</h2>
          <p className="t-body-lg">Answers to your questions, every step of the way.</p>
        </motion.div>

        <div className="faq__list">
          {FAQS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i + 0.2 }}
              className={`faq__item ${open === i ? "faq__item--open" : ""}`}
            >
              <button
                className="faq__question"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="faq__q-text">{item.q}</span>
                <motion.span
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                  className="faq__icon"
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.32, ease: [0.25, 0.1, 0.25, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <p className="faq__answer">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .faq__header {
          margin-bottom: 56px;
        }
        .faq__list {
          display: flex;
          flex-direction: column;
        }
        .faq__item {
          border-top: 1px solid rgba(0,0,0,0.08);
        }
        .faq__item:last-child {
          border-bottom: 1px solid rgba(0,0,0,0.08);
        }
        .faq__question {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 24px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 28px 0;
          text-align: left;
        }
        .faq__q-text {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(17px, 2vw, 20px);
          font-weight: 400;
          color: var(--text-primary);
          line-height: 1.35;
        }
        .faq__item--open .faq__q-text {
          color: var(--gold);
        }
        .faq__icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid rgba(0,0,0,0.12);
          font-size: 20px;
          color: var(--text-secondary);
          flex-shrink: 0;
          line-height: 1;
          font-weight: 300;
          transition: border-color 0.25s, color 0.25s;
        }
        .faq__item--open .faq__icon {
          border-color: var(--gold);
          color: var(--gold);
        }
        .faq__answer {
          font-size: 16px;
          line-height: 1.8;
          color: var(--text-muted);
          padding-bottom: 28px;
          max-width: 720px;
        }
      `}</style>
    </section>
  )
}
