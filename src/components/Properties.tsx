"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
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

  const headerRef  = useRef<HTMLDivElement>(null)
  const isInView   = useInView(headerRef, { once: true, margin: "-50px" })
  const touchStartX = useRef(0)

  // Responsive card dimensions
  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth
      if (vw < 640) {
        setCardW(vw - 48)
        setCardH(240)
        setIsMobile(true)
      } else if (vw < 1024) {
        setCardW(Math.min(500, vw - 96))
        setCardH(340)
        setIsMobile(false)
      } else {
        setCardW(640)
        setCardH(420)
        setIsMobile(false)
      }
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  const STEP = cardW + GAP

  const goPrev = () => { setActive(a => mod(a - 1, N)); setImgHovered(false) }
  const goNext = () => { setActive(a => mod(a + 1, N)); setImgHovered(false) }

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 40) { diff > 0 ? goNext() : goPrev() }
  }

  return (
    <section
      id="properties"
      style={{
        background: "#fff",
        overflow: "hidden",
        padding: "120px 0 80px",
        position: "relative",
      }}
    >
      {/* ── HEADER ─────────────────────────────────────────── */}
      <div ref={headerRef} className="prop-header">
        <div>
          <motion.p
            className="t-label"
            style={{ color: "var(--gold)", marginBottom: 12 }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Current Portfolio
          </motion.p>
          <motion.h2
            className="t-h2"
            style={{ maxWidth: 520 }}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Discover homes designed to inspire.
          </motion.h2>
        </div>
        <motion.p
          className="t-body prop-header__desc"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Handpicked residences where luxury, design, and comfort meet.
        </motion.p>
      </div>

      {/* ── CAROUSEL ──────────────────────────────────────── */}
      <div
        style={{ position: "relative", height: cardH + (isMobile ? 128 : 148) }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {SHOWCASE.map((prop, i) => {
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
                filter:     isCenter ? "none" : "blur(1.2px) saturate(0.72)",
                zIndex:     isCenter ? 10 : isSide ? 5 : 1,
                cursor:     isSide ? "pointer" : "default",
                visibility: isFar ? "hidden" : "visible",
              }}
              onClick={() => {
                if (pos === -1) goPrev()
                if (pos === 1)  goNext()
              }}
            >
              {/* IMAGE */}
              <div
                style={{
                  position:     "relative",
                  height:       cardH,
                  borderRadius: 16,
                  overflow:     "hidden",
                  background:   "#e8e4df",
                  flexShrink:   0,
                }}
                onMouseEnter={() => isCenter && setImgHovered(true)}
                onMouseLeave={() => isCenter && setImgHovered(false)}
              >
                <Image
                  src={prop.images[0]}
                  alt={prop.address}
                  fill
                  sizes={`${cardW}px`}
                  priority={isCenter || isSide}
                  style={{
                    objectFit:      "cover",
                    objectPosition: "center",
                    opacity:    isCenter && imgHovered ? 0 : 1,
                    transition: "opacity 0.4s ease",
                  }}
                />
                {prop.images[1] && (
                  <Image
                    src={prop.images[1]}
                    alt={prop.address}
                    fill
                    sizes={`${cardW}px`}
                    priority={isCenter}
                    style={{
                      objectFit:      "cover",
                      objectPosition: "center",
                      opacity:    isCenter && imgHovered ? 1 : 0,
                      transition: "opacity 0.4s ease",
                    }}
                  />
                )}
              </div>

              {/* INFO */}
              <div style={{ padding: "20px 4px 0" }}>
                <div
                  style={{
                    display:        "flex",
                    justifyContent: "space-between",
                    alignItems:     "baseline",
                    gap:            12,
                    marginBottom:   10,
                    flexWrap:       "wrap",
                  }}
                >
                  <h3
                    style={{
                      fontFamily:    "var(--font-serif)",
                      fontSize:      isCenter ? (isMobile ? 20 : 30) : 18,
                      fontWeight:    700,
                      color:         "var(--text-primary)",
                      letterSpacing: "-0.025em",
                      lineHeight:    1.15,
                      margin:        0,
                      transition:    "font-size 0.3s ease",
                    }}
                  >
                    {prop.address.split(",")[0]}
                  </h3>
                  <span
                    style={{
                      fontFamily:    "var(--font-serif)",
                      fontSize:      isCenter ? (isMobile ? 20 : 30) : 18,
                      fontWeight:    700,
                      color:         "var(--text-primary)",
                      letterSpacing: "-0.025em",
                      flexShrink:    0,
                      transition:    "font-size 0.3s ease",
                    }}
                  >
                    {prop.price}
                  </span>
                </div>

                {/* Center card: description + meta */}
                <div
                  style={{
                    opacity:    isCenter ? 1 : 0,
                    maxHeight:  isCenter ? 100 : 0,
                    overflow:   "hidden",
                    transition: "opacity 0.35s ease, max-height 0.35s ease",
                  }}
                >
                  <p
                    style={{
                      fontSize:   isMobile ? 13 : 15,
                      color:      "var(--text-secondary)",
                      lineHeight: 1.65,
                      marginBottom: 12,
                      maxWidth:   "80%",
                    }}
                  >
                    {prop.beds} bedroom residence in {prop.neighborhood} with{" "}
                    {prop.sqft.toLocaleString()} sqft.
                  </p>
                  <div
                    style={{
                      display:  "flex",
                      gap:      isMobile ? 16 : 28,
                      fontSize: 13,
                      color:    "var(--text-muted)",
                    }}
                  >
                    <span>{prop.beds} bedrooms</span>
                    <span>{prop.baths} bathrooms</span>
                  </div>
                </div>

                {/* Side card: single line */}
                <div
                  style={{
                    opacity:    isCenter ? 0 : 1,
                    maxHeight:  isCenter ? 0 : 40,
                    overflow:   "hidden",
                    transition: "opacity 0.35s ease, max-height 0.35s ease",
                    fontSize:   13,
                    color:      "var(--text-muted)",
                  }}
                >
                  {prop.beds} bedrooms · {prop.baths} bathrooms
                </div>
              </div>
            </motion.div>
          )
        })}

        {/* ── ARROWS ── */}
        {(["prev", "next"] as const).map(dir => {
          const isPrev = dir === "prev"
          const mobileStyle = {
            bottom: 8,
            top: "auto" as const,
            left: isPrev ? "calc(50% - 56px)" : "calc(50% + 8px)",
            transform: "none",
          }
          const desktopStyle = {
            top: cardH / 2 - 24,
            left: isPrev
              ? `calc(50% - ${cardW / 2 + GAP / 2 + 24}px)`
              : `calc(50% + ${cardW / 2 + GAP / 2 - 24}px)`,
            transform: "translateX(-50%)",
          }

          return (
            <button
              key={dir}
              onClick={isPrev ? goPrev : goNext}
              aria-label={isPrev ? "Previous property" : "Next property"}
              style={{
                position:  "absolute",
                width:     isMobile ? 44 : 48,
                height:    isMobile ? 44 : 48,
                borderRadius: "50%",
                background: "#1A1A1A",
                border:    "none",
                cursor:    "pointer",
                display:   "flex",
                alignItems:     "center",
                justifyContent: "center",
                color:     "#fff",
                zIndex:    20,
                boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
                transition: "background 0.25s",
                ...(isMobile ? mobileStyle : desktopStyle),
              }}
              onMouseEnter={e =>
                ((e.currentTarget as HTMLButtonElement).style.background = "var(--gold)")
              }
              onMouseLeave={e =>
                ((e.currentTarget as HTMLButtonElement).style.background = "#1A1A1A")
              }
            >
              {isPrev ? <ChevronLeft size={isMobile ? 18 : 20} /> : <ChevronRight size={isMobile ? 18 : 20} />}
            </button>
          )
        })}
      </div>

      <style>{`
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
        @media (max-width: 1024px) {
          .prop-header { padding: 0 48px; }
          #properties { padding: 80px 0 60px !important; }
        }
        @media (max-width: 768px) {
          #properties { padding: 60px 0 48px !important; }
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
        }
      `}</style>
    </section>
  )
}
