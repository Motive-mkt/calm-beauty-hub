"use client";

import { useState } from "react";
import Stamps from "./Stamps";

const rewards = {
  women: { label: "For women", reward: "Free nail art" },
  men: { label: "For men", reward: "Free facial scrub" },
} as const;

export default function StampCard() {
  const [who, setWho] = useState<keyof typeof rewards>("women");
  const current = rewards[who];

  return (
    <div className="card" role="group" aria-label="Calm Beauty Hub loyalty card">
      <div className="card__head">
        <span className="card__brand">Calm Beauty Hub</span>
        <span className="card__kind">Loyalty card</span>
      </div>

      <Stamps filled={4} animate label="Four paid visits stamped, the fifth visit earns your reward" />

      <div className="card__reward" aria-live="polite">
        <span className="card__reward-kicker">Your 5th visit</span>
        <strong key={who} className="card__reward-name">
          {current.reward}
        </strong>
      </div>

      <div className="toggle" role="group" aria-label="Choose the reward you want to see">
        {(Object.keys(rewards) as (keyof typeof rewards)[]).map((k) => (
          <button
            key={k}
            type="button"
            className="toggle__btn"
            aria-pressed={who === k}
            onClick={() => setWho(k)}
          >
            {rewards[k].label}
          </button>
        ))}
      </div>
    </div>
  );
}
