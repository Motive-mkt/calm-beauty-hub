// Brand mark: two overlapping circles, one ink and one rose. Neutral, geometric, reads as "for everyone".
export default function Mark({ className = "brand__mark" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 28" aria-hidden="true" className={className}>
      <circle cx="14" cy="14" r="12" className="mark__a" />
      <circle cx="26" cy="14" r="12" className="mark__b" />
    </svg>
  );
}
