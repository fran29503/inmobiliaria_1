"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Building2, Users, Star, Phone } from "lucide-react"
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button"
import { MenuBar } from "@/components/ui/glow-menu"


const menuItems = [
  {
    icon: Building2,
    label: "Properties",
    href: "#properties",
    gradient: "radial-gradient(circle, rgba(201,169,98,0.25) 0%, rgba(201,169,98,0.08) 50%, rgba(201,169,98,0) 100%)",
    iconColor: "text-[#C9A962]",
    shadowColor: "rgba(201,169,98,0.35)",
  },
  {
    icon: Users,
    label: "About",
    href: "#about",
    gradient: "radial-gradient(circle, rgba(100,140,200,0.2) 0%, rgba(80,110,180,0.07) 50%, rgba(60,90,160,0) 100%)",
    iconColor: "text-blue-400",
    shadowColor: "rgba(100,140,200,0.35)",
  },
  {
    icon: Star,
    label: "Testimonials",
    href: "#testimonials",
    gradient: "radial-gradient(circle, rgba(168,139,74,0.25) 0%, rgba(168,139,74,0.08) 50%, rgba(168,139,74,0) 100%)",
    iconColor: "text-amber-400",
    shadowColor: "rgba(168,139,74,0.35)",
  },
  {
    icon: Phone,
    label: "Contact",
    href: "#contact",
    gradient: "radial-gradient(circle, rgba(74,168,120,0.2) 0%, rgba(50,140,90,0.07) 50%, rgba(30,120,70,0) 100%)",
    iconColor: "text-emerald-400",
    shadowColor: "rgba(74,168,120,0.35)",
  },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeItem, setActiveItem] = useState<string | undefined>(undefined)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  const scrollTo = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: "smooth" })
  }

  const handleMenuClick = (label: string) => {
    setActiveItem(label)
    const item = menuItems.find((m) => m.label === label)
    if (item) scrollTo(item.href)
  }

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 2.8, ease: [0.25, 0.1, 0.25, 1] }}
        className={`nav ${scrolled ? "nav--scrolled" : ""}`}
      >
        <div className="nav__inner">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="nav__logo"
          >
            <span className="nav__logo-main">Bugs</span>
            <span className="nav__logo-dot">·</span>
            <span className="nav__logo-sub">Properties</span>
          </button>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 2.9 }}
            className="nav__links"
          >
            <MenuBar
              items={menuItems}
              activeItem={activeItem}
              onItemClick={handleMenuClick}
              scrolled={scrolled}
            />
          </motion.div>

          <div className="nav__actions">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 3.1 }}
              className="nav__cta-wrap"
            >
              <InteractiveHoverButton
                text="Book Viewing"
                variant="dark"
                size="sm"
                onClick={() => scrollTo("#contact")}
              />
            </motion.div>

            <button
              className={`nav__hamburger ${menuOpen ? "open" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="mobile-menu__panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            >
              <nav className="mobile-menu__nav">
                {menuItems.map((item, i) => (
                  <motion.button
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    onClick={() => scrollTo(item.href)}
                    className="mobile-menu__link"
                  >
                    {item.label}
                  </motion.button>
                ))}
                    <InteractiveHoverButton
                  text="Book Viewing"
                  variant="dark"
                  onClick={() => scrollTo("#contact")}
                  style={{ marginTop: "40px", width: "100%" }}
                />
              </nav>
            </motion.div>
            <div className="mobile-menu__backdrop" onClick={() => setMenuOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          padding: 32px 0;
          transition: all 0.3s ease;
        }
        .nav--scrolled {
          background: rgba(250, 250, 248, 0.85);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          padding: 16px 0;
          box-shadow: 0 1px 0 rgba(0,0,0,0.06);
        }
        .nav__inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 80px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .nav__logo {
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: baseline;
          gap: 8px;
          padding: 4px 0;
        }
        .nav__logo-main {
          font-family: 'Montserrat', sans-serif;
          font-size: 28px;
          font-weight: 400;
          color: #fff;
        }
        .nav--scrolled .nav__logo-main {
          color: var(--text-primary);
        }
        .nav__logo-dot { color: var(--gold); font-size: 26px; }
        .nav__logo-sub {
          font-family: 'Open Sans', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          color: rgba(255,255,255,0.6);
          text-transform: uppercase;
        }
        .nav--scrolled .nav__logo-sub {
          color: var(--text-muted);
        }
        .nav__links {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .nav__link {
          background: none;
          border: none;
          cursor: pointer;
          font-family: 'Open Sans', sans-serif;
          font-size: 15px;
          font-weight: 500;
          color: rgba(255,255,255,0.8);
          padding: 10px 20px;
          transition: color 0.25s;
          position: relative;
        }
        .nav__link::after {
          content: '';
          position: absolute;
          bottom: 6px;
          left: 50%;
          width: 0;
          height: 1.5px;
          background: var(--gold);
          transition: width 0.3s ease, left 0.3s ease;
        }
        .nav__link:hover {
          color: #fff;
        }
        .nav__link:hover::after {
          width: 20px;
          left: calc(50% - 10px);
        }
        .nav--scrolled .nav__link {
          color: var(--text-secondary);
        }
        .nav--scrolled .nav__link:hover {
          color: var(--text-primary);
        }
        .nav__actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .nav__cta {
          height: 48px;
          padding: 0 24px;
          font-size: 12px;
          background: #fff;
          color: var(--text-primary);
        }
        .nav__cta:hover {
          background: var(--gold);
          color: #fff;
        }
        .nav__hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          width: 40px;
          height: 40px;
        }
        .nav__hamburger span {
          display: block;
          width: 24px;
          height: 2px;
          background: #fff;
          border-radius: 2px;
          transition: all 0.3s ease;
        }
        .nav--scrolled .nav__hamburger span {
          background: var(--text-primary);
        }
        .nav__hamburger.open span:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }
        .nav__hamburger.open span:nth-child(2) {
          opacity: 0;
        }
        .nav__hamburger.open span:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }

        .mobile-menu {
          position: fixed;
          inset: 0;
          z-index: 99;
          display: flex;
        }
        .mobile-menu__backdrop {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.5);
        }
        .mobile-menu__panel {
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          width: 340px;
          max-width: 85%;
          background: #FAFAF8;
          padding: 100px 40px 40px;
        }
        .mobile-menu__nav {
          display: flex;
          flex-direction: column;
        }
        .mobile-menu__link {
          background: none;
          border: none;
          cursor: pointer;
          font-family: 'Montserrat', sans-serif;
          font-size: 36px;
          font-weight: 400;
          color: var(--text-primary);
          padding: 14px 0;
          text-align: left;
        }

        @media (max-width: 1024px) {
          .nav__inner { padding: 0 48px; }
        }
        @media (max-width: 900px) {
          .nav__links, .nav__cta, .nav__cta-wrap { display: none; }
          .nav__hamburger { display: flex; }
          .nav__inner { padding: 0 24px; }
        }
      `}</style>
    </>
  )
}
