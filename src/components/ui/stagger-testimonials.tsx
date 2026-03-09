"use client"

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const SQRT_5000 = Math.sqrt(5000);

const testimonials = [
  {
    tempId: 0,
    testimonial: "Vaux didn't just help us find a home — they found us the only home that could have been ours. The difference in approach is immediately felt and never forgotten.",
    by: "Catherine & James Whitmore — Miami, FL",
    imgSrc: "https://i.pravatar.cc/150?img=1"
  },
  {
    tempId: 1,
    testimonial: "In thirty years of real estate acquisitions, I have never encountered an advisory that operates with such discretion, depth of market knowledge, and genuine commitment.",
    by: "Robert Ashford — New York, NY",
    imgSrc: "https://i.pravatar.cc/150?img=2"
  },
  {
    tempId: 2,
    testimonial: "The process felt less like a transaction and more like a private curation. Vaux understood what we wanted before we fully understood it ourselves.",
    by: "Isabelle Laurent — Boca Raton, FL",
    imgSrc: "https://i.pravatar.cc/150?img=5"
  },
  {
    tempId: 3,
    testimonial: "Flawless. Every detail, every negotiation, every piece of guidance was precisely what we needed. I would not trust anyone else with a purchase of this magnitude.",
    by: "Marcus & Priya Chen — Los Angeles, CA",
    imgSrc: "https://i.pravatar.cc/150?img=6"
  },
  {
    tempId: 4,
    testimonial: "Vaux redefined what we thought was possible. They presented properties we hadn't imagined and secured terms we didn't expect. Extraordinary professionals.",
    by: "Helena Voss — Aspen, CO",
    imgSrc: "https://i.pravatar.cc/150?img=9"
  },
  {
    tempId: 5,
    testimonial: "Our portfolio acquisition required sensitivity, precision, and a team that moved at the speed of opportunity. Vaux delivered on every count.",
    by: "Jonathan Pierce — Palm Beach, FL",
    imgSrc: "https://i.pravatar.cc/150?img=12"
  },
  {
    tempId: 6,
    testimonial: "We had worked with three other agencies before Vaux. The contrast was immediate and absolute. This is what true white-glove service looks like.",
    by: "Simone & Louis Beaumont — Hamptons, NY",
    imgSrc: "https://i.pravatar.cc/150?img=16"
  },
  {
    tempId: 7,
    testimonial: "They listened to what we didn't say. That is a rare gift in any industry, and in real estate it's everything.",
    by: "Victoria Harrow — San Francisco, CA",
    imgSrc: "https://i.pravatar.cc/150?img=20"
  },
];

interface TestimonialCardProps {
  position: number;
  testimonial: typeof testimonials[0];
  handleMove: (steps: number) => void;
  cardSize: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  position,
  testimonial,
  handleMove,
  cardSize
}) => {
  const isCenter = position === 0;
  const padding = cardSize >= 365 ? '44px 48px 52px' : '32px 36px 44px';
  const bottomOffset = cardSize >= 365 ? 44 : 32;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 transition-all duration-500 ease-in-out"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        padding,
        background: isCenter ? 'var(--gold)' : 'var(--bg-cream)',
        borderColor: isCenter ? 'var(--gold-dark)' : 'rgba(201,169,98,0.2)',
        color: isCenter ? '#1A1A1A' : 'var(--text-primary)',
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter
          ? `0px 8px 0px 4px var(--gold-dark)`
          : '0px 0px 0px 0px transparent',
        zIndex: isCenter ? 10 : 0,
      }}
    >
      <span
        className="absolute block origin-top-right rotate-45"
        style={{
          background: isCenter ? 'rgba(168,139,74,0.6)' : 'rgba(201,169,98,0.25)',
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2
        }}
      />
      <img
        src={testimonial.imgSrc}
        alt={testimonial.by.split('—')[0].trim()}
        className="mb-4 h-14 w-12 object-cover object-top"
        style={{
          boxShadow: `3px 3px 0px ${isCenter ? 'rgba(168,139,74,0.4)' : 'rgba(0,0,0,0.08)'}`
        }}
      />
      <h3
        className="text-base sm:text-lg leading-snug"
        style={{
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic',
          fontWeight: 500,
          color: isCenter ? '#1A1A1A' : 'var(--text-primary)',
        }}
      >
        &ldquo;{testimonial.testimonial}&rdquo;
      </h3>
      <p
        className="absolute text-xs"
        style={{
          bottom: bottomOffset,
          left: cardSize >= 365 ? 48 : 36,
          right: cardSize >= 365 ? 48 : 36,
          fontFamily: 'var(--font-sans)',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: isCenter ? 'rgba(26,26,26,0.6)' : 'var(--text-muted)',
        }}
      >
        — {testimonial.by}
      </p>
    </div>
  );
};

export const StaggerTestimonials: React.FC = () => {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);

  const handleMove = (steps: number) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 365 : 290);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: 620, background: 'transparent' }}
    >
      {testimonialsList.map((testimonial, index) => {
        const position = testimonialsList.length % 2
          ? index - (testimonialsList.length + 1) / 2
          : index - testimonialsList.length / 2;
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        <button
          onClick={() => handleMove(-1)}
          className="flex h-14 w-14 items-center justify-center transition-all duration-300 focus-visible:outline-none"
          style={{
            background: 'var(--bg-primary)',
            border: '2px solid rgba(0,0,0,0.10)',
            color: 'var(--text-secondary)',
          }}
          onMouseEnter={e => {
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.background = 'var(--gold)';
            btn.style.color = '#fff';
            btn.style.borderColor = 'var(--gold)';
          }}
          onMouseLeave={e => {
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.background = 'var(--bg-primary)';
            btn.style.color = 'var(--text-secondary)';
            btn.style.borderColor = 'rgba(0,0,0,0.10)';
          }}
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          onClick={() => handleMove(1)}
          className="flex h-14 w-14 items-center justify-center transition-all duration-300 focus-visible:outline-none"
          style={{
            background: 'var(--bg-primary)',
            border: '2px solid rgba(0,0,0,0.10)',
            color: 'var(--text-secondary)',
          }}
          onMouseEnter={e => {
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.background = 'var(--gold)';
            btn.style.color = '#fff';
            btn.style.borderColor = 'var(--gold)';
          }}
          onMouseLeave={e => {
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.background = 'var(--bg-primary)';
            btn.style.color = 'var(--text-secondary)';
            btn.style.borderColor = 'rgba(0,0,0,0.10)';
          }}
          aria-label="Next testimonial"
        >
          <ChevronRight size={22} />
        </button>
      </div>
    </div>
  );
};
