"use client";
import { useEffect, useState } from "react";
import { Home } from "./Home";
import { services, business } from "./content";

export function DirectionsPage() {
  const [direction, setDirection] = useState("concrete");
  useEffect(() => {
    const local =
      document.documentElement.dataset.transport === "local" ||
      location.protocol === "file:";
    const search = local
      ? location.hash.split("?")[1]?.split("#")[0] || ""
      : location.search;
    if (new URLSearchParams(search).get("view") === "carbon")
      setDirection("carbon");
  }, []);
  return (
    <>
      <section className="adva-directions-intro adva-container">
        <span className="adva-eyebrow">ADVA LABOR / DESIGN REVIEW</span>
        <h1>
          Two directions.
          <br />
          One industrial identity.
        </h1>
        <p>
          Two compositions built around ADVA’s field photography and existing
          violet accent. Concrete / Editorial is recommended for estimators
          who need to review capabilities and define a bid scope.
        </p>
        <div className="adva-directions-table" role="region" aria-label="Design comparison" tabIndex={0}>
          <table>
            <thead>
              <tr>
                <th scope="col">Criterion</th>
                <th scope="col">A / Carbon · Fieldwork</th>
                <th scope="col">B / Concrete · Editorial</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Credibility</th>
                <td>Field photography carries the industrial presence</td>
                <td>Clear scopes and organized project information</td>
              </tr>
              <tr>
                <th scope="row">Uniqueness</th>
                <td>Cinematic scale with restrained technical markings</td>
                <td>Asymmetric layout with strong typographic rhythm</td>
              </tr>
              <tr>
                <th scope="row">Usability</th>
                <td>Image-first introduction; high contrast controls</td>
                <td>Scope-first reading; open spacing and clear hierarchy</td>
              </tr>
              <tr>
                <th scope="row">Commercial focus</th>
                <td>Immediate field presence and a prominent bid action</td>
                <td>Capabilities, field records, and a qualified bid path</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          className="adva-direction-switch"
          role="group"
          aria-label="Choose homepage direction"
        >
          <button
            aria-pressed={direction === "carbon"}
            onClick={() => setDirection("carbon")}
          >
            A / Carbon · Fieldwork
          </button>
          <button
            aria-pressed={direction === "concrete"}
            onClick={() => setDirection("concrete")}
          >
            B / Concrete · Editorial — recommended
          </button>
        </div>
      </section>
      <div className="adva-direction-caption">
        <strong>
          {direction === "carbon"
            ? "A / CARBON · FIELDWORK"
            : "B / CONCRETE · EDITORIAL"}
        </strong>
        <span>Homepage composition · ADVA’s existing field photography</span>
      </div>
      {direction === "concrete" ? (
        <Home embedded />
      ) : (
        <section className="adva-carbon">
          <div className="adva-carbon-hero">
            <img
              src="/redesign/hero.webp"
              alt="Two excavators on a site, from ADVA’s existing materials."
              width="1600"
              height="900"
            />
            <span className="adva-carbon-index adva-mono" aria-hidden="true">ADVA / FIELD RECORD 01</span>
            <div className="adva-carbon-copy">
              <span className="adva-eyebrow">
                COLORADO / HEAVY CIVIL & SITE DEVELOPMENT
              </span>
              <h2>
                BEFORE
                <br />
                THE BUILD.
                <br />
                <span>THERE’S ADVA.</span>
              </h2>
              <p>
                Earthwork, demolition, underground utilities, and environmental
                services across Colorado.
              </p>
              <div className="adva-hero-actions">
                <a
                  href="/redesign/bid"
                  className="adva-button adva-button-brand"
                >
                  Request a bid
                </a>
                <a href="/redesign/services" className="adva-text-link">
                  Explore the scope
                </a>
              </div>
            </div>
          </div>
          <div className="adva-carbon-capabilities">
            {services.map((s) => (
              <a key={s.id} href={`/redesign/services#${s.id}`}>
                <span className="adva-mono">{s.number} /</span>
                <h3>{s.title}</h3>
              </a>
            ))}
          </div>
          <section className="adva-carbon-story adva-container">
            <div>
              <span className="adva-eyebrow">FIELDWORK / COLORADO</span>
              <h2>From the surface.<br />To what’s below.</h2>
              <p>Excavation, grading, and underground utilities. Explore the work in the field, then tell us what your site needs.</p>
              <a href="/redesign/projects" className="adva-text-link">Explore fieldwork</a>
            </div>
            <figure>
              <img src="/redesign/utilities.webp" width="900" height="1200" loading="lazy" decoding="async" alt={services[2].alt} />
              <figcaption>UNDERGROUND UTILITIES / ADVA LABOR</figcaption>
            </figure>
          </section>
          <section className="adva-carbon-contact adva-container">
            <div><span className="adva-eyebrow">NEXT PROJECT</span><h2>Let’s define<br />the scope.</h2></div>
            <div><p>Share the project location, scope, and bid deadline.</p><a href="/redesign/bid" className="adva-button adva-button-brand">Request a bid</a><a href={business.officeHref} className="adva-text-link">{business.office}</a></div>
          </section>
        </section>
      )}
    </>
  );
}
