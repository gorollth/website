// src/app/contact/page.tsx
"use client";

import { useState, useEffect } from "react";
import ContactHero from "@/components/contact/ContactHero";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactMap from "@/components/contact/ContactMap";
import ContactFAQ from "@/components/contact/ContactFAQ";

export default function ContactPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-[calc(100vh-16rem)] space-y-8">
      {/* Hero Section with Parallax Effect */}
      <ContactHero scrollY={scrollY} />

      <div className="max-w-6xl mx-auto px-4">
        {/* Grid Layout for Contact Info and Map */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div>
            <ContactInfo />
          </div>

          {/* Map */}
          <div className="min-h-[500px]">
            <ContactMap />
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <ContactFAQ />

      {/* Decorative Elements */}
      <div
        className="fixed -z-10 top-20 right-0 w-64 h-64 bg-blue-500 rounded-full opacity-10 blur-3xl"
        style={{ transform: `translateY(${scrollY * 0.2}px)` }}
      ></div>
      <div
        className="fixed -z-10 bottom-0 left-0 w-96 h-96 bg-blue-600 rounded-full opacity-10 blur-3xl"
        style={{ transform: `translateY(${-scrollY * 0.1}px)` }}
      ></div>
    </div>
  );
}
