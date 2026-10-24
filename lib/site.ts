// Business details. Everything marked PLACEHOLDER must be replaced with real values.

const digits = (v: string | undefined, fallback: string) =>
  (v ?? "").replace(/\D/g, "") || fallback;

const whatsapp = digits(process.env.NEXT_PUBLIC_WHATSAPP, "254700000000"); // PLACEHOLDER
const phone = digits(process.env.NEXT_PUBLIC_PHONE, whatsapp);

export const site = {
  name: "Calm Beauty Hub",
  area: "Syokimau",
  region: "Machakos County, Kenya",
  tagline: "Hair, nails, skin and grooming in Syokimau.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://calm-beauty-hub.vercel.app",
  whatsapp,
  phone,
  phoneDisplay: `0${phone.replace(/^254/, "").replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3")}`,
  landmark: process.env.NEXT_PUBLIC_LANDMARK || "", // shown only when set
  mapQuery: "Calm Beauty Hub Syokimau",
  // PLACEHOLDER hours
  hours: [
    { days: "Monday to Saturday", time: "8:00 am – 8:00 pm" },
    { days: "Sunday", time: "10:00 am – 6:00 pm" },
  ],
  placeId: process.env.GOOGLE_PLACE_ID || "",
};

export function whatsappLink(message = "Hi Calm Beauty Hub, I'd like to book an appointment.") {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const telLink = `tel:+${site.phone}`;

export function reviewLink() {
  return site.placeId
    ? `https://search.google.com/local/writereview?placeid=${site.placeId}`
    : whatsappLink("Hi Calm Beauty Hub, I'd like to leave a review.");
}

export const mapEmbed = `https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&output=embed`;
export const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapQuery)}`;

// Hero motion switch. Say "remove animation on hero section" and this becomes false:
// the hero then renders as a still page (no headline reveal, floating shapes, sparkles or card motion).
export const heroAnimated = true;
