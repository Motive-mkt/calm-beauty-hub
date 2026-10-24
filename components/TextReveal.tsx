import { Fragment, type CSSProperties } from "react";

/**
 * Word-by-word headline reveal, adapted from the 21st.dev "Text Reveal" component (kuratlielia).
 * Each word rises out of its own clip while sharpening from a soft blur. The entrance runs in CSS,
 * so it starts on first paint, needs no hydration, and never leaves text hidden when scripts are slow.
 * Use "\n" in `text` for a deliberate line break. `lineClass` styles individual lines.
 */
export default function TextReveal({
  text,
  as: Tag = "h2",
  className,
  id,
  delay = 0,
  lineClass = [],
}: {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  id?: string;
  delay?: number;
  lineClass?: string[];
}) {
  const lines = text.split("\n").map((l) => l.split(" ").filter(Boolean));
  const count = lines.reduce((n, w) => n + w.length, 0);
  const step = Math.min(0.09, 0.6 / Math.max(count, 1));
  let index = 0;

  return (
    <Tag
      id={id}
      className={["treveal", className].filter(Boolean).join(" ")}
      style={{ "--reveal-blur": Tag === "p" ? "3px" : "8px" } as CSSProperties}
    >
      <span className="sr-only">{text.replace(/\n/g, " ")}</span>
      {lines.map((words, li) => (
        <Fragment key={li}>
          <span className={["treveal__line", lineClass[li]].filter(Boolean).join(" ")} aria-hidden="true">
            {words.map((word, wi) => {
              const pos = index++;
              return (
                <Fragment key={`${word}-${pos}`}>
                  <span className="treveal__clip">
                    <span
                      className="treveal__word"
                      style={{ "--reveal-delay": `${delay + pos * step + li * step}s` } as CSSProperties}
                    >
                      {word}
                    </span>
                  </span>
                  {wi < words.length - 1 ? " " : null}
                </Fragment>
              );
            })}
          </span>
          {li < lines.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}
