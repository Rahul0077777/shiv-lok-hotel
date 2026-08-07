import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRight, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

const Gallery = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const images = [
    { title: 'Rooms', url: '/gal_rooms.png' },
    { title: 'Lobby', url: '/gal_lobby.png' },
    { title: 'Restaurant', url: '/rest_thumb1.png' },
    { title: 'Rooftop', url: '/rest_main.png' },
    { title: 'Hotel Exterior', url: '/hero1.png' },
    { title: 'Hotel Rooms', url: '/hero2.png' },
  ];

  const openLightbox = (index) => {
    setActiveIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e) => {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxOpen, goPrev, goNext]);

  return (
    <div id="gallery" className="bg-[#FAF8F5] dark:bg-[#0f1114] pt-12 md:pt-16 pb-4 md:pb-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
          <div>
            <div className="inline-block border-b-2 border-[#cda85c] pb-1 mb-2">
              <p className="text-[#cda85c] text-[11px] font-bold tracking-[0.2em] uppercase">
                GALLERY
              </p>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-gray-900 dark:text-white leading-tight transition-colors">
              Glimpses of Shivlok Palace
            </h2>
          </div>

          <button
            onClick={() => openLightbox(0)}
            className="inline-flex items-center text-xs font-bold text-gray-800 dark:text-gray-200 hover:text-[#cda85c] dark:hover:text-[#cda85c] tracking-widest uppercase transition-colors group cursor-pointer"
          >
            <span className="border-b border-gray-800 dark:border-gray-200 group-hover:border-[#cda85c] dark:group-hover:border-[#cda85c] pb-0.5">VIEW FULL GALLERY</span>
            <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {images.map((img, index) => (
            <div
              key={index}
              onClick={() => openLightbox(index)}
              className="relative h-44 sm:h-52 rounded-2xl overflow-hidden shadow-sm border border-gray-200/80 dark:border-gray-800 group cursor-pointer hover:shadow-xl transition-all duration-300"
            >
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-colors"></div>

              {/* Zoom icon on hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 border border-white/30">
                  <ZoomIn size={18} className="text-white" />
                </div>
              </div>

              {/* Centered Label at Bottom */}
              <div className="absolute bottom-4 left-0 right-0 text-center px-2">
                <span className="text-white text-xs font-semibold tracking-wide drop-shadow-md">
                  {img.title}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 z-10 w-10 h-10 bg-white/10 hover:bg-red-600 border border-white/20 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <X size={20} />
          </button>

          {/* Counter */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 z-10 bg-black/50 border border-white/20 backdrop-blur-sm text-white text-xs font-bold px-4 py-1.5 rounded-full tracking-widest">
            {activeIndex + 1} / {images.length}
          </div>

          {/* Prev Button */}
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-4 sm:left-8 z-10 w-11 h-11 bg-white/10 hover:bg-[#cda85c] border border-white/20 rounded-full flex items-center justify-center text-white hover:text-gray-950 transition-all"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Main Image */}
          <div
            className="relative max-w-5xl w-full mx-16 sm:mx-24"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[activeIndex].url}
              alt={images[activeIndex].title}
              className="w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
            />
            {/* Caption */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm border border-white/20 text-white text-xs font-bold px-5 py-2 rounded-full tracking-widest uppercase">
              {images[activeIndex].title}
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-4 sm:right-8 z-10 w-11 h-11 bg-white/10 hover:bg-[#cda85c] border border-white/20 rounded-full flex items-center justify-center text-white hover:text-gray-950 transition-all"
          >
            <ChevronRight size={24} />
          </button>

          {/* Thumbnail Strip */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 px-4">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={(e) => { e.stopPropagation(); setActiveIndex(idx); }}
                className={`w-12 h-9 rounded-lg overflow-hidden border-2 transition-all ${
                  idx === activeIndex
                    ? 'border-[#cda85c] scale-110'
                    : 'border-white/20 opacity-50 hover:opacity-80'
                }`}
              >
                <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
