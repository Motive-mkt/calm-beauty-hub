"use client";

import type { ReactNode, PointerEvent } from "react";

// A card with a soft spotlight that follows the pointer (pointer devices only; CSS handles the rest).
export default function GlowCard({ children, className }: { children: ReactNode; className?: string }) {
  function move(e: PointerEvent<HTMLElement>) {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  }
  return (
    <article className={["glow", className].filter(Boolean).join(" ")} onPointerMove={move}>
      {children}
    </article>
  );
}
