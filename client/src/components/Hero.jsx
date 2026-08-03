import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // High quality generated Banaras Ghats Hotel Hero slides
  const slides = [
    {
      url: '/hero1.png',
      title: 'Experience Luxury in the Spiritual Capital of India',
      subtitle: 'Elegant Rooms • Delicious Food • Divine Views'
    },
    {
      url: '/hero2.png',
      title: 'Divine River Views & Heritage Hospitality',
      subtitle: 'Rooftop Dining • Ganga Aarti View • Luxury Suites'
    },
    {
      url: '/hero3.png',
      title: 'Serene Spiritual Stays on the Banks of Ganga',
      subtitle: 'Near Kashi Vishwanath • 24x7 Room Service • Pure Veg'
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
          
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white leading-[1.15] mb-5 sm:mb-6 tracking-wide drop-shadow-md">
            Experience Luxury<br />
            in the Spiritual Capital<br />
            <span className="text-[#cda85c] italic font-serif">of India</span>
          </h1>

          <p className="text-gray-200 text-sm sm:text-base font-medium mb-8 tracking-wide drop-shadow-sm">
            {slides[currentSlide].subtitle}
          </p>
          
          <div className="flex flex-wrap items-center gap-4">
            <a href="#booking" className="bg-[#cda85c] hover:bg-[#b8934b] text-white font-medium text-xs tracking-wider px-7 py-3.5 rounded-sm transition-all duration-300 shadow-xl uppercase inline-block">
              BOOK YOUR STAY
            </a>
            <a href="#rooms" className="border border-white/70 bg-black/30 hover:bg-white/10 text-white font-medium text-xs tracking-wider px-7 py-3.5 rounded-sm transition-all duration-300 uppercase backdrop-blur-xs inline-block">
              EXPLORE ROOMS
            </a>
          </div>
        </div>
      </div>

      {/* Carousel Dots Indicators */}
      <div className="absolute bottom-20 left-0 right-0 z-20 flex justify-center items-center space-x-3">
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

      {/* Floating Side Action Panel (WhatsApp / Call Now / Book Now) - Hidden on Mobile */}
      <div className="hidden md:flex absolute right-4 sm:right-8 lg:right-12 top-6 sm:top-10 lg:top-12 z-30 bg-stone-900/90 backdrop-blur-xl border border-[#cda85c]/40 rounded-3xl p-3 sm:p-3.5 shadow-2xl flex-col space-y-2.5 min-w-[155px] sm:min-w-[160px] transition-all hover:border-[#cda85c]/80 select-none">
        
        {/* WhatsApp Button */}
        <a 
          href="https://wa.me/918470905123?text=Hello%20Shivlok%20Palace%20Team%2C%20I%20would%20like%20to%20inquire%20about%20room%20availability%20and%20tariffs." 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center space-x-3 p-1.5 rounded-xl hover:bg-white/10 transition-all duration-300 group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform flex-shrink-0">
            <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-0.999 3.648 3.742-.981z"/>
            </svg>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors tracking-wide">WhatsApp</span>
            <span className="text-[9px] text-gray-400 font-medium">Instant Chat</span>
          </div>
        </a>

        <div className="w-full h-[1px] bg-stone-700/60"></div>

        {/* Call Now Button */}
        <a 
          href="tel:+918470905123" 
          className="flex items-center space-x-3 p-1.5 rounded-xl hover:bg-white/10 transition-all duration-300 group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center shadow-lg shadow-amber-500/30 group-hover:scale-110 transition-transform flex-shrink-0 font-bold">
            <svg className="w-3.5 h-3.5 stroke-current fill-none stroke-[2.5]" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors tracking-wide">Call Now</span>
            <span className="text-[9px] text-gray-400 font-medium">+91 8470905123</span>
          </div>
        </a>

        <div className="w-full h-[1px] bg-stone-700/60"></div>

        {/* Book Now Button */}
        <a 
          href="#booking" 
          className="flex items-center space-x-3 p-1.5 rounded-xl hover:bg-white/10 transition-all duration-300 group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#cda85c] to-[#b89448] text-stone-950 flex items-center justify-center shadow-lg shadow-[#cda85c]/30 group-hover:scale-110 transition-transform flex-shrink-0 font-bold">
            <svg className="w-3.5 h-3.5 stroke-current fill-none stroke-[2.5]" viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-xs font-bold text-white group-hover:text-[#cda85c] transition-colors tracking-wide">Book Now</span>
            <span className="text-[9px] text-gray-400 font-medium">Check Dates</span>
          </div>
        </a>

      </div>

    </div>
  );
};

export default Hero;
