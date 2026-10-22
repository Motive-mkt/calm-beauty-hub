import { getPlaceSummary } from "@/lib/places";
import { reviewLink, site } from "@/lib/site";

function Stars({ value }: { value: number }) {
  return (
    <span className="stars" role="img" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg key={n} viewBox="0 0 20 20" className={n <= Math.round(value) ? "on" : ""} aria-hidden="true">
          <path d="M10 1.8l2.5 5.3 5.8.7-4.3 4 1.1 5.7L10 14.7l-5.1 2.8L6 11.8l-4.3-4 5.8-.7z" />
        </svg>
      ))}
    </span>
  );
}

export default async function Reviews() {
  const summary = await getPlaceSummary();

  if (!summary) {
    return (
      <div className="reviews-empty">
        <p className="reviews-empty__title">Our verified reviews will show here.</p>
        <p className="reviews-empty__body">
          Every review comes from a real visit, left through the QR code at our checkout.
          Be one of the first to share yours.
        </p>
        <a className="btn btn--soft" href={reviewLink()} target="_blank" rel="noopener noreferrer">
          Leave a Google review
        </a>
      </div>
    );
  }

  return (
    <div>
      <div className="reviews-summary">
        <span className="reviews-summary__score">{summary.rating.toFixed(1)}</span>
        <div>
          <Stars value={summary.rating} />
          <p className="reviews-summary__count">
            {summary.total} Google review{summary.total === 1 ? "" : "s"} for {site.name}
          </p>
        </div>
        <a className="btn btn--soft" href={reviewLink()} target="_blank" rel="noopener noreferrer">
          Write a review
        </a>
      </div>

      <ul className="reviews">
        {summary.reviews.map((r, i) => (
          <li key={i} className="review">
            <Stars value={r.rating} />
            <p className="review__text">{r.text}</p>
            <p className="review__by">
              <strong>{r.author}</strong>
              {r.when ? <span> · {r.when}</span> : null}
            </p>
          </li>
        ))}
      </ul>
      <p className="reviews-credit">Reviews and ratings from Google.</p>
    </div>
  );
}
