import StampCard from "@/components/StampCard";
import ServicesMenu from "@/components/ServicesMenu";
import Reviews from "@/components/Reviews";
import { services } from "@/lib/services";
import { mapEmbed, mapLink, site, telLink, whatsappLink } from "@/lib/site";

const PLACEHOLDER_NUMBER = "254700000000";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="icon">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.2 13.9c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-3.9-4.7-4.1-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.3.5-.4.4c-.1.2-.3.3-.1.6.2.3.7 1.2 1.5 1.9 1 .9 1.9 1.2 2.2 1.3.3.1.4.1.6-.1l.8-1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.2z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="icon">
      <path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.6 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.6 3.6a1 1 0 0 1-.25 1z" />
    </svg>
  );
}

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: site.name,
    url: site.url,
    description: site.tagline,
    areaServed: site.area,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.area,
      addressRegion: "Machakos County",
      addressCountry: "KE",
    },
    ...(site.phone !== PLACEHOLDER_NUMBER ? { telephone: `+${site.phone}` } : {}),
  };

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>

      <header className="nav">
        <div className="wrap nav__in">
          <a href="#top" className="brand" aria-label={`${site.name}, home`}>
            <svg viewBox="-20 -20 40 40" aria-hidden="true" className="brand__mark">
              {[0, 72, 144, 216, 288].map((r) => (
                <ellipse key={r} cx="0" cy="-8" rx="4.6" ry="8.4" transform={`rotate(${r})`} />
              ))}
              <circle r="3" className="brand__core" />
            </svg>
            <span>{site.name}</span>
          </a>
          <nav className="nav__links" aria-label="Main">
            <a href="#rewards">Rewards</a>
            <a href="#services">Services</a>
            <a href="#reviews">Reviews</a>
            <a href="#visit">Visit</a>
          </nav>
          <a className="btn btn--rose btn--sm" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
            Book now
          </a>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="wrap hero__in">
            <div className="hero__copy">
              <p className="eyebrow">
                {site.name} · {site.area}
              </p>
              <h1 className="hero__title">
                Five calm visits.
                <br />
                <em>One treat on us.</em>
              </h1>
              <p className="hero__lede">
                Complete 5 paid visits and your 5th comes with a free bonus service: nail art for women, a
                facial scrub for men. Hair, nails, skin and grooming, all in {site.area}.
              </p>
              <div className="hero__cta">
                <a className="btn btn--rose btn--lg" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon /> Book on WhatsApp
                </a>
                <a className="btn btn--ghost btn--lg" href={telLink}>
                  <PhoneIcon /> Call {site.phoneDisplay}
                </a>
              </div>
            </div>
            <div className="hero__card">
              <StampCard />
            </div>
          </div>
        </section>

        <section className="section" id="rewards" aria-labelledby="rewards-h">
          <div className="wrap">
            <p className="eyebrow">The loyalty reward</p>
            <h2 className="h2" id="rewards-h">
              How your free treat works
            </h2>
            <ol className="steps">
              <li className="step">
                <span className="step__n" aria-hidden="true">1</span>
                <h3>Visit us five times</h3>
                <p>Each paid visit is logged by the salon, so your progress is always on record.</p>
              </li>
              <li className="step">
                <span className="step__n" aria-hidden="true">2</span>
                <h3>Scan the QR at checkout</h3>
                <p>
                  Use the QR code in the salon to leave a verified Google review. Adding a photo taken in the
                  salon is optional.
                </p>
              </li>
              <li className="step">
                <span className="step__n" aria-hidden="true">3</span>
                <h3>Enjoy your bonus service</h3>
                <p>Once your five paid visits and your review are confirmed, the free treat is yours.</p>
              </li>
            </ol>

            <div className="rewards">
              <article className="reward">
                <p className="reward__for">For women</p>
                <h3 className="reward__name">Free nail art</h3>
                <p>A hand-painted design added to your visit.</p>
              </article>
              <article className="reward">
                <p className="reward__for">For men</p>
                <h3 className="reward__name">Free facial scrub</h3>
                <p>A deep-cleansing scrub to finish your grooming.</p>
              </article>
            </div>
            <p className="fine">Ask us at any visit how many stamps you have.</p>
          </div>
        </section>

        <section className="section section--tint" id="services" aria-labelledby="services-h">
          <div className="wrap">
            <p className="eyebrow">Services and prices</p>
            <h2 className="h2" id="services-h">
              Choose your treatment
            </h2>
            <ServicesMenu menu={services} />
            <p className="fine">Prices are in Kenya shillings. “From” prices depend on length and style.</p>
          </div>
        </section>

        <section className="section" id="reviews" aria-labelledby="reviews-h">
          <div className="wrap">
            <p className="eyebrow">What clients say</p>
            <h2 className="h2" id="reviews-h">
              Verified Google reviews
            </h2>
            <Reviews />
          </div>
        </section>

        <section className="section section--tint" id="visit" aria-labelledby="visit-h">
          <div className="wrap visit">
            <div className="visit__info">
              <p className="eyebrow">Find us</p>
              <h2 className="h2" id="visit-h">
                Visit us in {site.area}
              </h2>
              <p className="visit__addr">
                {site.name}
                <br />
                {site.area}, {site.region}
              </p>
              {site.landmark ? <p className="visit__landmark">Landmark: {site.landmark}</p> : null}

              <h3 className="visit__sub">Opening hours</h3>
              <dl className="hours">
                {site.hours.map((h) => (
                  <div key={h.days} className="hours__row">
                    <dt>{h.days}</dt>
                    <dd>{h.time}</dd>
                  </div>
                ))}
              </dl>

              <div className="visit__cta">
                <a className="btn btn--rose" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon /> WhatsApp us
                </a>
                <a className="btn btn--ghost" href={telLink}>
                  <PhoneIcon /> {site.phoneDisplay}
                </a>
                <a className="btn btn--soft" href={mapLink} target="_blank" rel="noopener noreferrer">
                  Get directions
                </a>
              </div>
            </div>

            <div className="visit__map">
              <iframe
                title={`Map showing ${site.name} in ${site.area}`}
                src={mapEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap footer__in">
          <p>
            © {new Date().getFullYear()} {site.name}, {site.area}
          </p>
          <p>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">WhatsApp</a>
            {" · "}
            <a href={telLink}>Call</a>
          </p>
        </div>
      </footer>

      <a
        className="fab"
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Book on WhatsApp"
      >
        <WhatsAppIcon />
      </a>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
