import type { CSSProperties } from "react";

function Tick() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="stamp__tick">
      <path d="M5.5 12.5l4.2 4.2L18.5 7.8" />
    </svg>
  );
}

type Props = {
  filled: number; // 0–5
  animate?: boolean;
  label?: string; // accessible description
};

// Five stamps: four visits and the reward. Shared by the public loyalty card and the admin dashboard.
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
            <span className="stamp__disc">
              {done ? <Tick /> : reward ? <span className="stamp__free">Free</span> : <span className="stamp__num">{i + 1}</span>}
            </span>
            <span className="stamp__label">{reward ? "Reward" : `Visit ${i + 1}`}</span>
          </li>
        );
      })}
    </ol>
  );
}
