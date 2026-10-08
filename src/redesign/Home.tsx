import { services, business } from "./content";
import { Reveal } from "./Motion";
import { BidBand } from "./Shell";

export function Home({ embedded = false }: { embedded?: boolean }) {
  const Title = embedded ? "h2" : "h1";
  return (
    <>
      <section className="adva-home-hero adva-container">
        <div className="adva-hero-index">
          <span className="adva-eyebrow">
            01 / HEAVY CIVIL & SITE DEVELOPMENT
          </span>
          <span className="adva-mono">AURORA, COLORADO</span>
        </div>
        <div className="adva-hero-grid">
          <div className="adva-hero-copy">
            <span className="adva-small-rule" />
            <Title>
              Groundwork.
              <br />
              For what’s
              <br />
              <span>next.</span>
            </Title>
            <p>
              Earthwork. Utilities. Site development.
              <br />
              The work that comes before everything else.
            </p>
            <div className="adva-hero-actions">
              <a href="/redesign/bid" className="adva-button adva-button-brand">
                Request a bid
              </a>
              <a href="/redesign/services" className="adva-text-link">
                Explore our services
              </a>
            </div>
            <div className="adva-hero-footnote">
              <span className="adva-survey-mark" aria-hidden="true">
                +
              </span>
              <span className="adva-mono">
                COLORADO OPERATIONS
                <br />
                FROM THE GROUND UP.
              </span>
            </div>
          </div>
          <figure className="adva-hero-image">
            <picture>
              <source
                media="(max-width: 600px)"
                srcSet="/redesign/hero-mobile.webp"
              />
              <img
                src="/redesign/hero.webp"
                alt="Two excavators on a construction site, from ADVA Labor’s existing photo archive."
                width="1600"
                height="900"
                loading="eager"
                decoding="async"
              />
            </picture>
            <div className="adva-image-label">
              <span className="adva-mono">FIELD NOTES / 01</span>
              <span>Site preparation</span>
            </div>
            <figcaption>
              <span>ADVA LABOR / IN THE FIELD</span>
              <span>EXCAVATION & SITEWORK</span>
            </figcaption>
          </figure>
        </div>
        <div className="adva-hero-scope-line">
          <span className="adva-eyebrow">THE SCOPE</span>
          <span>Earthwork</span>
          <span>Demolition & hauling</span>
          <span>Underground utilities</span>
          <span>Environmental services</span>
        </div>
      </section>
      <section className="adva-services-summary" id="services">
        <div className="adva-services-intro">
          <span className="adva-eyebrow">02 / CAPABILITIES</span>
          <h2>
            Four scopes.
            <br />
            One conversation.
          </h2>
          <p>
            Define the work. Align the schedule.
            <br />
            Start with the right scope.
          </p>
          <a className="adva-text-link" href="/redesign/services">
            View all services
          </a>
        </div>
        <div className="adva-service-list">
          {services.map((service) => (
            <a key={service.id} href={`/redesign/services#${service.id}`}>
              <span className="adva-mono">{service.number}</span>
              <div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
              <span className="adva-service-plus" aria-hidden="true">
                +
              </span>
            </a>
          ))}
        </div>
      </section>
      <section className="adva-work-summary adva-container">
        <div className="adva-section-heading">
          <div>
            <span className="adva-eyebrow">03 / IN THE FIELD</span>
            <h2>
              The work.
              <br />
              At ground level.
            </h2>
          </div>
          <a href="/redesign/projects" className="adva-text-link">
            Explore fieldwork
          </a>
        </div>
        <div className="adva-work-pair">
          <Reveal>
            <figure>
              <a href="/redesign/projects">
                <img
                  src="/redesign/excavation.webp"
                  width="1200"
                  height="900"
                  loading="lazy"
                  decoding="async"
                  alt={services[0].alt}
                />
              </a>
              <figcaption>
                <span>01 / EARTHWORK</span>
                <span>Excavation & site preparation</span>
              </figcaption>
            </figure>
          </Reveal>
          <Reveal className="adva-work-secondary">
            <figure>
              <a href="/redesign/projects">
                <img
                  src="/redesign/utilities.webp"
                  width="900"
                  height="1200"
                  loading="lazy"
                  decoding="async"
                  alt={services[2].alt}
                />
              </a>
              <figcaption>
                <span>02 / UNDERGROUND</span>
                <span>Infrastructure below grade</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>
      <section className="adva-company adva-container" id="company">
        <div>
          <span className="adva-eyebrow">04 / ADVA LABOR</span>
          <h2>
            Grounded
            <br />
            in Colorado.
          </h2>
        </div>
        <div className="adva-company-copy">
          <p className="adva-large-copy">
            From site preparation to underground infrastructure, ADVA Labor
            works at the foundation of a project.
          </p>
          <p>
            Based in Aurora, our team provides earthwork, demolition and
            hauling, underground utilities, and environmental services across
            Colorado.
          </p>
          <div className="adva-contact-people">
            {business.contacts.map((contact) => (
              <div key={contact.name}>
                <span>{contact.name}</span>
                <a href={contact.href}>{contact.phone}</a>
              </div>
            ))}
          </div>
        </div>
      </section>
      <BidBand />
    </>
  );
}
