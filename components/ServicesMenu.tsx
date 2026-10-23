"use client";

import { useState } from "react";
import type { ServiceGroup } from "@/lib/services";

type Menu = Record<"women" | "men", ServiceGroup[]>;
const titles = { women: "Women", men: "Men" } as const;

// Desktop shows both menus side by side with equal weight. On phones a switch shows one at a time.
export default function ServicesMenu({ menu }: { menu: Menu }) {
  const [tab, setTab] = useState<"women" | "men">("women");

  return (
    <div className="menus">
      <div className="switch" role="tablist" aria-label="Services for">
        {(["women", "men"] as const).map((k) => (
          <button
            key={k}
            id={`tab-${k}`}
            type="button"
            role="tab"
            className="switch__btn"
            aria-selected={tab === k}
            aria-controls={`panel-${k}`}
            onClick={() => setTab(k)}
          >
            {titles[k]}
          </button>
        ))}
      </div>

      <div className="menus__cols">
        {(["women", "men"] as const).map((k) => (
          <div
            key={k}
            id={`panel-${k}`}
            role="tabpanel"
            aria-labelledby={`tab-${k}`}
            className="menu"
            data-active={tab === k}
          >
            <h3 className="menu__heading">{titles[k]}</h3>
            {menu[k].map((group) => (
              <section key={group.title} className="menu__group">
                <h4 className="menu__title">{group.title}</h4>
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
        ))}
      </div>
    </div>
  );
}
