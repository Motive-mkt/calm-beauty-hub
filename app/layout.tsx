import type { Metadata, Viewport } from "next";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/figtree";
import "./globals.css";
import { site } from "@/lib/site";
import ClickFx from "@/components/ClickFx";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Salon for women and men in ${site.area}`,
    template: `%s | ${site.name}`,
  },
  description: `Hair, nails, facials and grooming for women and men in ${site.area}. Complete 5 paid visits and enjoy a free bonus service: nail art for women, a facial scrub for men.`,
  openGraph: {
    title: `${site.name} | Salon for women and men in ${site.area}`,
    description: "Five visits, one free treat. Book on WhatsApp.",
    type: "website",
    locale: "en_KE",
  },
};

export const viewport: Viewport = {
  themeColor: "#FAF9F8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-KE">
      <head>
        {/* Marks that JS is running so scroll-reveal content is only hidden when it can be revealed again. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        {children}
        <ClickFx />
      </body>
    </html>
  );
}
