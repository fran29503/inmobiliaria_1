"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

export default function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <footer ref={ref} className="footer" style={{ background: "#0D0D0D", color: "#fff" }}>
      {/* Texture overlay */}
      <div
        className="footer__texture"
        style={{
          backgroundImage: "url('https://framerusercontent.com/images/u1hEqFmJEUFPRIoLCS06cD6UE.jpg')",
          backgroundSize: "cover",
          opacity: 0.04,
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
        }}
      />

      <div className="section-wrap" style={{ position: "relative", zIndex: 1 }}>
        <div className="footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="footer__logo"
            >
              <span className="footer__logo-main">Bugs</span>
              <span className="footer__logo-dot">·</span>
              <span className="footer__logo-sub">Properties</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="footer__desc"
            >
              Curated real estate for those who understand that a home is not merely a property, but a statement of legacy.
            </motion.p>
          </div>

          {/* Markets */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="footer__col"
          >
            <h4 className="footer__heading">Markets</h4>
            <ul className="footer__list">
              {["Miami", "Boca Raton", "Los Angeles", "New York"].map((c, i) => (
                <motion.li
                  key={c}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.25 + i * 0.05 }}
                >
                  <a href="#properties" className="footer__link">{c}</a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="footer__col"
          >
            <h4 className="footer__heading">Company</h4>
            <ul className="footer__list">
              {["Properties", "About", "Insights", "Contact"].map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.05 }}
                >
                  <a href={`#${item.toLowerCase()}`} className="footer__link">{item}</a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="footer__col"
          >
            <h4 className="footer__heading">Contact</h4>
            <ul className="footer__list">
              {[
                "inquiries@bugsproperties.com",
                "+1 (305) 555 – 0190",
                "1221 Brickell Ave, Suite 900",
                "Miami, FL 33131",
              ].map((t, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.05 }}
                >
                  <span className="footer__text">{t}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="footer__bottom"
        >
          <span>© 2025 Bugs Properties. All rights reserved.</span>
          <span>Licensed Real Estate Brokerage · Miami, FL</span>
        </motion.div>
      </div>

      <style>{`
        .footer {
          padding: 100px 0 48px;
          position: relative;
          overflow: hidden;
        }
        .footer__grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr;
          gap: 64px;
          margin-bottom: 80px;
        }
        .footer__logo {
          display: flex;
          align-items: baseline;
          gap: 8px;
          margin-bottom: 20px;
        }
        .footer__logo-main {
          font-family: 'Montserrat', sans-serif;
          font-size: 28px;
          font-weight: 400;
          color: #fff;
        }
        .footer__logo-dot { color: #C9A962; font-size: 26px; }
        .footer__logo-sub {
          font-family: 'Open Sans', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          color: rgba(255,255,255,0.4);
          text-transform: uppercase;
        }
        .footer__desc {
          font-size: 14px;
          color: rgba(255,255,255,0.45);
          line-height: 1.75;
          max-width: 300px;
        }
        .footer__heading {
          font-family: 'Open Sans', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          margin-bottom: 24px;
        }
        .footer__list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .footer__list li {
          margin-bottom: 12px;
        }
        .footer__link, .footer__text {
          font-size: 14px;
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          transition: color 0.25s;
        }
        .footer__link:hover { color: #C9A962; }
        .footer__bottom {
          border-top: 1px solid rgba(255,255,255,0.08);
          padding-top: 32px;
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: rgba(255,255,255,0.35);
        }

        @media (max-width: 1100px) {
          .footer__grid { grid-template-columns: 1fr 1fr; gap: 48px; }
        }
        @media (max-width: 640px) {
          .footer__grid { grid-template-columns: 1fr; gap: 40px; }
          .footer__bottom { flex-direction: column; gap: 12px; text-align: center; }
        }
      `}</style>
    </footer>
  )
}
