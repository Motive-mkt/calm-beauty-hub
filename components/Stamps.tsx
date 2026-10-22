import type { CSSProperties } from "react";

function Flower() {
  return (
    <svg viewBox="-20 -20 40 40" aria-hidden="true" className="stamp__art">
      {[0, 72, 144, 216, 288].map((r) => (
        <ellipse key={r} cx="0" cy="-8.5" rx="5" ry="9" transform={`rotate(${r})`} />
      ))}
      <circle r="3.2" className="stamp__core" />
    </svg>
  );
}

function Gift() {
  return (
    <svg viewBox="-20 -20 40 40" aria-hidden="true" className="stamp__art stamp__art--gift">
      <rect x="-12" y="-4" width="24" height="16" rx="2.5" />
      <rect x="-14" y="-10" width="28" height="7" rx="2.5" />
      <path d="M0 -10v22" className="stamp__ribbon" />
      <path d="M0 -10c-4-9-12-8-10-3.5 1.4 3 7 3.5 10 3.5zM0 -10c4-9 12-8 10-3.5-1.4 3-7 3.5-10 3.5z" />
    </svg>
  );
}

type Props = {
  filled: number; // 0–5
  animate?: boolean;
  label?: string; // accessible description
};

// Five stamps. The fifth is the reward. Shared by the public loyalty card and the admin dashboard.
export default function Stamps({ filled, animate = false, label }: Props) {
  return (
    <ol
      className={`stamps${animate ? " stamps--animate" : ""}`}
      aria-label={label ?? `${filled} of 5 paid visits`}
    >
      {[0, 1, 2, 3, 4].map((i) => {
        const done = i < filled;
        const reward = i === 4;
        return (
          <li
            key={i}
            className={`stamp${done ? " is-done" : ""}${reward ? " is-reward" : ""}`}
            style={{ "--i": i } as CSSProperties}
          >
            <span className="stamp__disc">{reward ? <Gift /> : <Flower />}</span>
            <span className="stamp__label">{reward ? "Free" : `Visit ${i + 1}`}</span>
          </li>
        );
      })}
    </ol>
  );
}
