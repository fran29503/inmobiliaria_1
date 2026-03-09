"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import Image from "next/image"
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button"

export default function CTA() {
  const containerRef = useRef<HTMLElement>(null)
  const ctaRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"])
  const isInView = useInView(ctaRef, { once: true, margin: "-80px" })

  return (
    <section ref={containerRef} className="cta-section">
      {/* Background texture */}
      <div className="cta-section__bg">
        <Image
          src="https://framerusercontent.com/images/u1hEqFmJEUFPRIoLCS06cD6UE.jpg"
          alt=""
          fill
          style={{ objectFit: "cover" }}
          priority={false}
        />
        <div className="cta-section__bg-overlay" />
      </div>

      {/* Property image */}
      <div className="cta-section__img">
        <motion.div style={{ y: imgY, height: "120%", width: "100%", position: "absolute", top: "-10%", left: 0 }}>
          <Image
            src="https://framerusercontent.com/images/A9iTwwkXCiQfTEkxv8WnDHfccqk.png"
            alt="Luxury residence"
            fill
            style={{ objectFit: "cover" }}
          />
        </motion.div>
        <div className="cta-section__img-overlay" />
      </div>

      {/* Content */}
      <div ref={ctaRef} className="cta-section__content">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="t-label"
          style={{ color: "var(--gold)", marginBottom: "20px", letterSpacing: "0.1em" }}
        >
          Your Dream Home Awaits
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="cta-section__title"
        >
          Begin your extraordinary life.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="cta-section__body"
        >
          Whether you&apos;re exploring our homes or envisioning something custom, we&apos;re here to bring your dream to life.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="cta-section__actions"
        >
          <InteractiveHoverButton
            text="Get In Touch"
            variant="gold"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          />
          <InteractiveHoverButton
            text="Explore Properties"
            variant="outline"
            onClick={() => document.getElementById("properties")?.scrollIntoView({ behavior: "smooth" })}
          />
        </motion.div>
      </div>

      <style>{`
        .cta-section {
          position: relative;
          min-height: 600px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          overflow: hidden;
        }
        .cta-section__bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .cta-section__bg-overlay {
          position: absolute;
          inset: 0;
          background: rgba(13,13,13,0.85);
        }
        .cta-section__img {
          position: relative;
          z-index: 1;
          overflow: hidden;
        }
        .cta-section__img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, rgba(13,13,13,0.5), transparent 60%);
          z-index: 2;
        }
        .cta-section__content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 100px 80px 100px 80px;
        }
        .cta-section__title {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(32px, 3.5vw, 52px);
          font-weight: 400;
          line-height: 1.15;
          letter-spacing: -0.02em;
          color: #FAFAF8;
          margin-bottom: 24px;
        }
        .cta-section__body {
          font-size: 17px;
          line-height: 1.75;
          color: rgba(250,250,248,0.65);
          max-width: 400px;
          margin-bottom: 48px;
        }
        .cta-section__actions {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }
        .cta-section__btn-primary {
          height: 56px;
          padding: 0 32px;
          background: var(--gold);
          color: #1A1A1A;
          border: none;
          border-radius: 8px;
          font-family: 'Open Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.02em;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        .cta-section__btn-primary:hover {
          background: var(--gold-dark);
        }
        .cta-section__btn-secondary {
          height: 56px;
          padding: 0 32px;
          background: transparent;
          color: rgba(250,250,248,0.85);
          border: 1px solid rgba(250,250,248,0.25);
          border-radius: 8px;
          font-family: 'Open Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.02em;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        @media (max-width: 1024px) {
          .cta-section__content { padding: 80px 48px; }
        }
        @media (max-width: 768px) {
          .cta-section {
            grid-template-columns: 1fr;
          }
          .cta-section__img { height: 300px; }
          .cta-section__content { padding: 60px 24px; }
        }
      `}</style>
    </section>
  )
}
