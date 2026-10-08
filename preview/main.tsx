import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Shell } from "../src/redesign/Shell";
import { Home } from "../src/redesign/Home";
import { ServicesPage } from "../src/redesign/Services";
import { ProjectsPage } from "../src/redesign/Projects";
import { BidPage } from "../src/redesign/Bid";
import { DirectionsPage } from "../src/redesign/Directions";
import "../src/redesign/styles.css";
import "./review.css";

const offline =
  document.documentElement.dataset.transport === "local" ||
  location.protocol === "file:";
const currentPath = () =>
  offline
    ? location.hash.slice(1) || "/redesign"
    : location.pathname + location.search + location.hash;

function Review() {
  const [width, setWidth] = useState(1440);
  const [route, setRoute] = useState("/redesign");
  const [available, setAvailable] = useState(window.innerWidth - 40);
  useEffect(() => {
    const update = () => setAvailable(window.innerWidth - 40);
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  const scale = Math.min(1, available / width);
  return (
    <div className="review-shell">
      <header>
        <div>
          <strong>ADVA LABOR</strong>
          <span>Design review / October 2026</span>
        </div>
        <a href="/redesign">Open full design</a>
      </header>
      <nav aria-label="Review controls">
        <label htmlFor="review-page">Page</label>
        <select
          id="review-page"
          value={route}
          onChange={(e) => setRoute(e.target.value)}
        >
          <option value="/redesign">Homepage</option>
          <option value="/redesign/services">Services</option>
          <option value="/redesign/projects">Projects</option>
          <option value="/redesign/bid">Bid workflow</option>
          <option value="/redesign/directions">Two design directions</option>
          <option value="/redesign/directions?view=carbon">
            Direction A / Carbon
          </option>
          <option value="https://advalabor.com/">Current public website</option>
        </select>
        <div
          className="review-widths"
          role="group"
          aria-label="Responsive viewport"
        >
          {[320, 390, 768, 1024, 1440].map((w) => (
            <button
              key={w}
              aria-pressed={width === w}
              onClick={() => setWidth(w)}
            >
              {w === 390 ? "Mobile · 390" : w === 1440 ? "Desktop · 1440" : w}
            </button>
          ))}
        </div>
        <output aria-live="polite">{width}px viewport</output>
      </nav>
      <div
        className="review-frame-box"
        style={{ width: width * scale, height: 850 * scale }}
      >
        <iframe
          key={route}
          title="ADVA responsive design preview"
          src={route}
          style={{
            width,
            height: 850,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        />
      </div>
      <p className="review-note">
        A responsive viewport preview. Bid validation is connected to a preview
        endpoint; inquiries are never sent.
      </p>
    </div>
  );
}

function App() {
  const [path, setPath] = useState(currentPath);
  useEffect(() => {
    const navigation = () => setPath(currentPath());
    const click = (event: MouseEvent) => {
      const link = (event.target as Element).closest("a");
      const href = link?.getAttribute("href");
      if (offline && href?.startsWith("#")) {
        event.preventDefault();
        const target = document.getElementById(href.slice(1));
        target?.scrollIntoView();
        target?.focus();
        return;
      }
      if (
        !href?.startsWith("/redesign") ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey ||
        event.button !== 0
      )
        return;
      event.preventDefault();
      if (offline) location.hash = href;
      else {
        history.pushState(null, "", href);
        setPath(href);
      }
    };
    window.addEventListener("popstate", navigation);
    window.addEventListener("hashchange", navigation);
    document.addEventListener("click", click);
    return () => {
      window.removeEventListener("popstate", navigation);
      window.removeEventListener("hashchange", navigation);
      document.removeEventListener("click", click);
    };
  }, []);
  useEffect(() => {
    const hash = path.includes("#") ? path.split("#")[1] : "";
    if (hash)
      requestAnimationFrame(() =>
        document.getElementById(hash)?.scrollIntoView(),
      );
    else window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    if (offline) {
      const search = path.split("?")[1]?.split("#")[0] || "";
      document.documentElement.dataset.reviewSearch = search;
    }
  }, [path]);
  if (!offline && (path === "/" || path === "/review")) return <Review />;
  const route = path.split(/[?#]/)[0];
  const content =
    route === "/redesign/services" ? (
      <ServicesPage />
    ) : route === "/redesign/projects" ? (
      <ProjectsPage />
    ) : route === "/redesign/bid" ? (
      <BidPage local={offline} />
    ) : route === "/redesign/directions" ? (
      <DirectionsPage />
    ) : (
      <Home />
    );
  return (
    <Shell
      key={route}
      active={
        route.includes("services")
          ? "Services"
          : route.includes("projects")
            ? "Projects"
            : undefined
      }
    >
      {content}
    </Shell>
  );
}
createRoot(document.getElementById("root")!).render(<App />);
