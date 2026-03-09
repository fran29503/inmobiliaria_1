"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"

const FEATURES = [
  {
    title: "Unparalleled Craftsmanship",
    desc: "Every detail meticulously designed and executed to ensure exceptional quality from the finest materials.",
    img: "https://framerusercontent.com/images/VktFJRVX7e3xJlZOn7TGB1VyZc.png",
  },
  {
    title: "Personalized Design",
    desc: "Tailored to your vision, each property matched to your lifestyle and aspirations.",
    img: "https://framerusercontent.com/images/DNcVILKsnLDcnbBsI8SGBaf1Y.png",
  },
  {
    title: "Exclusive Locations",
    desc: "Miami, Boca Raton, Los Angeles, and New York — the world's most coveted addresses.",
    img: "https://framerusercontent.com/images/Gb86RUzvjn332CpFSi2Mb29od5A.png",
  },
  {
    title: "Modern Innovation",
    desc: "Smart technology and sustainable features designed for timeless appeal and modern living.",
    img: "https://framerusercontent.com/images/Relv9TUZcfMNxObdnUji3ELdx8.png",
  },
  {
    title: "Seamless Experience",
    desc: "From first conversation to final handover, a smooth, transparent, and refined process.",
    img: "https://framerusercontent.com/images/0jbeEaOIsuzxiguylP5b4P9xCiw.png",
  },
]

export default function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <section className="features section-padding" style={{ background: "#FAFAF8" }}>
      <div className="section-wrap">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="features__header"
        >
          <p className="t-label" style={{ color: "var(--gold)", marginBottom: "12px" }}>Why Bugs</p>
          <h2 className="t-h2" style={{ maxWidth: "600px" }}>
            The art of exceptional living begins in the details.
          </h2>
          <p className="t-body-lg" style={{ maxWidth: "480px", marginTop: "16px" }}>
            Discover the details that make every Bugs Properties home a masterpiece.
          </p>
        </motion.div>

        <div className="features__grid">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              className="feature-card"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i + 0.2 }}
              whileHover={{ y: -8 }}
            >
              <div className="feature-card__img">
                <Image
                  src={f.img}
                  alt={f.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 280px"
                  style={{ objectFit: "cover" }}
                />
                <div className="feature-card__img-overlay" />
              </div>
              <div className="feature-card__body">
                <h3 className="feature-card__title">{f.title}</h3>
                <p className="feature-card__desc">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .features__header {
          margin-bottom: 64px;
        }
        .features__grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 20px;
        }
        .feature-card {
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(0,0,0,0.06);
          transition: box-shadow 0.3s ease;
        }
        .feature-card:hover {
          box-shadow: 0 12px 40px rgba(0,0,0,0.10);
        }
        .feature-card__img {
          position: relative;
          height: 220px;
          overflow: hidden;
          background: #e8e4df;
        }
        .feature-card__img img {
          transition: transform 0.5s ease;
        }
        .feature-card:hover .feature-card__img img {
          transform: scale(1.06);
        }
        .feature-card__img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 50%, rgba(26,26,26,0.15));
        }
        .feature-card__body {
          padding: 24px 22px 28px;
        }
        .feature-card__title {
          font-family: 'Montserrat', sans-serif;
          font-size: 18px;
          font-weight: 400;
          color: var(--text-primary);
          margin-bottom: 10px;
          line-height: 1.3;
        }
        .feature-card__desc {
          font-size: 13px;
          color: var(--text-muted);
          line-height: 1.7;
        }

        @media (max-width: 1200px) {
          .features__grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 768px) {
          .features__grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 500px) {
          .features__grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}
