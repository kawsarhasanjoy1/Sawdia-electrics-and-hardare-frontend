"use client";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const Carousel = () => {
  const [currentSlider, setCurrentSlider] = useState(0);
  const carouselImages = [
    "https://media.istockphoto.com/id/2205982417/photo/web-ui-ux-design-web-development-concept-a-web-developer-works-on-a-website-surrounded-by.jpg?s=1024x1024&w=is&k=20&c=UO0dRVEsrMWr68MIfYYXW_YD2AI5ubzEVZN1Vr6-8mE=",
    "https://media.istockphoto.com/id/2192074735/photo/autonomous-vehicles-glowing-neon-text-microchip-icon-wireless-signals-self-driving-car.jpg?s=1024x1024&w=is&k=20&c=ld71Mv0Q2JsNw5UkdQteWI4WRDU-cs72SoxIyD_4Mg0=",
    "https://media.gettyimages.com/id/2184592690/video/artificial-intelligence-processor-unit.jpg?s=640x640&k=20&c=MkoMTz87PE2SdbGig58SF2WDL_dCi71QFgRyKMSErsk=",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZJnRNfGXX1m4idqYmVGcbnIsddQMMntWlxA&s",
  ];

  const prevSlider = () =>
    setCurrentSlider((currentSlider) =>
      currentSlider === 0 ? carouselImages.length - 1 : currentSlider - 1
    );

  const nextSlider = useCallback(() => {
    setCurrentSlider((currentSlider) =>
      currentSlider === carouselImages.length - 1 ? 0 : currentSlider + 1
    );
  }, [carouselImages.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlider();
    }, 5000);

    return () => clearInterval(interval);
  }, [nextSlider]);

  return (
    <div className="relative w-full overflow-hidden rounded-lg">
      {/* Prev Button */}
      <button
        onClick={prevSlider}
        className="absolute left-3 top-1/2 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/70 hover:bg-white/90"
      >
        <svg
          className="icon h-5 w-5 fill-black/70"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M685.248 104.704a64 64 0 010 90.496L368.448 512l316.8 316.8a64 64 0 01-90.496 90.496L232.704 557.248a64 64 0 010-90.496l362.048-362.048a64 64 0 0190.496 0z"></path>
        </svg>
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlider}
        className="absolute right-3 top-1/2 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/70 hover:bg-white/90"
      >
        <svg
          className="icon h-5 w-5 fill-black/70"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
          transform="rotate(180)"
        >
          <path d="M685.248 104.704a64 64 0 010 90.496L368.448 512l316.8 316.8a64 64 0 01-90.496 90.496L232.704 557.248a64 64 0 010-90.496l362.048-362.048a64 64 0 0190.496 0z"></path>
        </svg>
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 z-50 flex w-full items-center justify-center gap-2">
        {carouselImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlider(idx)}
            className={`h-2 rounded-full bg-white transition-all ${
              currentSlider === idx ? "w-8" : "w-2"
            }`}
          />
        ))}
      </div>

      {/* Slides */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlider * 100}%)` }}
      >
        {carouselImages.map((img, idx) => (
          <div
            key={idx}
            className="relative w-full flex-shrink-0 aspect-[16/9]" // Fixed Aspect Ratio
          >
            <Image
              src={img}
              alt={`Slide ${idx + 1}`}
              fill
              className="object-cover object-center" // Full image show (no crop)
              priority={idx === 0}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
