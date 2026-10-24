// Slow, looping ticker of treatments. Pure CSS; pauses on hover; static for reduced motion.
export default function Marquee({ items }: { items: string[] }) {
  const row = (hidden: boolean) => (
    <ul className="marquee__row" aria-hidden={hidden || undefined}>
      {items.map((t) => (
        <li key={t}>
          {t}
          <span className="marquee__dot" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee" role="group" aria-label="Treatments we offer">
      <div className="marquee__track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
