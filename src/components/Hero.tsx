"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button"
import { BubbleText } from "@/components/ui/bubble-text"

const HERO_IMAGES = [
  "https://ssl.cdn-redfin.com/photo/211/bigphoto/186/RLS10975186_1F.jpg",
  "https://ssl.cdn-redfin.com/photo/106/bigphoto/736/RX-11157736_0.jpg",
  "https://ssl.cdn-redfin.com/photo/105/bigphoto/012/A11950012_0.jpg",
]

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const contentRef = useRef(null)
  const contentInView = useInView(contentRef, { once: true })

  return (
    <section className="hero">
      {/* Background */}
      <div className="hero__slides">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="hero__slide"
          >
            <Image
              src={HERO_IMAGES[currentSlide]}
              alt="Luxury property"
              fill
              priority
              style={{ objectFit: "cover" }}
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Texture overlay */}
        <div className="hero__texture" />
        
        {/* Gradient overlay */}
        <div className="hero__overlay" />
      </div>

      {/* Content */}
      <div className="hero__content" ref={contentRef}>
        <div className="hero__inner">
          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="hero__tag"
          >
            <span className="hero__tag-dot" />
            Curated Real Estate · Est. 2009
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="t-hero"
          >
            <BubbleText text="Extraordinary" />
            <br />
            <em><BubbleText text="living" /></em>
            <br />
            <BubbleText text="begins here." />
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="hero__subtitle"
          >
            Timeless architecture, exclusive locations, and luxury homes 
            designed to inspire your next chapter.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            className="hero__ctas"
          >
            <InteractiveHoverButton
              text="Explore Collection"
              variant="gold"
              onClick={() => document.getElementById("properties")?.scrollIntoView({ behavior: "smooth" })}
            />
            <InteractiveHoverButton
              text="Schedule Viewing"
              variant="outline"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            />
          </motion.div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="hero__indicators">
        {HERO_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => { setCurrentSlide(i); setIsAutoPlaying(false); }}
            onMouseEnter={() => setIsAutoPlaying(false)}
            className={`hero__indicator ${i === currentSlide ? "active" : ""}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="hero__scroll"
      >
        <span>Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="hero__scroll-line"
        />
      </motion.div>

      <style>{`
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          background: #1A1A1A;
        }
        .hero__slides {
          position: absolute;
          inset: 0;
        }
        .hero__slide {
          position: absolute;
          inset: 0;
        }
        .hero__texture {
          position: absolute;
          inset: 0;
          background-image: url('https://framerusercontent.com/images/u1hEqFmJEUFPRIoLCS06cD6UE.jpg?width=4800&height=4800');
          background-size: cover;
          opacity: 0.15;
          mix-blend-mode: overlay;
          z-index: 1;
        }
        .hero__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(26,26,26,0.75) 0%,
            rgba(26,26,26,0.45) 50%,
            rgba(26,26,26,0.65) 100%
          );
          z-index: 2;
        }
        .hero__content {
          position: relative;
          z-index: 3;
          width: 100%;
          padding: 160px 0 100px;
        }
        .hero__inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 80px;
        }
        .hero__tag {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 8px;
          padding: 10px 20px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.8);
          text-transform: uppercase;
          margin-bottom: 40px;
        }
        .hero__tag-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #C9A962;
        }
        .hero__subtitle {
          color: rgba(255,255,255,0.75) !important;
          max-width: 520px;
          margin-bottom: 48px;
          font-size: 18px;
          line-height: 1.8;
        }
        .hero__ctas {
          display: flex;
          gap: 16px;
        }
        .hero__indicators {
          position: absolute;
          bottom: 60px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 12px;
          z-index: 10;
        }
        .hero__indicator {
          width: 40px;
          height: 3px;
          border-radius: 2px;
          background: rgba(255,255,255,0.3);
          border: none;
          cursor: pointer;
          padding: 0;
          transition: all 0.4s ease;
        }
        .hero__indicator.active {
          background: #C9A962;
        }
        .hero__scroll {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          z-index: 10;
        }
        .hero__scroll span {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
        }
        .hero__scroll-line {
          width: 1px;
          height: 40px;
          background: linear-gradient(to bottom, rgba(255,255,255,0.5), transparent);
        }

        @media (max-width: 1024px) {
          .hero__inner { padding: 0 48px; }
          .hero__content { padding: 140px 0 80px; }
        }
        @media (max-width: 640px) {
          .hero__inner { padding: 0 24px; }
          .hero__content { padding: 120px 0 80px; }
          .hero__ctas { flex-direction: column; }
          .hero__ctas > * { width: 100%; }
          .hero__subtitle { font-size: 16px; margin-bottom: 36px; }
          .hero__indicators { bottom: 44px; }
          .hero__scroll { display: none; }
          .hero__tag { font-size: 10px; padding: 8px 14px; margin-bottom: 28px; }
        }
      `}</style>
    </section>
  )
}
