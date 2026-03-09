"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function PageLoader() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            background: "#1A1A1A",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "56px",
              fontWeight: 400,
              color: "#fff",
              letterSpacing: "-0.02em"
            }}>
              Bugs
            </span>
            <span style={{ 
              color: "#C9A962", 
              fontWeight: 400, 
              fontSize: "56px",
              marginLeft: "12px" 
            }}>
              ·
            </span>
            <span style={{ 
              fontFamily: "'Open Sans', sans-serif", 
              fontSize: "18px", 
              fontWeight: 500, 
              color: "rgba(255,255,255,0.5)",
              marginLeft: "12px",
              letterSpacing: "0.12em" 
            }}>
              PROPERTIES
            </span>
          </motion.div>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 240 }}
            transition={{ duration: 2.2, ease: "easeInOut" }}
            style={{
              height: "2px",
              background: "#C9A962",
              marginTop: "40px",
              borderRadius: "2px",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
