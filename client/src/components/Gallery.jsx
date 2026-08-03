import React from 'react';
import { ArrowRight } from 'lucide-react';

const Gallery = () => {
  const images = [
    { title: 'Rooms', url: '/gal_rooms.png' },
    { title: 'Lobby', url: '/gal_lobby.png' },
    { title: 'Restaurant', url: '/rest_thumb1.png' },
    { title: 'Rooftop', url: '/rest_main.png' },
    { title: 'Exterior', url: '/hero1.png' },
    { title: 'Nearby Places', url: '/hero2.png' },
  ];

  return (
    <div className="bg-[#FAF8F5] dark:bg-[#0f1114] pt-12 md:pt-16 pb-4 md:pb-6 transition-colors duration-300">
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
          
          <a href="#gallery" className="inline-flex items-center text-xs font-bold text-gray-800 dark:text-gray-200 hover:text-[#cda85c] dark:hover:text-[#cda85c] tracking-widest uppercase transition-colors group">
            <span className="border-b border-gray-800 dark:border-gray-200 group-hover:border-[#cda85c] dark:group-hover:border-[#cda85c] pb-0.5">VIEW FULL GALLERY</span>
            <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {images.map((img, index) => (
            <div 
              key={index} 
              className="relative h-44 sm:h-52 rounded-2xl overflow-hidden shadow-sm border border-gray-200/80 dark:border-gray-800 group cursor-pointer hover:shadow-xl transition-all duration-300"
            >
              <img 
                src={img.url} 
                alt={img.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-colors"></div>
              
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
    </div>
  );
};

export default Gallery;
