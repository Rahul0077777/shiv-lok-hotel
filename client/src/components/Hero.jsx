import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MessageCircle, MapPin } from 'lucide-react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Shivlok Palace property-themed hero slides
  const slides = [
    {
      url: '/hero1.png',
      title: 'Experience Luxury in the Spiritual Capital of India',
      subtitle: 'Walking Distance from Kashi Vishwanath Temple & Ganga Ghats'
    },
    {
      url: '/hero2.png',
      title: 'Elegant Rooms Blending Heritage & Modern Comfort',
      subtitle: 'Premium Rooms · Pure Veg Dining Coming Soon · 24×7 Service'
    },
    {
      url: '/hero3.png',
      title: 'Wake Up to Sacred Ganga Views Every Morning',
      subtitle: 'Near Dashashwamedh Ghat · Kashi Vishwanath Temple Walkable'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full h-[75vh] sm:h-[85vh] min-h-[520px] sm:min-h-[620px] flex items-center bg-black overflow-hidden select-none">
      
      {/* Background Image Carousel with Smooth Fade */}
      {slides.map((slide, index) => (
        <div 
          key={index}
          className={`absolute inset-0 z-0 bg-cover bg-[center_top] sm:bg-center transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 scale-105 transition-transform duration-[7000ms]' : 'opacity-0 scale-100'
          }`}
          style={{ backgroundImage: `url(${slide.url})` }}
        >
          {/* Vignette & Dark Overlay for Mobile & Desktop Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 sm:bg-gradient-to-r sm:from-black/80 sm:via-black/45 sm:to-black/30"></div>
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
      ))}

      {/* Left Navigation Arrow */}
      <button 
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white transition-all transform hover:scale-125 p-2 focus:outline-none"
      >
        <ChevronLeft size={36} strokeWidth={1.5} />
      </button>

      {/* Right Navigation Arrow */}
      <button 
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white transition-all transform hover:scale-125 p-2 opacity-50 hover:opacity-100 focus:outline-none"
      >
        <ChevronRight size={36} strokeWidth={1.5} />
      </button>

      {/* Hero Text Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-12 lg:px-20 pt-6 sm:pt-8">
        <div className="max-w-2xl">
          <p className="text-[#cda85c] tracking-[0.25em] text-xs font-bold mb-3 sm:mb-4 uppercase">
            Welcome to Kashi
          </p>
          
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white leading-[1.15] mb-4 sm:mb-5 tracking-wide drop-shadow-md">
            Experience Luxury<br />
            in the Spiritual Capital<br />
            <span className="text-[#cda85c] italic font-serif">of India</span>
          </h1>

          {/* Location Badge */}
          <div className="flex items-center gap-1.5 mb-4 sm:mb-5">
            <MapPin size={14} className="text-[#cda85c] flex-shrink-0" />
            <span className="text-gray-200 text-xs sm:text-sm font-medium drop-shadow-sm">
              Walking distance from <span className="text-[#cda85c] font-semibold">Kashi Vishwanath Temple</span> & <span className="text-[#cda85c] font-semibold">Ganga Ghats</span>
            </span>
          </div>

          <p className="text-gray-300 text-sm sm:text-base font-medium mb-8 tracking-wide drop-shadow-sm">
            {slides[currentSlide].subtitle}
          </p>
          
          <div className="flex flex-wrap items-center gap-4">
            <a 
              href="https://wa.me/918470905123?text=Hello%20Shivlok%20Palace%20Team%2C%20I%20would%20like%20to%20book%20a%20room.%20Please%20share%20availability%20and%20tariffs."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#cda85c] hover:bg-[#b8934b] text-white font-medium text-xs tracking-wider px-7 py-3.5 rounded-sm transition-all duration-300 shadow-xl uppercase"
            >
              <MessageCircle size={14} className="fill-current" />
              BOOK YOUR STAY
            </a>
            <a href="#rooms" className="border border-white/70 bg-black/30 hover:bg-white/10 text-white font-medium text-xs tracking-wider px-7 py-3.5 rounded-sm transition-all duration-300 uppercase backdrop-blur-xs inline-block">
              EXPLORE ROOMS
            </a>
          </div>
        </div>
      </div>

      {/* Carousel Dots Indicators */}
      <div className="absolute bottom-20 sm:bottom-10 left-0 right-0 z-20 flex justify-center items-center space-x-3">
        {slides.map((_, index) => (
          <button 
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              index === currentSlide 
                ? 'w-3 h-3 bg-white shadow-md' 
                : 'w-2.5 h-2.5 bg-white/50 hover:bg-white/80'
            }`}
          ></button>
        ))}
      </div>

    </div>
  );
};

export default Hero;
