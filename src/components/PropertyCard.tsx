"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import type { Property } from "@/lib/properties"

interface Props {
  property: Property
  index: number
}

export default function PropertyCard({ property, index }: Props) {
  const [hovered, setHovered] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [activeImg, setActiveImg] = useState(0)
  const [imgError, setImgError] = useState(false)

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setModalOpen(true)}
        style={{
          cursor: "pointer",
          background: "var(--black-card)",
          border: "1px solid var(--black-border)",
          overflow: "hidden",
          position: "relative",
          transition: "border-color 0.4s ease, box-shadow 0.4s ease",
          borderColor: hovered ? "rgba(200,169,110,0.3)" : "var(--black-border)",
          boxShadow: hovered ? "0 20px 60px rgba(0,0,0,0.6)" : "none",
        }}
      >
        {/* Image */}
        <div style={{ position: "relative", height: "260px", overflow: "hidden" }}>
          {!imgError ? (
            <Image
              src={property.images[0]}
              alt={property.address}
              fill
              style={{
                objectFit: "cover",
                transition: "transform 0.7s ease",
                transform: hovered ? "scale(1.06)" : "scale(1)",
              }}
              onError={() => setImgError(true)}
            />
          ) : (
            <div style={{ width: "100%", height: "100%", background: "var(--black-soft)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "var(--text-muted)", fontSize: "12px", letterSpacing: "0.2em" }}>NO IMAGE</span>
            </div>
          )}

          {/* Overlay on hover */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(9,9,11,0.85) 0%, transparent 60%)",
              display: "flex",
              alignItems: "flex-end",
              padding: "20px",
            }}
          >
            <span style={{
              fontSize: "11px",
              letterSpacing: "0.25em",
              color: "var(--gold)",
              textTransform: "uppercase",
              fontFamily: "'EB Garamond', Georgia, serif",
            }}>
              View Gallery →
            </span>
          </motion.div>

          {/* Neighborhood badge */}
          <div style={{
            position: "absolute",
            top: "16px",
            left: "16px",
            background: "rgba(9,9,11,0.8)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(200,169,110,0.2)",
            padding: "4px 12px",
          }}>
            <span style={{
              fontSize: "9px",
              letterSpacing: "0.3em",
              color: "var(--gold)",
              textTransform: "uppercase",
              fontFamily: "'EB Garamond', Georgia, serif",
            }}>
              {property.neighborhood}
            </span>
          </div>
        </div>

        {/* Info */}
        <div style={{ padding: "24px" }}>
          <div style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "22px",
            fontWeight: 500,
            color: "var(--cream)",
            marginBottom: "6px",
            letterSpacing: "-0.01em",
          }}>
            {property.price}
          </div>

          <div style={{
            fontSize: "13px",
            color: "var(--text-secondary)",
            fontFamily: "'EB Garamond', Georgia, serif",
            marginBottom: "20px",
            lineHeight: 1.4,
          }}>
            {property.address}
          </div>

          {/* Specs */}
          <div style={{
            display: "flex",
            gap: "20px",
            paddingTop: "18px",
            borderTop: "1px solid var(--black-border)",
          }}>
            {[
              { val: property.beds, label: property.beds === 1 ? "Bed" : "Beds" },
              { val: property.baths, label: property.baths === 1 ? "Bath" : "Baths" },
              { val: property.sqft.toLocaleString(), label: "Sq Ft" },
            ].map((spec) => (
              <div key={spec.label}>
                <div style={{
                  fontSize: "16px",
                  fontFamily: "'Playfair Display', Georgia, serif",
                  color: "var(--cream)",
                  fontWeight: 500,
                }}>
                  {spec.val}
                </div>
                <div style={{
                  fontSize: "10px",
                  letterSpacing: "0.15em",
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                  fontFamily: "'EB Garamond', Georgia, serif",
                }}>
                  {spec.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.article>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setModalOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(9,9,11,0.95)",
              backdropFilter: "blur(20px)",
              zIndex: 200,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "var(--black-card)",
                border: "1px solid var(--black-border)",
                maxWidth: "900px",
                width: "100%",
                maxHeight: "90vh",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Main image */}
              <div style={{ position: "relative", height: "420px", flex: "0 0 420px" }}>
                <Image
                  src={property.images[activeImg]}
                  alt={property.address}
                  fill
                  style={{ objectFit: "cover" }}
                />
                {/* Close */}
                <button
                  onClick={() => setModalOpen(false)}
                  style={{
                    position: "absolute",
                    top: "16px",
                    right: "16px",
                    background: "rgba(9,9,11,0.8)",
                    border: "1px solid rgba(200,169,110,0.2)",
                    cursor: "pointer",
                    color: "var(--cream)",
                    width: "36px",
                    height: "36px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "18px",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  ×
                </button>
              </div>

              {/* Thumbnails */}
              <div style={{ display: "flex", gap: "8px", padding: "12px 16px", overflowX: "auto" }}>
                {property.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    style={{
                      flex: "0 0 80px",
                      height: "56px",
                      position: "relative",
                      border: i === activeImg ? "1px solid var(--gold)" : "1px solid var(--black-border)",
                      background: "none",
                      cursor: "pointer",
                      overflow: "hidden",
                      transition: "border-color 0.2s",
                    }}
                  >
                    <Image src={img} alt="" fill style={{ objectFit: "cover" }} />
                  </button>
                ))}
              </div>

              {/* Info */}
              <div style={{ padding: "20px 24px 24px", borderTop: "1px solid var(--black-border)" }}>
                <div style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "28px",
                  color: "var(--gold)",
                  marginBottom: "6px",
                }}>
                  {property.price}
                </div>
                <div style={{ color: "var(--text-secondary)", fontSize: "14px", marginBottom: "16px" }}>
                  {property.address}
                </div>
                <div style={{ display: "flex", gap: "32px" }}>
                  {[
                    { val: property.beds, label: "Bedrooms" },
                    { val: property.baths, label: "Bathrooms" },
                    { val: property.sqft.toLocaleString(), label: "Square Feet" },
                    { val: property.neighborhood, label: "Neighborhood" },
                  ].map((s) => (
                    <div key={s.label}>
                      <div style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "var(--cream)", fontSize: "18px" }}>{s.val}</div>
                      <div style={{ fontSize: "10px", letterSpacing: "0.15em", color: "var(--text-muted)", textTransform: "uppercase" }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
