"use client";
import React from "react";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/17205571051"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-transform hover:scale-110"
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
    >
      💬
    </a>
  );
}
