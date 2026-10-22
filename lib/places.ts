import "server-only";

export type GoogleReview = {
  author: string;
  rating: number;
  text: string;
  when: string;
  photoUri?: string;
};

export type PlaceSummary = {
  rating: number;
  total: number;
  reviews: GoogleReview[];
};

// Live Google reviews via the Places API (New). Returns null until
// GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID are set, so the page never shows invented reviews.
export async function getPlaceSummary(): Promise<PlaceSummary | null> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const id = process.env.GOOGLE_PLACE_ID;
  if (!key || !id) return null;

  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${id}`, {
      headers: {
        "X-Goog-Api-Key": key,
        "X-Goog-FieldMask": "rating,userRatingCount,reviews",
      },
      next: { revalidate: 60 * 60 * 6 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    const reviews: GoogleReview[] = (json.reviews ?? [])
      .filter((r: any) => r?.text?.text)
      .map((r: any) => ({
        author: r.authorAttribution?.displayName ?? "Google user",
        rating: r.rating ?? 5,
        text: r.text.text,
        when: r.relativePublishTimeDescription ?? "",
        photoUri: r.authorAttribution?.photoUri,
      }));
    if (!json.rating) return null;
    return { rating: json.rating, total: json.userRatingCount ?? reviews.length, reviews };
  } catch {
    return null;
  }
}
