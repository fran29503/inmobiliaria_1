"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"

export default function VideoSection() {
  const containerRef = useRef<HTMLElement>(null)
  const textRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1])
  const isInView = useInView(textRef, { once: true, margin: "-100px" })

  return (
    <section ref={containerRef} className="video-section">
      {/* Video background */}
      <div className="video-section__bg">
        <motion.div style={{ scale, width: "100%", height: "100%" }}>
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          >
            <source
              src="https://scroll-supply.s3.us-east-005.backblazeb2.com/Video.mp4"
              type="video/mp4"
            />
          </video>
        </motion.div>
        <div className="video-section__overlay" />
      </div>

      {/* Text content */}
      <div ref={textRef} className="video-section__content">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="t-label"
          style={{ color: "rgba(201,169,98,0.9)", marginBottom: "24px", letterSpacing: "0.12em" }}
        >
          The Bugs Experience
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="video-section__heading"
        >
          Step inside a world where exceptional design and timeless luxury meet.
        </motion.h2>

        <motion.a
          href="#contact"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="video-section__cta"
          onClick={(e) => {
            e.preventDefault()
            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
          }}
        >
          Begin a Conversation
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginLeft: 8 }}>
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.a>
      </div>

      <style>{`
        .video-section {
          position: relative;
          height: 600px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .video-section__bg {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }
        .video-section__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(13,13,13,0.78) 0%,
            rgba(13,13,13,0.55) 60%,
            rgba(13,13,13,0.72) 100%
          );
        }
        .video-section__content {
          position: relative;
          z-index: 2;
          text-align: center;
          max-width: 800px;
          padding: 0 40px;
        }
        .video-section__heading {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(28px, 4vw, 52px);
          font-weight: 400;
          line-height: 1.2;
          letter-spacing: -0.02em;
          color: #FAFAF8;
          margin-bottom: 40px;
        }
        .video-section__heading em {
          font-style: italic;
          color: var(--gold);
        }
        .video-section__cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          color: rgba(250,250,248,0.9);
          border: 1px solid rgba(250,250,248,0.3);
          border-radius: 8px;
          padding: 14px 28px;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.02em;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .video-section__cta:hover {
          background: rgba(250,250,248,0.1);
          border-color: rgba(250,250,248,0.6);
          color: #fff;
        }

        @media (max-width: 640px) {
          .video-section { height: 480px; }
          .video-section__content { padding: 0 24px; }
        }
      `}</style>
    </section>
  )
}
