"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials"

export default function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <section
      id="testimonials"
      ref={ref}
      className="testimonials section-padding"
      style={{ background: "#fff" }}
    >
      <div className="section-wrap" style={{ maxWidth: "1200px" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: "64px" }}
        >
          <p className="t-label" style={{ color: "var(--gold)", marginBottom: "12px" }}>Client Voices</p>
          <h2 className="t-h2">What our clients say.</h2>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <StaggerTestimonials />
      </motion.div>
    </section>
  )
}
