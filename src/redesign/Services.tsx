import { services } from "./content";
import { Reveal } from "./Motion";
import { BidBand } from "./Shell";

export function ServicesPage() {
  return (
    <>
      <section className="adva-page-intro adva-container">
        <span className="adva-eyebrow">01 / OUR CAPABILITIES</span>
        <div>
          <h1>
            A lot happens
            <br />
            <span>before the build.</span>
          </h1>
          <p>
            Earthwork, demolition, underground utilities, and environmental
            services. Start with the scope your site needs.
          </p>
        </div>
        <nav className="adva-scope-nav" aria-label="Service sections">
          {services.map((s) => (
            <a href={`#${s.id}`} key={s.id}>
              <span>{s.number}</span>
              {s.short}
            </a>
          ))}
        </nav>
      </section>
      <div className="adva-service-details adva-container">
        {services.map((s) => (
          <section id={s.id} key={s.id} className="adva-service-detail">
            <div className="adva-service-number adva-mono">{s.number} /</div>
            <div className="adva-service-detail-copy">
              <h2>{s.title}</h2>
              <p>{s.description}</p>
              <ul>
                {s.scopes.map((scope) => (
                  <li key={scope}>{scope}</li>
                ))}
              </ul>
              <a
                href={`/redesign/bid?scope=${s.id}`}
                className="adva-text-link"
              >
                Discuss this scope
              </a>
            </div>
            {s.image ? (
              <Reveal>
                <figure>
                  <img
                    src={s.image}
                    alt={s.alt}
                    width="1200"
                    height="900"
                    loading="lazy"
                    decoding="async"
                  />
                  <figcaption>ADVA FIELD PHOTOGRAPHY</figcaption>
                </figure>
              </Reveal>
            ) : (
              <aside className="adva-environmental-note">
                <span className="adva-mono">PROJECT REQUIREMENTS</span>
                <h3>
                  Start with
                  <br />
                  the conditions.
                </h3>
                <p>
                  Share the location, known site conditions, and project
                  requirements so the team can review the scope.
                </p>
              </aside>
            )}
          </section>
        ))}
      </div>
      <BidBand />
    </>
  );
}
