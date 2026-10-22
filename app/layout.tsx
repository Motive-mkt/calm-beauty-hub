import type { Metadata, Viewport } from "next";
import "@fontsource-variable/fraunces";
import "@fontsource-variable/figtree";
import "./globals.css";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Beauty salon in ${site.area}`,
    template: `%s | ${site.name}`,
  },
  description: `Hair, nails, facials and grooming for women and men in ${site.area}. Complete 5 paid visits and enjoy a free bonus service: nail art for women, a facial scrub for men.`,
  openGraph: {
    title: `${site.name} | Beauty salon in ${site.area}`,
    description: "Five paid visits earn a free bonus service. Book on WhatsApp.",
    type: "website",
    locale: "en_KE",
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFBFC",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-KE">
      <body>{children}</body>
    </html>
  );
}
