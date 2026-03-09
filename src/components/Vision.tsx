"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import Image from "next/image"

export default function Vision() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -30])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 30])

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <section ref={containerRef} className="vision section-padding" style={{ background: "#FAFAF8" }}>
      <div className="section-wrap">
        <div className="vision__grid">
          <motion.div ref={ref} style={{ y: y1 }} className="vision__content">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="t-label"
              style={{ color: "var(--gold)", marginBottom: "16px" }}
            >
              Our Vision
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="t-h1"
              style={{ marginBottom: "28px" }}
            >
              Where your <em>vision</em>{" "}
              <span className="vision__italic">finds its</span>{" "}
              home.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="t-body-lg"
              style={{ maxWidth: "480px", marginBottom: "40px" }}
            >
              Bugs Properties offers more than just a place to live — it&apos;s a space
              designed to reflect your unique style, crafted with timeless precision,
              and built to inspire for generations to come.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="vision__stats"
            >
              {[
                { n: "340+", l: "Properties Sold" },
                { n: "15yr", l: "Market Experience" },
                { n: "4", l: "Premier Markets" },
              ].map((s) => (
                <div key={s.l} className="vision__stat">
                  <span className="vision__stat-n">{s.n}</span>
                  <span className="vision__stat-l">{s.l}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div style={{ y: y2 }} className="vision__image">
            <div className="vision__image-wrap">
              <Image
                src="https://framerusercontent.com/images/Hp1B3GooVfh6C0Ix1hDLtqwoUM.png"
                alt="Luxury interior"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="vision__full"
        >
          <Image
            src="https://framerusercontent.com/images/4ARbkiepiS4DCGfycL7Z6iFn2dM.png"
            alt="Luxury property full width"
            fill
            style={{ objectFit: "cover" }}
          />
          <div className="vision__full-overlay" />
        </motion.div>
      </div>

      <style>{`
        .vision__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
          margin-bottom: 80px;
        }
        .vision__content em {
          font-style: italic;
          color: var(--gold);
        }
        .vision__italic {
          font-family: 'Montserrat', sans-serif;
          font-style: italic;
        }
        .vision__stats {
          display: flex;
          gap: 48px;
          padding-top: 40px;
          border-top: 1px solid rgba(0,0,0,0.08);
        }
        .vision__stat {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .vision__stat-n {
          font-family: 'Montserrat', sans-serif;
          font-size: 32px;
          font-weight: 400;
          color: var(--text-primary);
          line-height: 1;
        }
        .vision__stat-l {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-muted);
        }
        .vision__image-wrap {
          position: relative;
          height: 540px;
          border-radius: 16px;
          overflow: hidden;
        }
        .vision__full {
          position: relative;
          height: 480px;
          border-radius: 16px;
          overflow: hidden;
        }
        .vision__full-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 50%, rgba(26,26,26,0.4));
        }

        @media (max-width: 1024px) {
          .vision__grid { gap: 60px; }
          .vision__image-wrap { height: 420px; }
        }
        @media (max-width: 768px) {
          .vision__grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .vision__image-wrap { height: 300px; }
          .vision__full { height: 280px; }
          .vision__stats { gap: 32px; }
        }
      `}</style>
    </section>
  )
}
