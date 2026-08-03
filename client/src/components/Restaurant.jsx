import React, { useState } from 'react';
import { Check, Play, X } from 'lucide-react';

const Restaurant = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <div id="restaurant" className="bg-[#F5F2ED] dark:bg-[#181412] text-gray-900 dark:text-white py-16 md:py-20 overflow-hidden border-t border-b border-gray-200 dark:border-gray-900 transition-colors duration-300 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Left Text Block (4 cols) */}
          <div className="lg:col-span-4 pr-0 lg:pr-4">
            <p className="text-[#cda85c] text-[11px] font-bold tracking-[0.2em] uppercase mb-3">
              PURE VEG RESTAURANT
            </p>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-gray-900 dark:text-white leading-tight mb-4 transition-colors">
              Great Food,<br />
              Great Experience
            </h2>
            
            <p className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm leading-relaxed mb-6 font-light transition-colors">
              Savor a wide range of delicious Indian, Continental & local delicacies with breathtaking Ganga views.
            </p>

            {/* Checkmarks Grid */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              <div className="flex items-center space-x-2 text-xs text-gray-800 dark:text-gray-200 font-semibold dark:font-medium">
                <Check size={16} className="text-[#cda85c] flex-shrink-0" />
                <span>Pure Veg Restaurant</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-800 dark:text-gray-200 font-semibold dark:font-medium">
                <Check size={16} className="text-[#cda85c] flex-shrink-0" />
                <span>Breakfast Buffet</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-800 dark:text-gray-200 font-semibold dark:font-medium">
                <Check size={16} className="text-[#cda85c] flex-shrink-0" />
                <span>Multi-cuisine Menu</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-800 dark:text-gray-200 font-semibold dark:font-medium">
                <Check size={16} className="text-[#cda85c] flex-shrink-0" />
                <span>Rooftop Dining</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button className="bg-[#cda85c] hover:bg-[#b89448] text-gray-950 font-bold text-xs px-6 py-3 rounded-xl transition-all duration-300 tracking-wider uppercase shadow-lg">
                VIEW MENU
              </button>
              <button className="border border-gray-400 dark:border-[#cda85c]/80 hover:bg-gray-200 dark:hover:bg-[#cda85c]/10 text-gray-900 dark:text-white font-bold text-xs px-6 py-3 rounded-xl transition-all duration-300 tracking-wider uppercase">
                RESERVE A TABLE
              </button>
            </div>
          </div>

          {/* Center Main Image (5 cols) */}
          <div className="lg:col-span-5 h-[360px] sm:h-[400px] lg:h-[430px] rounded-2xl overflow-hidden shadow-xl border border-gray-300 dark:border-gray-800 relative group">
            <img 
              src="/rest_main.png" 
              alt="Main Rooftop Restaurant View" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
          </div>

          {/* Right 3 Thumbnails Stack (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-3 h-[360px] sm:h-[400px] lg:h-[430px]">
            
            {/* Thumbnail 1 */}
            <div className="flex-1 rounded-2xl overflow-hidden border border-gray-300 dark:border-gray-800 shadow-md relative group">
              <img 
                src="/rest_thumb1.png" 
                alt="Restaurant Ambiance" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Thumbnail 2 - Video Thumbnail with Play Button */}
            <div 
              onClick={() => setIsVideoOpen(true)}
              className="flex-1 rounded-2xl overflow-hidden border border-gray-300 dark:border-gray-800 shadow-md relative group cursor-pointer"
            >
              <img 
                src="/rest_thumb2.png" 
                alt="Restaurant Dining Video" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-md border border-white/80 flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
                  <Play size={20} className="text-white fill-white ml-0.5" />
                </div>
              </div>
            </div>

            {/* Thumbnail 3 */}
            <div className="flex-1 rounded-2xl overflow-hidden border border-gray-300 dark:border-gray-800 shadow-md relative group">
              <img 
                src="/rest_thumb3.png" 
                alt="Restaurant Food Spread" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>

          </div>

        </div>
      </div>

      {/* Video Modal Player */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
            <button 
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 z-10 text-white/80 hover:text-white bg-black/60 rounded-full p-2 hover:bg-black transition-all"
            >
              <X size={24} />
            </button>
            <div className="aspect-video w-full">
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/6_3HjB2SgM4?autoplay=1" 
                title="Banaras Ganga View Restaurant & Aarti Experience" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Restaurant;
