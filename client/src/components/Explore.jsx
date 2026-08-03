import React from 'react';
import { ArrowRight, MapPin, Footprints, Navigation } from 'lucide-react';

const Explore = () => {
  const places = [
    {
      title: 'Kashi Vishwanath Temple',
      dist: '500 m',
      time: '8–10 min walk',
      isWalk: true,
      tag: 'Walking Distance',
      url: '/loc_kashi.png'
    },
    {
      title: 'Dashashwamedh Ghat',
      dist: '500 m',
      time: '10–12 min walk',
      isWalk: true,
      tag: 'Ganga Aarti Ghat',
      url: '/loc_dashashwamedh.png'
    },
    {
      title: 'Assi Ghat',
      dist: '3.0 km',
      time: '10–15 min drive',
      isWalk: false,
      tag: 'Popular Ghat',
      url: '/loc_assi.png'
    },
    {
      title: 'Varanasi Junction Railway Station',
      dist: '4 km',
      time: '15 min drive',
      isWalk: false,
      tag: 'Railway Hub',
      url: '/loc_railway.png'
    },
    {
      title: 'Banaras Hindu University (BHU)',
      dist: '5 km',
      time: '18 min drive',
      isWalk: false,
      tag: 'University Landmark',
      url: '/loc_bhu.png'
    },
    {
      title: 'Sarnath',
      dist: '9 km',
      time: '30 min drive',
      isWalk: false,
      tag: 'Buddhist Heritage',
      url: '/loc_sarnath.png'
    },
    {
      title: 'Lal Bahadur Shastri International Airport',
      dist: '27 km',
      time: '50–60 min drive',
      isWalk: false,
      tag: 'Airport / Transit',
      url: '/loc_airport.png'
    }
  ];

  return (
    <div className="bg-[#FAF8F5] dark:bg-[#121417] pt-12 md:pt-16 pb-16 md:pb-20 border-b border-gray-200/40 dark:border-gray-800 transition-colors duration-300 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
          <div>
            <div className="inline-block border-b-2 border-[#cda85c] pb-1 mb-2">
              <p className="text-[#cda85c] text-[11px] font-bold tracking-[0.2em] uppercase">
                EXPLORE VARANASI & TRANSIT HUBS
              </p>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-gray-900 dark:text-white leading-tight transition-colors">
              Nearby Attractions & Connectivity
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm font-light mt-2 max-w-2xl transition-colors">
              Shivlok Palace offers unbeatable accessibility—just a short 10-minute heritage stroll to the revered Kashi Vishwanath Temple and Dashashwamedh Ghat!
            </p>
          </div>
          
          <a href="#rooms" className="inline-flex items-center text-xs font-bold text-gray-900 dark:text-white hover:text-[#cda85c] dark:hover:text-[#cda85c] tracking-widest uppercase transition-colors group px-4 py-2 bg-white dark:bg-[#181a1f] rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <span>BOOK CENTRAL STAY</span>
            <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* 7 Cards Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {places.map((place, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-[#181a1f] rounded-2xl overflow-hidden shadow-sm border border-gray-200/80 dark:border-gray-800 group cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image & Tag */}
                <div className="relative h-44 overflow-hidden">
                  <img 
                    src={place.url} 
                    alt={place.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 bg-gray-900/85 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/20 tracking-wider uppercase">
                    {place.tag}
                  </div>
                </div>

                {/* Text Info */}
                <div className="p-5">
                  <h3 className="font-serif font-bold text-gray-900 dark:text-white text-base mb-3 group-hover:text-[#cda85c] transition-colors line-clamp-2 leading-snug">
                    {place.title}
                  </h3>
                  
                  <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-gray-800 transition-colors">
                    <div className="flex items-center text-xs font-bold text-[#cda85c]">
                      <MapPin size={14} className="mr-1.5 flex-shrink-0 fill-[#cda85c]/20 text-[#cda85c]" />
                      <span className="text-gray-900 dark:text-gray-300 font-semibold mr-1 transition-colors">Distance:</span>
                      <span className="text-gray-800 dark:text-white font-bold transition-colors">{place.dist}</span>
                    </div>

                    <div className="flex items-center text-xs text-gray-600 dark:text-gray-300 transition-colors">
                      {place.isWalk ? (
                        <Footprints size={14} className="mr-1.5 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <Navigation size={13} className="mr-1.5 flex-shrink-0 text-blue-600 dark:text-blue-400" />
                      )}
                      <span className="font-medium text-gray-700 dark:text-gray-200 transition-colors">{place.time}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="px-5 pb-4 pt-0">
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.title + ' Varanasi')}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full text-center block py-2 px-3 rounded-lg bg-gray-50 dark:bg-[#121417] hover:bg-gray-100 dark:hover:bg-black text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white text-xs font-bold transition-colors border border-gray-200/60 dark:border-gray-800"
                >
                  View on Google Maps
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Explore;
