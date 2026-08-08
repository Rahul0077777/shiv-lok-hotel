import React from 'react';
import { Footprints, Navigation, ExternalLink } from 'lucide-react';

const Explore = () => {

  const places = [
    {
      title: 'Kashi Vishwanath Temple',
      dist: '500 m',
      time: '8–10 min walk',
      isWalk: true,
      tag: 'Walking Distance',
      tagColor: 'bg-emerald-600',
      emoji: '🛕',
      url: '/loc_kashi.png',
      mapsQuery: 'Kashi+Vishwanath+Temple+Varanasi',
      desc: 'India\'s most sacred Shiva temple – walkable from the hotel'
    },
    {
      title: 'Dashashwamedh Ghat',
      dist: '500 m',
      time: '10–12 min walk',
      isWalk: true,
      tag: 'Ganga Aarti Ghat',
      tagColor: 'bg-orange-600',
      emoji: '🪔',
      url: '/loc_dashashwamedh.png',
      mapsQuery: 'Dashashwamedh+Ghat+Varanasi',
      desc: 'Famous for the spectacular evening Ganga Aarti ceremony'
    },
    {
      title: 'Assi Ghat',
      dist: '3.0 km',
      time: '10–15 min drive',
      isWalk: false,
      tag: 'Popular Ghat',
      tagColor: 'bg-blue-600',
      emoji: '🌊',
      url: '/loc_assi.png',
      mapsQuery: 'Assi+Ghat+Varanasi',
      desc: 'Beloved ghat known for sunrise yoga and boat rides'
    },
    {
      title: 'Varanasi Junction Railway Station',
      dist: '4 km',
      time: '15 min drive',
      isWalk: false,
      tag: 'Railway Hub',
      tagColor: 'bg-gray-700',
      emoji: '🚂',
      url: '/loc_railway.png',
      mapsQuery: 'Varanasi+Junction+Railway+Station',
      desc: 'Main railway station – well connected across India'
    },
    {
      title: 'Banaras Hindu University (BHU)',
      dist: '5 km',
      time: '18 min drive',
      isWalk: false,
      tag: 'University Landmark',
      tagColor: 'bg-purple-700',
      emoji: '🎓',
      url: '/loc_bhu.png',
      mapsQuery: 'Banaras+Hindu+University+Varanasi',
      desc: 'One of India\'s largest residential universities'
    },
    {
      title: 'Sarnath',
      dist: '9 km',
      time: '30 min drive',
      isWalk: false,
      tag: 'Buddhist Heritage',
      tagColor: 'bg-yellow-700',
      emoji: '☸️',
      url: '/loc_sarnath.png',
      mapsQuery: 'Sarnath+Varanasi',
      desc: 'Where Buddha gave his first sermon – a UNESCO site'
    },
    {
      title: 'Lal Bahadur Shastri International Airport',
      dist: '27 km',
      time: '50–60 min drive',
      isWalk: false,
      tag: 'Airport / Transit',
      tagColor: 'bg-sky-700',
      emoji: '✈️',
      url: '/loc_airport.png',
      mapsQuery: 'Lal+Bahadur+Shastri+International+Airport+Varanasi',
      desc: 'International airport serving Varanasi city'
    }
  ];

  const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=Shivlok+Palace+Hotel,+D-34%2F181,+Ganesh+Mahal+Road,+Jangambadi,+Near+Godowlia+Chauraha,+Varanasi+221001`;

  return (
    <div className="bg-[#FAF8F5] dark:bg-[#121417] pt-12 md:pt-16 pb-16 md:pb-20 border-b border-gray-200/40 dark:border-gray-800 transition-colors duration-300 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ── Section Header ── */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
          <div>
            <div className="inline-block border-b-2 border-[#cda85c] pb-1 mb-2">
              <p className="text-[#cda85c] text-[11px] font-bold tracking-[0.2em] uppercase">
                EXPLORE VARANASI &amp; TRANSIT HUBS
              </p>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-gray-900 dark:text-white leading-tight transition-colors">
              Nearby Attractions &amp; Connectivity
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm font-light mt-2 max-w-2xl transition-colors">
              Shivlok Palace offers unbeatable accessibility — just a short 8–10 minute walk to the revered Kashi Vishwanath Temple and Dashashwamedh Ghat.
            </p>
          </div>
          
          {/* Get Directions CTA */}
          <a
            href={DIRECTIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold text-white bg-[#4285F4] hover:bg-[#3367D6] tracking-wide uppercase transition-all px-5 py-2.5 rounded-xl shadow-md hover:scale-105 flex-shrink-0"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/></svg>
            Get Directions to Hotel
          </a>
        </div>



        {/* ── 7 Photo Cards Responsive Grid (below) ── */}
        <div>
          <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 tracking-[0.2em] uppercase mb-4">
            🗺️ Explore Varanasi – Photo Gallery
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
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
                    <div className={`absolute top-3 left-3 ${place.tagColor} backdrop-blur-sm text-white text-[9px] font-bold px-2.5 py-1 rounded-full tracking-wider uppercase`}>
                      {place.tag}
                    </div>
                    {/* Distance pill overlay */}
                    <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-white/20">
                      {place.dist}
                    </div>
                  </div>

                  {/* Text Info */}
                  <div className="p-4">
                    <h3 className="font-serif font-bold text-gray-900 dark:text-white text-sm mb-1 group-hover:text-[#cda85c] transition-colors line-clamp-2 leading-snug">
                      {place.emoji} {place.title}
                    </h3>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">{place.desc}</p>
                    
                    <div className="flex items-center gap-3 mt-2.5 pt-2.5 border-t border-gray-100 dark:border-gray-800">
                      <div className="flex items-center text-xs text-gray-600 dark:text-gray-300">
                        {place.isWalk ? (
                          <Footprints size={12} className="mr-1 text-emerald-600 dark:text-emerald-400" />
                        ) : (
                          <Navigation size={12} className="mr-1 text-blue-600 dark:text-blue-400" />
                        )}
                        <span className="font-medium text-[11px]">{place.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="px-4 pb-4 pt-0">
                  <a 
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(place.title + ' Varanasi')}&origin=Shivlok+Palace+Hotel+Varanasi`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full text-center flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#4285F4]/10 hover:bg-[#4285F4] text-[#4285F4] hover:text-white text-[11px] font-bold transition-all border border-[#4285F4]/30 hover:border-[#4285F4]"
                  >
                    <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/></svg>
                    Directions from Hotel
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom Get Directions Banner ── */}
        <div className="mt-10 rounded-2xl bg-gradient-to-r from-[#4285F4] via-[#3367D6] to-[#0d47a1] p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div>
            <p className="text-white/80 text-[10px] font-bold tracking-[0.2em] uppercase mb-1">🗺️ Google Maps</p>
            <h3 className="text-white text-lg sm:text-xl font-serif font-bold">Find Your Way to Shivlok Palace</h3>
            <p className="text-white/70 text-xs mt-1">D-34/181, Ganesh Mahal Road, Near Godowlia Chauraha, Varanasi – 221001</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <a
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-white text-[#4285F4] hover:bg-gray-100 font-bold text-xs px-6 py-3 rounded-xl uppercase tracking-wider transition-all shadow-md hover:scale-105"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/></svg>
              Get Directions
            </a>
            <a
              href="https://maps.google.com/?q=Shivlok+Palace+Hotel+Varanasi"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border-2 border-white/50 text-white hover:bg-white/10 font-bold text-xs px-6 py-3 rounded-xl uppercase tracking-wider transition-all"
            >
              <ExternalLink size={13} />
              View on Google Maps
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Explore;
