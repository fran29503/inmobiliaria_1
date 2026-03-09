"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { properties } from "@/lib/properties"

const SHOWCASE = [...properties].sort((a, b) => b.priceRaw - a.priceRaw).slice(0, 8)
const N = SHOWCASE.length

function mod(a: number, b: number) { return ((a % b) + b) % b }

function relPos(i: number, a: number): number {
  let p = mod(i - a, N)
  if (p > N / 2) p -= N
  return p
}

const EASE = [0.25, 0.1, 0.25, 1] as const
const GAP = 28

export default function Properties() {
  const [active, setActive]         = useState(0)
  const [imgHovered, setImgHovered] = useState(false)
  const [cardW, setCardW]           = useState(640)
  const [cardH, setCardH]           = useState(420)
  const [isMobile, setIsMobile]     = useState(false)

  const headerRef   = useRef<HTMLDivElement>(null)
  const isInView    = useInView(headerRef, { once: true, margin: "-50px" })
  const touchStartX = useRef(0)

  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth
      if (vw < 640) {
        setCardW(vw - 48); setCardH(240); setIsMobile(true)
      } else if (vw < 1024) {
        setCardW(Math.min(500, vw - 96)); setCardH(340); setIsMobile(false)
      } else {
        setCardW(640); setCardH(420); setIsMobile(false)
      }
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  const STEP = cardW + GAP
  const prop = SHOWCASE[active]

  const goPrev = () => { setActive(a => mod(a - 1, N)); setImgHovered(false) }
  const goNext = () => { setActive(a => mod(a + 1, N)); setImgHovered(false) }

  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX }
  const onTouchEnd   = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 40) { diff > 0 ? goNext() : goPrev() }
  }

  return (
    <section id="properties" className="prop-section">

      {/* ── HEADER ─────────────────────────────────────── */}
      <div ref={headerRef} className="prop-header">
        <div>
          <motion.p className="t-label" style={{ color: "var(--gold)", marginBottom: 12 }}
            initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}>
            Current Portfolio
          </motion.p>
          <motion.h2 className="t-h2" style={{ maxWidth: 520 }}
            initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}>
            Discover homes designed to inspire.
          </motion.h2>
        </div>
        <motion.p className="t-body prop-header__desc"
          initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}>
          Handpicked residences where luxury, design, and comfort meet.
        </motion.p>
      </div>

      {/* ── IMAGE TRACK — solo imágenes, altura fija ───── */}
      <div
        className="prop-track"
        style={{ height: cardH }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {SHOWCASE.map((p, i) => {
          const pos      = relPos(i, active)
          const isCenter = pos === 0
          const isSide   = Math.abs(pos) === 1
          const isFar    = Math.abs(pos) === 2
          if (Math.abs(pos) > 2) return null

          return (
            <motion.div
              key={i}
              animate={{
                x:       pos * STEP - cardW / 2,
                opacity: isCenter ? 1 : (isMobile ? 0 : isSide ? 0.38 : 0),
                scale:   isCenter ? 1 : isSide ? 0.95 : 0.88,
              }}
              transition={{ duration: 0.52, ease: EASE }}
              style={{
                position:   "absolute",
                left:       "50%",
                top:        0,
                width:      cardW,
                height:     cardH,
                borderRadius: 16,
                overflow:   "hidden",
                background: "#e8e4df",
                filter:     isCenter ? "none" : "blur(1.2px) saturate(0.72)",
                zIndex:     isCenter ? 10 : isSide ? 5 : 1,
                cursor:     isSide ? "pointer" : "default",
                visibility: isFar ? "hidden" : "visible",
                flexShrink: 0,
              }}
              onMouseEnter={() => isCenter && setImgHovered(true)}
              onMouseLeave={() => isCenter && setImgHovered(false)}
              onClick={() => {
                if (pos === -1) goPrev()
                if (pos === 1)  goNext()
              }}
            >
              <Image src={p.images[0]} alt={p.address} fill sizes={`${cardW}px`}
                priority={isCenter || isSide}
                style={{ objectFit: "cover", opacity: isCenter && imgHovered ? 0 : 1, transition: "opacity 0.4s ease" }}
              />
              {p.images[1] && (
                <Image src={p.images[1]} alt={p.address} fill sizes={`${cardW}px`}
                  priority={isCenter}
                  style={{ objectFit: "cover", opacity: isCenter && imgHovered ? 1 : 0, transition: "opacity 0.4s ease" }}
                />
              )}
            </motion.div>
          )
        })}
      </div>

      {/* ── INFO — flujo normal, nunca superpone ──────── */}
      <div className="prop-info" style={{ maxWidth: cardW }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="prop-info__top">
              <h3 className="prop-info__title">{prop.address.split(",")[0]}</h3>
              <span className="prop-info__price">{prop.price}</span>
            </div>
            <p className="prop-info__desc">
              {prop.beds} bedroom residence in {prop.neighborhood} with {prop.sqft.toLocaleString()} sqft.
            </p>
            <div className="prop-info__meta">
              <span>{prop.beds} bedrooms</span>
              <span>{prop.baths} bathrooms</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── FLECHAS — flujo normal, siempre debajo ────── */}
      <div className="prop-arrows" style={{ maxWidth: cardW }}>
        <button onClick={goPrev} aria-label="Previous property" className="prop-arrow__btn">
          <ChevronLeft size={20} />
        </button>
        <button onClick={goNext} aria-label="Next property" className="prop-arrow__btn">
          <ChevronRight size={20} />
        </button>
      </div>

      <style>{`
        .prop-section {
          background: #fff;
          overflow: hidden;
          padding: 120px 0 80px;
        }
        .prop-header {
          max-width: 1400px;
          margin: 0 auto 64px;
          padding: 0 80px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 40px;
        }
        .prop-header__desc {
          max-width: 300px;
          padding-top: 8px;
          text-align: right;
          flex-shrink: 0;
        }
        /* Track: solo contiene las imágenes absolutas */
        .prop-track {
          position: relative;
          overflow: visible;
        }
        /* Info: flujo normal, centrado bajo el track */
        .prop-info {
          margin: 28px auto 0;
          padding: 0 4px;
        }
        .prop-info__top {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 12px;
        }
        .prop-info__title {
          font-family: var(--font-serif);
          font-size: clamp(20px, 2.5vw, 30px);
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.025em;
          line-height: 1.15;
          margin: 0;
        }
        .prop-info__price {
          font-family: var(--font-serif);
          font-size: clamp(20px, 2.5vw, 30px);
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.025em;
          flex-shrink: 0;
        }
        .prop-info__desc {
          font-size: 15px;
          color: var(--text-secondary);
          line-height: 1.65;
          margin-bottom: 10px;
        }
        .prop-info__meta {
          display: flex;
          gap: 24px;
          font-size: 13px;
          color: var(--text-muted);
        }
        /* Flechas: flujo normal, espacio limpio */
        .prop-arrows {
          margin: 28px auto 0;
          padding: 0 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }
        .prop-arrow__btn {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #1A1A1A;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          transition: background 0.25s ease, transform 0.2s ease;
          box-shadow: 0 4px 16px rgba(0,0,0,0.15);
          flex-shrink: 0;
        }
        .prop-arrow__btn:hover {
          background: var(--gold);
          transform: scale(1.08);
        }

        @media (max-width: 1024px) {
          .prop-header { padding: 0 48px; }
          .prop-section { padding: 80px 0 60px; }
        }
        @media (max-width: 768px) {
          .prop-section { padding: 60px 0 48px; }
          .prop-header {
            padding: 0 24px;
            flex-direction: column;
            margin-bottom: 40px;
            gap: 12px;
          }
          .prop-header__desc {
            text-align: left;
            padding-top: 0;
            max-width: 100%;
          }
          .prop-info { padding: 0 24px; }
          .prop-arrows { padding: 0 24px; margin-top: 24px; }
          .prop-arrow__btn { width: 44px; height: 44px; }
        }
      `}</style>
    </section>
  )
}
