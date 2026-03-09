"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface MenuItem {
  icon: LucideIcon | React.FC
  label: string
  href: string
  gradient: string
  iconColor: string
  shadowColor: string
}

interface MenuBarProps extends React.HTMLAttributes<HTMLDivElement> {
  items: MenuItem[]
  activeItem?: string
  onItemClick?: (label: string) => void
  scrolled?: boolean
}

const itemVariants = {
  initial: { rotateX: 0, opacity: 1 },
  hover: { rotateX: -90, opacity: 0 },
}

const backVariants = {
  initial: { rotateX: 90, opacity: 0 },
  hover: { rotateX: 0, opacity: 1 },
}

const glowVariants = {
  initial: { opacity: 0, scale: 0.8 },
  hover: {
    opacity: 1,
    scale: 2,
    transition: {
      opacity: { duration: 0.5, ease: "easeInOut" as const },
      scale: { duration: 0.5, type: "spring" as const, stiffness: 300, damping: 25 },
    },
  },
}

const sharedTransition = {
  type: "spring" as const,
  stiffness: 100,
  damping: 20,
  duration: 0.5,
}

export const MenuBar = React.forwardRef<HTMLDivElement, MenuBarProps>(
  ({ className, items, activeItem, onItemClick, scrolled = false, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        className={cn("flex items-center gap-3", className)}
        {...props}
      >
        {items.map((item) => {
          const Icon = item.icon
          const isActive = item.label === activeItem

          return (
            <motion.div
              key={item.label}
              className="relative rounded-xl"
              animate={{
                boxShadow: isActive
                  ? `0 4px 24px ${item.shadowColor}`
                  : `0 2px 10px ${item.shadowColor.replace(/[\d.]+\)$/, "0.12)")}`,
              }}
              whileHover={{
                boxShadow: `0 4px 24px ${item.shadowColor}`,
              }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              <button
                onClick={() => onItemClick?.(item.label)}
                className="block w-full"
              >
                <motion.div
                  className="block rounded-xl overflow-visible group relative"
                  style={{ perspective: "600px" }}
                  whileHover="hover"
                  initial="initial"
                >
                  {/* Glow effect */}
                  <motion.div
                    className="absolute inset-0 z-0 pointer-events-none rounded-xl"
                    variants={glowVariants}
                    animate={isActive ? "hover" : "initial"}
                    style={{
                      background: item.gradient,
                      opacity: isActive ? 1 : 0,
                    }}
                  />

                  {/* Front face */}
                  <motion.div
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 relative z-10 rounded-xl transition-colors",
                      scrolled
                        ? isActive
                          ? "text-[var(--text-primary)]"
                          : "text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]"
                        : isActive
                        ? "text-white"
                        : "text-white/75 group-hover:text-white",
                    )}
                    variants={itemVariants}
                    transition={sharedTransition}
                    style={{
                      transformStyle: "preserve-3d",
                      transformOrigin: "center bottom",
                    }}
                  >
                    <span className={cn("transition-colors duration-300", isActive ? item.iconColor : "")}>
                      <Icon className="h-4 w-4" />
                    </span>
                    <span
                      style={{
                        fontFamily: "'Open Sans', sans-serif",
                        fontSize: "15px",
                        fontWeight: 500,
                      }}
                    >
                      {item.label}
                    </span>
                  </motion.div>

                  {/* Back face (flip) */}
                  <motion.div
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 absolute inset-0 z-10 rounded-xl transition-colors",
                      scrolled
                        ? isActive
                          ? "text-[var(--text-primary)]"
                          : "text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]"
                        : isActive
                        ? "text-white"
                        : "text-white/75 group-hover:text-white",
                    )}
                    variants={backVariants}
                    transition={sharedTransition}
                    style={{
                      transformStyle: "preserve-3d",
                      transformOrigin: "center top",
                      rotateX: 90,
                    }}
                  >
                    <span className={cn("transition-colors duration-300", item.iconColor)}>
                      <Icon className="h-4 w-4" />
                    </span>
                    <span
                      style={{
                        fontFamily: "'Open Sans', sans-serif",
                        fontSize: "15px",
                        fontWeight: 500,
                      }}
                    >
                      {item.label}
                    </span>
                  </motion.div>
                </motion.div>
              </button>
            </motion.div>
          )
        })}
      </nav>
    )
  },
)

MenuBar.displayName = "MenuBar"
