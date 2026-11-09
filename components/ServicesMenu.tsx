import type { ServiceGroup } from "@/lib/services";

// One menu for everyone: groups run in two columns on desktop and stack on phones.
export default function ServicesMenu({ menu }: { menu: ServiceGroup[] }) {
  return (
    <div className="menus">
      <div className="menu menu--wide" data-active="true">
        {menu.map((group) => (
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
    </div>
  );
}
