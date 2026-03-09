"use client"

import { useState } from "react"

interface BubbleTextProps {
  text: string
  className?: string
}

export const BubbleText = ({ text, className = "" }: BubbleTextProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <span
      className={className}
      onMouseLeave={() => setHoveredIndex(null)}
      style={{ display: "inline", cursor: "default" }}
    >
      {text.split("").map((char, idx) => {
        const distance = hoveredIndex !== null ? Math.abs(hoveredIndex - idx) : null

        let style: React.CSSProperties = {
          display: "inline",
          transition: "font-weight 0.2s ease, color 0.2s ease",
          fontWeight: 700,
          color: "rgba(255,255,255,0.88)",
        }

        if (distance === 0) {
          style.fontWeight = 900
          style.color = "#ffffff"
        } else if (distance === 1) {
          style.fontWeight = 800
          style.color = "rgba(255,255,255,0.96)"
        } else if (distance === 2) {
          style.fontWeight = 700
          style.color = "rgba(255,255,255,0.92)"
        }

        return (
          <span
            key={idx}
            onMouseEnter={() => setHoveredIndex(idx)}
            style={style}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        )
      })}
    </span>
  )
}
