"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

/**
 * Scroll reveal, adapted from the 21st.dev "Reveal" component (asanshay): content fades up and
 * un-blurs once as it enters the viewport, with an optional stagger via `index`.
 * Implemented with IntersectionObserver + CSS so no animation library ships to the browser.
 * Content stays visible without JavaScript and for visitors who prefer reduced motion.
 */
export default function Reveal({
  children,
  className,
  index = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  index?: number;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={["reveal", className].filter(Boolean).join(" ")}
      style={{ "--rv-delay": `${index * 0.12}s` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
