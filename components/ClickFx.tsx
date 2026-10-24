"use client";

import { useEffect } from "react";

// Click feedback: a ripple on buttons, and a small burst of pink dots (plus a stamp replay) on
// loyalty and reward cards. Skipped for reduced motion and inside a hero with animation switched off.
export default function ClickFx() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const colours = ["#ff8fb8", "#c42d66", "#f8d3e1", "#19171c"];

    function onDown(e: PointerEvent) {
      if (reduce.matches || !(e.target instanceof Element)) return;
      if (e.target.closest('[data-anim="off"]')) return;

      const btn = e.target.closest<HTMLElement>(".btn, .switch__btn");
      if (btn && !(btn as HTMLButtonElement).disabled && btn.getAttribute("aria-disabled") !== "true") {
        const r = btn.getBoundingClientRect();
        const size = Math.max(r.width, r.height) * 2;
        const dot = document.createElement("span");
        dot.className = "ripple";
        dot.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - r.left - size / 2}px;top:${e.clientY - r.top - size / 2}px`;
        btn.appendChild(dot);
        dot.addEventListener("animationend", () => dot.remove(), { once: true });
        window.setTimeout(() => dot.remove(), 900);
      }

      const card = e.target.closest<HTMLElement>("[data-burst]");
      if (card && !e.target.closest("a, button")) {
        for (let i = 0; i < 14; i++) {
          const p = document.createElement("span");
          p.className = "burst";
          p.style.cssText = `left:${e.clientX}px;top:${e.clientY}px;background:${colours[i % colours.length]}`;
          document.body.appendChild(p);
          const a = (Math.PI * 2 * i) / 14 + Math.random() * 0.4;
          const d = 38 + Math.random() * 46;
          p.animate(
            [
              { transform: "translate(-50%,-50%) scale(1)", opacity: 1 },
              { transform: `translate(calc(-50% + ${Math.cos(a) * d}px), calc(-50% + ${Math.sin(a) * d}px)) scale(0.2)`, opacity: 0 },
            ],
            { duration: 650 + Math.random() * 250, easing: "cubic-bezier(0.2,0.8,0.2,1)" },
          ).onfinish = () => p.remove();
        }
        const stamps = card.querySelector<HTMLElement>(".stamps--animate");
        if (stamps) {
          stamps.classList.remove("stamps--animate");
          void stamps.offsetWidth;
          stamps.classList.add("stamps--animate");
        }
      }
    }

    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, []);

  return null;
}
