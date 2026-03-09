"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"

const FEATURED = {
  tag: "Must Read",
  category: "Lifestyle",
  title: "The Rise of Boutique Architecture in Luxury Living",
  excerpt:
    "Boutique architecture is redefining what it means to own a luxury home. Discover why discerning buyers are turning away from mass-produced developments in favor of bespoke, character-driven residences.",
  author: "Emily Chambers",
  role: "Architecture Consultant",
  img: "https://framerusercontent.com/images/a80zLHISSBdWuz3UJ2Q3cj65rE.png",
  avatar: "https://framerusercontent.com/images/jc3UmV68klfMC3iPGBTEz05dVQ.png",
}

const POSTS = [
  {
    category: "Innovation",
    title: "The Future of Luxury: AI and Smart Home Automation",
    img: "https://framerusercontent.com/images/EdgPWd8v7Btv09CwBPd5kfEyzsI.png",
  },
  {
    category: "Sustainability",
    title: "Are Sustainable Materials the Future of High-End Real Estate?",
    img: "https://framerusercontent.com/images/hUgQw24tAoZIHJPo1yxj8ajHOs.png",
  },
  {
    category: "Design",
    title: "Exploring Minimalism with a Touch of Luxury",
    img: "https://framerusercontent.com/images/3PcC76zAX9yjzRINqLAtbsyS2Y.png",
  },
]

const CATEGORY_COLORS: Record<string, string> = {
  Lifestyle: "#F0EBE0",
  Innovation: "#E8EDF5",
  Sustainability: "#E5F0E8",
  Design: "#F5E8F0",
}

export default function Blog() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section className="blog section-padding" style={{ background: "#F5F3EF" }}>
      <div className="section-wrap">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="blog__header"
        >
          <div>
            <p className="t-label" style={{ color: "var(--gold)", marginBottom: "12px" }}>
              Insights & Trends
            </p>
            <h2 className="t-h2">Discover insights, trends, and inspiration.</h2>
          </div>
          <a href="#" className="blog__view-all">
            View all articles →
          </a>
        </motion.div>

        {/* Grid */}
        <div className="blog__grid">
          {/* Featured post */}
          <motion.article
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="blog__featured"
          >
            <div className="blog__featured-img">
              <Image
                src={FEATURED.img}
                alt={FEATURED.title}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 60vw"
              />
              <div className="blog__featured-overlay" />
              <div className="blog__featured-tags">
                <span className="blog__tag blog__tag--must">{FEATURED.tag}</span>
                <span
                  className="blog__tag"
                  style={{ background: CATEGORY_COLORS[FEATURED.category] }}
                >
                  {FEATURED.category}
                </span>
              </div>
            </div>

            <div className="blog__featured-body">
              <h3 className="blog__featured-title">{FEATURED.title}</h3>
              <p className="blog__featured-excerpt">{FEATURED.excerpt}</p>
              <div className="blog__author">
                <div className="blog__avatar">
                  <Image
                    src={FEATURED.avatar}
                    alt={FEATURED.author}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div>
                  <div className="blog__author-name">{FEATURED.author}</div>
                  <div className="blog__author-role">{FEATURED.role}</div>
                </div>
              </div>
            </div>
          </motion.article>

          {/* Secondary posts */}
          <div className="blog__secondary">
            {POSTS.map((p, i) => (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                className="blog__post"
              >
                <div className="blog__post-img">
                  <Image
                    src={p.img}
                    alt={p.title}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, 200px"
                  />
                </div>
                <div className="blog__post-body">
                  <span
                    className="blog__tag"
                    style={{ background: CATEGORY_COLORS[p.category] ?? "#F0EBE0" }}
                  >
                    {p.category}
                  </span>
                  <h4 className="blog__post-title">{p.title}</h4>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .blog__header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 56px;
          gap: 24px;
          flex-wrap: wrap;
        }
        .blog__view-all {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-secondary);
          text-decoration: none;
          white-space: nowrap;
          transition: color 0.25s;
        }
        .blog__view-all:hover { color: var(--gold); }

        .blog__grid {
          display: grid;
          grid-template-columns: 1.6fr 1fr;
          gap: 24px;
          align-items: start;
        }

        /* Featured */
        .blog__featured {
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          transition: box-shadow 0.35s ease, transform 0.35s ease;
        }
        .blog__featured:hover {
          box-shadow: 0 12px 40px rgba(0,0,0,0.10);
          transform: translateY(-4px);
        }
        .blog__featured-img {
          position: relative;
          height: 340px;
          overflow: hidden;
          background: #e0dbd4;
        }
        .blog__featured-img img { transition: transform 0.5s ease; }
        .blog__featured:hover .blog__featured-img img { transform: scale(1.04); }
        .blog__featured-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.25));
        }
        .blog__featured-tags {
          position: absolute;
          bottom: 20px;
          left: 20px;
          display: flex;
          gap: 8px;
          z-index: 2;
        }
        .blog__tag {
          display: inline-block;
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: var(--text-secondary);
        }
        .blog__tag--must {
          background: var(--gold);
          color: #fff;
        }
        .blog__featured-body {
          padding: 28px 28px 32px;
        }
        .blog__featured-title {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(20px, 2vw, 26px);
          font-weight: 400;
          color: var(--text-primary);
          line-height: 1.35;
          margin-bottom: 14px;
        }
        .blog__featured-excerpt {
          font-size: 14px;
          color: var(--text-muted);
          line-height: 1.75;
          margin-bottom: 24px;
        }
        .blog__author {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .blog__avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
          position: relative;
          flex-shrink: 0;
          background: var(--gold-bg);
        }
        .blog__author-name {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary);
        }
        .blog__author-role {
          font-size: 12px;
          color: var(--text-muted);
          margin-top: 2px;
        }

        /* Secondary posts */
        .blog__secondary {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .blog__post {
          display: flex;
          gap: 16px;
          background: #fff;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }
        .blog__post:hover {
          box-shadow: 0 8px 28px rgba(0,0,0,0.08);
          transform: translateY(-2px);
        }
        .blog__post-img {
          position: relative;
          width: 110px;
          flex-shrink: 0;
          background: #e0dbd4;
          overflow: hidden;
        }
        .blog__post-img img { transition: transform 0.5s ease; }
        .blog__post:hover .blog__post-img img { transform: scale(1.06); }
        .blog__post-body {
          padding: 18px 18px 18px 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
          justify-content: center;
        }
        .blog__post-title {
          font-family: 'Montserrat', sans-serif;
          font-size: 15px;
          font-weight: 400;
          color: var(--text-primary);
          line-height: 1.45;
        }

        @media (max-width: 1024px) {
          .blog__grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 768px) {
          .blog__grid { grid-template-columns: 1fr; }
          .blog__featured-img { height: 260px; }
          .blog__post-img { width: 90px; }
        }
      `}</style>
    </section>
  )
}
