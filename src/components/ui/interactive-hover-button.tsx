"use client"

import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = 'dark' | 'gold' | 'outline';
type Size = 'default' | 'sm';

interface InteractiveHoverButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  variant?: Variant;
  size?: Size;
}

const variantConfig: Record<Variant, { wrapper: string; dot: string; textHover: string }> = {
  // Light sections (Navbar, About, Contact) — dark pill, gold expands
  dark: {
    wrapper: 'bg-[#1A1A1A] border-[#1A1A1A] text-white',
    dot: 'bg-[#C9A962]',
    textHover: 'text-[#1A1A1A]',
  },
  // Any section — gold pill, dark expands
  gold: {
    wrapper: 'bg-[#C9A962] border-[#A88B4A] text-[#1A1A1A]',
    dot: 'bg-[#1A1A1A]',
    textHover: 'text-white',
  },
  // Dark sections (Hero, CTA) — transparent pill, white/light expands
  outline: {
    wrapper: 'bg-transparent border-white/40 text-white',
    dot: 'bg-white/15 group-hover:bg-white',
    textHover: 'text-[#1A1A1A]',
  },
};

const sizeConfig: Record<Size, string> = {
  default: 'h-12 px-7 min-w-[180px] text-sm',
  sm: 'h-10 px-5 min-w-[148px] text-xs',
};

const InteractiveHoverButton = React.forwardRef<HTMLButtonElement, InteractiveHoverButtonProps>(
  ({ text = "Button", className, variant = 'dark', size = 'default', ...props }, ref) => {
    const vc = variantConfig[variant];
    const sc = sizeConfig[size];

    return (
      <button
        ref={ref}
        className={cn(
          "group cursor-pointer overflow-hidden rounded-full border font-semibold tracking-wide transition-colors duration-300 focus-visible:outline-none",
          vc.wrapper,
          sc,
          className,
        )}
        {...props}
      >
        {/* Inner wrapper — el containing block real para los absolutos (fix Safari) */}
        <span className="relative flex items-center justify-center w-full h-full pointer-events-none">
          {/* Default text */}
          <span className="relative z-10 translate-x-1 transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
            {text}
          </span>

          {/* Hover text + arrow */}
          <span className={cn(
            "absolute inset-0 z-10 flex translate-x-12 items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-100",
            vc.textHover,
          )}>
            <span>{text}</span>
            <ArrowRight size={15} />
          </span>

          {/* Dot */}
          <span className={cn(
            "absolute bottom-0 right-0 z-0 h-4 w-4 -translate-x-1 translate-y-1 rounded-full transition-all duration-500 group-hover:bottom-[-20%] group-hover:right-[-10%] group-hover:h-[200%] group-hover:w-[200%]",
            vc.dot,
          )} />
        </span>
      </button>
    );
  }
);

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export { InteractiveHoverButton };
