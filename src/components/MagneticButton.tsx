"use client"

import { useRef, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

interface MagneticButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: "primary" | "secondary" | "gold" | "nav"
  className?: string
  type?: "button" | "submit"
  disabled?: boolean
  style?: React.CSSProperties
  magnetStrength?: number
}

export default function MagneticButton({
  children,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
  disabled = false,
  style,
  magnetStrength = 0.28,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([])

  // Magnetic spring values
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const springX = useSpring(rawX, { stiffness: 220, damping: 18, mass: 0.4 })
  const springY = useSpring(rawY, { stiffness: 220, damping: 18, mass: 0.4 })

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current || disabled) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    rawX.set((e.clientX - cx) * magnetStrength)
    rawY.set((e.clientY - cy) * magnetStrength)
  }

  const handleMouseLeave = () => {
    rawX.set(0)
    rawY.set(0)
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return
    // Ripple
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      const id = Date.now()
      setRipples(prev => [
        ...prev,
        { x: e.clientX - rect.left, y: e.clientY - rect.top, id },
      ])
      setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 750)
    }
    onClick?.()
  }

  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={disabled}
      className={`mag-btn mag-btn--${variant} ${className}`}
      style={{ x: springX, y: springY, ...style }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 380, damping: 22 }}
    >
      {/* Shimmer layer */}
      <span className="mag-btn__shimmer" aria-hidden="true" />

      {/* Ripples */}
      {ripples.map(r => (
        <span
          key={r.id}
          className="mag-btn__ripple"
          style={{ left: r.x, top: r.y }}
          aria-hidden="true"
        />
      ))}

      {/* Actual content */}
      <span className="mag-btn__label">{children}</span>
    </motion.button>
  )
}
