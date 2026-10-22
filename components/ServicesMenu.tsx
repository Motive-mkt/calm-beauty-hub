"use client";

import { useState } from "react";
import type { ServiceGroup } from "@/lib/services";

type Menu = Record<"women" | "men", ServiceGroup[]>;

export default function ServicesMenu({ menu }: { menu: Menu }) {
  const [tab, setTab] = useState<"women" | "men">("women");

  return (
    <div>
      <div className="toggle toggle--lg" role="tablist" aria-label="Services for">
        {(["women", "men"] as const).map((k) => (
          <button
            key={k}
            id={`tab-${k}`}
            type="button"
            role="tab"
            className="toggle__btn"
            aria-selected={tab === k}
            aria-controls={`panel-${k}`}
            onClick={() => setTab(k)}
          >
            {k === "women" ? "Women" : "Men"}
          </button>
        ))}
      </div>

      <div
        id={`panel-${tab}`}
        role="tabpanel"
        aria-labelledby={`tab-${tab}`}
        className="menu"
        key={tab}
      >
        {menu[tab].map((group) => (
          <section key={group.title} className="menu__group">
            <h3 className="menu__title">{group.title}</h3>
            <ul className="menu__list">
              {group.items.map((item) => (
                <li key={item.name} className="menu__item">
                  <span className="menu__name">
                    {item.name}
                    {item.note ? <small>{item.note}</small> : null}
                  </span>
                  <span className="menu__dots" aria-hidden="true" />
                  <span className="menu__price">
                    <span className="menu__cur">KES</span> {item.price}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
