// src/components/about/SponsorSection.tsx
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { sponsors } from "../../data/sponsors";

export default function SponsorSection() {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  const itemsPerSlide = 4; // แสดง 4 logos ต่อ slide
  const totalSlides = Math.ceil(sponsors.length / itemsPerSlide);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(timer);
  }, [totalSlides]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getCurrentSponsors = () => {
    const startIndex = currentSlide * itemsPerSlide;
    return sponsors.slice(startIndex, startIndex + itemsPerSlide);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">
            {t("thank_you_sponsors")}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("sponsor_appreciation")}
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 md:p-3 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-all hover:scale-110 -ml-3 md:-ml-6"
            aria-label="Previous sponsors"
          >
            <ChevronLeft className="w-4 h-4 md:w-6 md:h-6 text-gray-600" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 md:p-3 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-all hover:scale-110 -mr-3 md:-mr-6"
            aria-label="Next sponsors"
          >
            <ChevronRight className="w-4 h-4 md:w-6 md:h-6 text-gray-600" />
          </button>

          {/* Sponsors Display - แก้ไขการจัดตำแหน่ง */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-12 mx-6 md:mx-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 lg:gap-12 items-center min-h-[120px] md:min-h-[160px]">
              {getCurrentSponsors().map((sponsor, index) => (
                <div
                  key={sponsor.id}
                  className="group cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg rounded-lg p-2 md:p-4 w-full flex flex-col items-center justify-center"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  <a
                    href={sponsor.website}
                    target={sponsor.website !== "#" ? "_blank" : "_self"}
                    rel={
                      sponsor.website !== "#"
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="block w-full h-full flex flex-col items-center justify-center"
                  >
                    {/* แก้ไข logo container ให้อยู่ตรงกลาง */}
                    <div className="h-20 w-full sm:h-24 md:h-32 lg:h-36 xl:h-40 max-w-[200px] flex items-center justify-center p-2 md:p-4 bg-gray-50 rounded-lg group-hover:bg-gray-100 transition-all duration-300">
                      <img
                        src={sponsor.logo}
                        alt={`${sponsor.name} logo`}
                        className="max-h-full max-w-full object-contain filter group-hover:brightness-110 transition-all duration-300"
                        onError={(e) => {
                          // Fallback if logo doesn't exist
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = `<div class="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center text-gray-600 font-semibold text-xs sm:text-sm md:text-base text-center px-2 md:px-4">${sponsor.name}</div>`;
                          }
                        }}
                      />
                    </div>
                    {/* ชื่อ sponsor */}
                    <div className="mt-2 md:mt-3 text-center">
                      <p className="text-xs sm:text-sm text-gray-600 font-medium group-hover:text-blue-600 transition-colors">
                        {sponsor.name}
                      </p>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 md:mt-8 space-x-2 md:space-x-3">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-blue-600 scale-125 shadow-md"
                    : "bg-gray-300 hover:bg-gray-400 hover:scale-110"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Optional: Add thank you message */}
        <div className="text-center mt-8 md:mt-12">
          <p className="text-gray-500 italic text-xs md:text-sm">
            {t("heartfelt_gratitude")}
          </p>
        </div>
      </div>
    </section>
  );
}
