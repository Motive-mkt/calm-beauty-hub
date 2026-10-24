// Ambient hero motion: drifting colour, twinkling sparkles and two floating reward chips.
// Purely decorative. Rendered only while `heroAnimated` is true (lib/site.ts).
function Sparkle({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={`hfx__spark ${className}`}>
      <path d="M12 0c.6 6.6 4.9 11.4 12 12-7.1.6-11.4 5.4-12 12-.6-6.6-4.9-11.4-12-12C7.1 11.4 11.4 6.6 12 0z" />
    </svg>
  );
}

export function HeroBackdrop() {
  return (
    <div className="hfx" aria-hidden="true">
      <span className="hfx__orb hfx__orb--a" />
      <span className="hfx__orb hfx__orb--b" />
      <Sparkle className="hfx__spark--1" />
      <Sparkle className="hfx__spark--2" />
      <Sparkle className="hfx__spark--3" />
      <Sparkle className="hfx__spark--4" />
    </div>
  );
}

export function HeroChips() {
  return (
    <>
      <span className="hfx__chip hfx__chip--a" aria-hidden="true">
        <i /> Free nail art
      </span>
      <span className="hfx__chip hfx__chip--b" aria-hidden="true">
        <i /> Free facial scrub
      </span>
    </>
  );
}
