"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import Image from "next/image"
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button"

export default function About() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -40])

  const h1Ref = useRef(null)
  const h1InView = useInView(h1Ref, { once: true, margin: "-50px" })

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="about" className="about section-padding" style={{ background: "#F5F3EF" }}>
      <div className="section-wrap">
        <div ref={containerRef} className="about__grid">
          <motion.div style={{ y: y1 }} className="about__image-wrap">
            <div className="about__image">
              <Image
                src="https://ssl.cdn-redfin.com/photo/106/bigphoto/736/RX-11157736_0.jpg"
                alt="Bugs Properties"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <motion.div
              className="about__stat"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={h1InView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <span className="about__stat-n">340+</span>
              <span className="about__stat-l">Successful Transactions</span>
            </motion.div>
          </motion.div>

          <motion.div ref={h1Ref} className="about__content">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={h1InView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="t-label"
              style={{ color: "var(--gold)", marginBottom: "16px" }}
            >
              About Bugs
            </motion.p>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={h1InView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="t-h2"
              style={{ marginBottom: "28px" }}
            >
              The art of exceptional living in every detail.
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={h1InView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="t-body"
              style={{ marginBottom: "20px", fontSize: "17px", lineHeight: 1.8 }}
            >
              For over fifteen years, Bugs Properties has operated at the intersection of architectural refinement and discreet wealth management. We do not simply list homes — we curate access to residences that embody a life well considered.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={h1InView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="t-body"
              style={{ marginBottom: "36px", color: "var(--text-muted)" }}
            >
              Our portfolio spans the most coveted addresses across four premier American markets, each property personally vetted against our uncompromising standard of irreplaceable quality.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={h1InView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <InteractiveHoverButton
                text="Let's Talk"
                variant="dark"
                onClick={scrollToContact}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .about__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 100px;
          align-items: center;
        }
        .about__image-wrap {
          position: relative;
        }
        .about__image {
          position: relative;
          height: 600px;
          border-radius: 16px;
          overflow: hidden;
        }
        .about__stat {
          position: absolute;
          bottom: -30px;
          right: -30px;
          background: #fff;
          border-radius: 16px;
          padding: 28px 36px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.10);
        }
        .about__stat-n {
          font-family: 'Montserrat', sans-serif;
          font-size: 48px;
          font-weight: 400;
          color: var(--gold);
          display: block;
          line-height: 1;
        }
        .about__stat-l {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-top: 8px;
          display: block;
        }
        .about__content {
          padding-right: 40px;
        }

        @media (max-width: 1024px) {
          .about__grid { gap: 60px; }
        }
        @media (max-width: 768px) {
          .about__grid { 
            grid-template-columns: 1fr; 
            gap: 60px;
          }
          .about__image { height: 400px; }
          .about__content { padding-right: 0; }
          .about__stat { right: 20px; bottom: -20px; padding: 20px 28px; }
        }
      `}</style>
    </section>
  )
}
