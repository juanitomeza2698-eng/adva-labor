"use client";
import React from "react";

export default function Gallery() {
  const images = [
    "/gallery/project1.jpg",
    "/gallery/project2.jpg",
    "/gallery/project3.jpg",
    "/gallery/project4.jpg",
    "/gallery/project5.jpg",
    "/gallery/project6.jpg",
  ];

  return (
    <section id="gallery" className="py-20 bg-gray-100">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-4xl font-bold text-center text-purple-700 mb-12">Recent Projects</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((src, i) => (
            <div key={i} className="overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition">
              <img
                src={src}
                alt={`Project ${i + 1}`}
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

