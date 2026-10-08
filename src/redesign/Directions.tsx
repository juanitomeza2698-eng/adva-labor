"use client";
import { useEffect, useState } from "react";
import { Home } from "./Home";
import { services } from "./content";

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
          Both use ADVA’s existing photography and violet brand accent. Concrete
          / Editorial is recommended for its distinction, readable scope
          information, and direct bid workflow.
        </p>
        <div className="adva-directions-table">
          <table>
            <thead>
              <tr>
                <th>Criterion</th>
                <th>A / Carbon · Fieldwork</th>
                <th>B / Concrete · Editorial</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Credibility</th>
                <td>Established industrial presence</td>
                <td>Clear, organized, evidence-led</td>
              </tr>
              <tr>
                <th>Uniqueness</th>
                <td>Familiar full-image construction composition</td>
                <td>Asymmetric layout with strong typographic rhythm</td>
              </tr>
              <tr>
                <th>Usability</th>
                <td>High contrast; dense on smaller screens</td>
                <td>Open spacing; scopes and forms are easier to scan</td>
              </tr>
              <tr>
                <th>Commercial focus</th>
                <td>Immediate visual impact</td>
                <td>Balances fieldwork with a clear bid path</td>
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
        <span>Homepage composition · authentic ADVA source photography</span>
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
              <div key={s.id}>
                <span className="adva-mono">{s.number} /</span>
                <h3>{s.title}</h3>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
