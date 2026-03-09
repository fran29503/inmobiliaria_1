"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { properties } from "@/lib/properties"

const SHOWCASE = [...properties].sort((a, b) => b.priceRaw - a.priceRaw).slice(0, 8)
const N = SHOWCASE.length

function mod(a: number, b: number) { return ((a % b) + b) % b }

// Card dimensions
const CARD_W = 640
const CARD_H = 420
const GAP    = 28
const STEP   = CARD_W + GAP  // 668px — track shift per slot

// Normalized position of card i when active = a
// Returns values like: -3, -2, -1, 0, 1, 2, 3
function relPos(i: number, a: number): number {
  let p = mod(i - a, N)
  if (p > N / 2) p -= N
  return p
}

const EASE = [0.25, 0.1, 0.25, 1] as const

export default function Properties() {
  const [active, setActive]       = useState(0)
  const [imgHovered, setImgHovered] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)
  const isInView  = useInView(headerRef, { once: true, margin: "-50px" })

  const goPrev = () => { setActive(a => mod(a - 1, N)); setImgHovered(false) }
  const goNext = () => { setActive(a => mod(a + 1, N)); setImgHovered(false) }

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
      {/* ── HEADER ───────────────────────────────────────── */}
      <div
        ref={headerRef}
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "0 80px",
          marginBottom: 64,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 40,
        }}
      >
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
          className="t-body"
          style={{ maxWidth: 300, paddingTop: 8, textAlign: "right" }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Handpicked residences where luxury, design, and comfort meet.
        </motion.p>
      </div>

      {/* ── CAROUSEL ─────────────────────────────────────── */}
      {/*
        All N cards are always in the DOM → images stay cached.
        We only skip rendering positions beyond ±2 for performance.
        Position 0 = center (full), ±1 = side (blurred), ±2 = off-screen (hidden but loaded).
      */}
      <div style={{ position: "relative", height: CARD_H + 148 }}>
        {SHOWCASE.map((prop, i) => {
          const pos      = relPos(i, active)
          const isCenter = pos === 0
          const isSide   = Math.abs(pos) === 1
          const isFar    = Math.abs(pos) === 2

          // Skip cards more than 2 slots away (8 cards → 5 rendered at most)
          if (Math.abs(pos) > 2) return null

          return (
            <motion.div
              key={i}
              animate={{
                x:       pos * STEP - CARD_W / 2,
                opacity: isCenter ? 1 : isSide ? 0.38 : 0,
                scale:   isCenter ? 1 : isSide ? 0.95  : 0.88,
              }}
              transition={{ duration: 0.52, ease: EASE }}
              style={{
                position: "absolute",
                left: "50%",
                top: 0,
                width: CARD_W,
                // filter not animated — instant change is fine
                filter: isCenter ? "none" : "blur(1.2px) saturate(0.72)",
                zIndex:  isCenter ? 10 : isSide ? 5 : 1,
                cursor:  isSide ? "pointer" : "default",
                // Keep far cards invisible but loaded
                visibility: isFar ? "hidden" : "visible",
              }}
              onClick={() => {
                if (pos === -1) goPrev()
                if (pos === 1)  goNext()
              }}
            >
              {/* ── IMAGE ── */}
              {/*
                Both images always in DOM for this card.
                Crossfade is pure CSS opacity — zero remount, zero reload lag.
                images[1] is preloaded automatically by Next.js as soon as card renders.
              */}
              <div
                style={{
                  position: "relative",
                  height: CARD_H,
                  borderRadius: 16,
                  overflow: "hidden",
                  background: "#e8e4df",
                  flexShrink: 0,
                }}
                onMouseEnter={() => isCenter && setImgHovered(true)}
                onMouseLeave={() => isCenter && setImgHovered(false)}
              >
                {/* Image 0 — exterior */}
                <Image
                  src={prop.images[0]}
                  alt={prop.address}
                  fill
                  sizes="640px"
                  priority={isCenter || isSide}
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                    opacity: isCenter && imgHovered ? 0 : 1,
                    transition: "opacity 0.4s ease",
                  }}
                />
                {/* Image 1 — interior / second angle (preloaded, crossfades on hover) */}
                {prop.images[1] && (
                  <Image
                    src={prop.images[1]}
                    alt={prop.address}
                    fill
                    sizes="640px"
                    priority={isCenter}
                    style={{
                      objectFit: "cover",
                      objectPosition: "center",
                      opacity: isCenter && imgHovered ? 1 : 0,
                      transition: "opacity 0.4s ease",
                    }}
                  />
                )}
              </div>

              {/* ── INFO ── */}
              <div style={{ padding: "22px 4px 0" }}>
                {/* Row: name + price (same layout for all, visibility controlled) */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    gap: 16,
                    marginBottom: 12,
                    flexWrap: "wrap",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: isCenter ? 30 : 20,
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      letterSpacing: "-0.025em",
                      lineHeight: 1.15,
                      margin: 0,
                      transition: "font-size 0.3s ease",
                    }}
                  >
                    {prop.address.split(",")[0]}
                  </h3>
                  <span
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: isCenter ? 30 : 20,
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      letterSpacing: "-0.025em",
                      flexShrink: 0,
                      transition: "font-size 0.3s ease",
                    }}
                  >
                    {prop.price}
                  </span>
                </div>

                {/* Description + meta — only visible for center card */}
                <div
                  style={{
                    opacity: isCenter ? 1 : 0,
                    maxHeight: isCenter ? 80 : 0,
                    overflow: "hidden",
                    transition: "opacity 0.35s ease, max-height 0.35s ease",
                  }}
                >
                  <p
                    style={{
                      fontSize: 15,
                      color: "var(--text-secondary)",
                      lineHeight: 1.65,
                      marginBottom: 16,
                      maxWidth: "72%",
                    }}
                  >
                    {prop.beds} bedroom residence in {prop.neighborhood} with{" "}
                    {prop.sqft.toLocaleString()} sqft.
                  </p>
                  <div
                    style={{
                      display: "flex",
                      gap: 28,
                      fontSize: 14,
                      color: "var(--text-muted)",
                    }}
                  >
                    <span>{prop.beds} bedrooms</span>
                    <span>{prop.baths} bathrooms</span>
                  </div>
                </div>

                {/* Side-card secondary line */}
                <div
                  style={{
                    opacity: isCenter ? 0 : 1,
                    maxHeight: isCenter ? 0 : 40,
                    overflow: "hidden",
                    transition: "opacity 0.35s ease, max-height 0.35s ease",
                    fontSize: 13,
                    color: "var(--text-muted)",
                  }}
                >
                  {prop.beds} bedrooms · {prop.baths} bathrooms
                </div>
              </div>
            </motion.div>
          )
        })}

        {/* ── ARROWS (outside AnimatePresence, always stable) ── */}
        {(["prev", "next"] as const).map(dir => {
          const isPrev = dir === "prev"
          return (
            <button
              key={dir}
              onClick={isPrev ? goPrev : goNext}
              aria-label={isPrev ? "Previous property" : "Next property"}
              style={{
                position: "absolute",
                top: CARD_H / 2 - 24,
                left: isPrev
                  ? `calc(50% - ${CARD_W / 2 + GAP / 2 + 24}px)`
                  : `calc(50% + ${CARD_W / 2 + GAP / 2 - 24}px)`,
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: "#1A1A1A",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                zIndex: 20,
                boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
                transform: "translateX(-50%)",
                transition: "background 0.25s",
              }}
              onMouseEnter={e =>
                ((e.currentTarget as HTMLButtonElement).style.background = "var(--gold)")
              }
              onMouseLeave={e =>
                ((e.currentTarget as HTMLButtonElement).style.background = "#1A1A1A")
              }
            >
              {isPrev ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            </button>
          )
        })}
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 768px) {
          #properties { padding: 60px 0 48px !important; }
        }
      `}</style>
    </section>
  )
}
