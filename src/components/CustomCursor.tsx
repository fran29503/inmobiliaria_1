"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export default function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const [hoveringLink, setHoveringLink] = useState(false)
  const [hoveringImage, setHoveringImage] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const springConfig = { damping: 28, stiffness: 300, mass: 0.5 }
  const dotConfig = { damping: 40, stiffness: 600, mass: 0.3 }

  const x = useSpring(cursorX, springConfig)
  const y = useSpring(cursorY, springConfig)
  const dotX = useSpring(cursorX, dotConfig)
  const dotY = useSpring(cursorY, dotConfig)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const enter = () => {
      const target = document.activeElement as Element
      const el = document.querySelectorAll("button, a, [data-cursor-hover]")
      el.forEach((el) => {
        el.addEventListener("mouseenter", () => setHoveringLink(true))
        el.addEventListener("mouseleave", () => setHoveringLink(false))
      })
      const imgs = document.querySelectorAll("[data-cursor-image]")
      imgs.forEach((el) => {
        el.addEventListener("mouseenter", () => setHoveringImage(true))
        el.addEventListener("mouseleave", () => setHoveringImage(false))
      })
    }

    const onMouseEnterBtn = () => setHoveringLink(true)
    const onMouseLeaveBtn = () => setHoveringLink(false)
    const onMouseEnterImg = () => setHoveringImage(true)
    const onMouseLeaveImg = () => setHoveringImage(false)

    document.addEventListener("mousemove", move)

    const addListeners = () => {
      document.querySelectorAll("button, a").forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnterBtn)
        el.addEventListener("mouseleave", onMouseLeaveBtn)
      })
      document.querySelectorAll("[data-cursor-image]").forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnterImg)
        el.addEventListener("mouseleave", onMouseLeaveImg)
      })
    }

    addListeners()
    const observer = new MutationObserver(addListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener("mousemove", move)
      observer.disconnect()
    }
  }, [cursorX, cursorY, isVisible])

  return (
    <>
      {/* Outer ring */}
      <motion.div
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 9999,
          pointerEvents: "none",
          width: hoveringLink ? "50px" : hoveringImage ? "72px" : "32px",
          height: hoveringLink ? "50px" : hoveringImage ? "72px" : "32px",
          borderRadius: "50%",
          border: `1px solid ${hoveringImage ? "rgba(200,169,110,0.8)" : "rgba(200,169,110,0.5)"}`,
          opacity: isVisible ? 1 : 0,
          mixBlendMode: "normal",
          transition: "width 0.25s ease, height 0.25s ease, border-color 0.2s ease",
        }}
      />

      {/* Inner dot */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 10000,
          pointerEvents: "none",
          width: hoveringLink ? "6px" : "4px",
          height: hoveringLink ? "6px" : "4px",
          borderRadius: "50%",
          background: hoveringLink ? "var(--gold)" : "var(--cream)",
          opacity: isVisible ? 1 : 0,
          transition: "width 0.2s ease, height 0.2s ease, background 0.2s ease",
        }}
      />

      {/* "View" text on image hover */}
      {hoveringImage && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          style={{
            x,
            y,
            translateX: "-50%",
            translateY: "-50%",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 9998,
            pointerEvents: "none",
            fontSize: "9px",
            letterSpacing: "0.2em",
            color: "var(--gold)",
            textTransform: "uppercase",
            fontFamily: "'EB Garamond', Georgia, serif",
          }}
        >
          View
        </motion.div>
      )}

      <style>{`
        @media (pointer: coarse) {
          [data-custom-cursor] { display: none; }
        }
        body { cursor: none; }
        a, button { cursor: none; }
      `}</style>
    </>
  )
}
