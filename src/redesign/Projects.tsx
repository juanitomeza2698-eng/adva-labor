"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { photographs } from "./content";
import { BidBand } from "./Shell";

const filters = ["All fieldwork", "Earthwork", "Utilities", "Site preparation"];
export function ProjectsPage() {
  const [filter, setFilter] = useState(filters[0]);
  const [selected, setSelected] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const reduced = useReducedMotion();
  const photo = selected === null ? null : photographs[selected];
  useEffect(() => {
    if (selected !== null && !dialog.current?.open) dialog.current?.showModal();
    if (selected === null && dialog.current?.open) {
      dialog.current.close();
      opener.current?.focus();
    }
  }, [selected]);
  const next = (direction: number) =>
    setSelected((current) =>
      current === null
        ? null
        : (current + direction + photographs.length) % photographs.length,
    );
  return (
    <>
      <section className="adva-page-intro adva-container">
        <span className="adva-eyebrow">02 / FIELDWORK</span>
        <div>
          <h1>
            Work, at
            <br />
            <span>ground level.</span>
          </h1>
          <p>
            Excavation, utility installation, and site preparation. A closer
            look at the work in the field.
          </p>
        </div>
        <div
          className="adva-gallery-filter"
          role="group"
          aria-label="Filter field photographs"
        >
          {filters.map((item) => (
            <button
              key={item}
              aria-pressed={filter === item}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <p className="adva-gallery-source">
          Field photography from ADVA’s existing materials. Images are not
          attributed to a named project.
        </p>
      </section>
      <div
        className="adva-gallery adva-container"
        aria-live="polite"
        aria-atomic="false"
      >
        {photographs.map((p, index) =>
          filter === filters[0] || p.category === filter ? (
            <figure key={p.id} className={`adva-gallery-item ${p.orientation}`}>
              <button
                aria-label={`View photograph: ${p.title}`}
                onClick={(event) => {
                  opener.current = event.currentTarget;
                  setSelected(index);
                }}
              >
                <img
                  src={p.image}
                  width="1200"
                  height="900"
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                  alt={p.alt}
                />
                <span className="adva-gallery-zoom" aria-hidden="true">
                  +
                </span>
              </button>
              <figcaption>
                <span className="adva-mono">
                  0{index + 1} / {p.category.toUpperCase()}
                </span>
                <h2>{p.title}</h2>
              </figcaption>
            </figure>
          ) : null,
        )}
      </div>
      <dialog
        ref={dialog}
        className="adva-lightbox"
        aria-labelledby="adva-lightbox-title"
        onCancel={() => setSelected(null)}
        onClose={() => {
          setSelected(null);
          opener.current?.focus();
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") next(1);
          if (e.key === "ArrowLeft") next(-1);
        }}
      >
        <button
          className="adva-close"
          aria-label="Close photograph"
          onClick={() => setSelected(null)}
        >
          ×
        </button>
        <AnimatePresence mode="wait" initial={false}>
          {photo && (
            <m.figure
              key={photo.id}
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.16 }}
            >
              <img src={photo.image} alt={photo.alt} />
              <figcaption id="adva-lightbox-title">
                {photo.title}
                <span>
                  {(selected ?? 0) + 1} / {photographs.length}
                </span>
              </figcaption>
            </m.figure>
          )}
        </AnimatePresence>
        <div className="adva-lightbox-controls">
          <button
            className="adva-button adva-button-white"
            onClick={() => next(-1)}
          >
            Previous photo
          </button>
          <button
            className="adva-button adva-button-white"
            onClick={() => next(1)}
          >
            Next photo
          </button>
        </div>
      </dialog>
      <BidBand />
    </>
  );
}
