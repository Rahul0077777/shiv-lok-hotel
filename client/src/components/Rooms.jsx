import React, { useRef, useState } from 'react';
import { ChevronRight, ArrowRight, X, Check, Phone, MessageCircle, AlertTriangle, ShieldCheck } from 'lucide-react';

const Rooms = () => {
  const scrollContainerRef = useRef(null);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const roomsData = [
    {
      title: 'Deluxe Room',
      image: '/room_deluxe.png',
      guests: '2 Adults',
      bed: '1 Bed',
      size: '250 sq.ft',
      rawPrice: '3,200',
      price: '₹3,200 + Taxes',
      extra: '*Extra Guest Chargeable',
      desc: 'Designed for relaxation and comfort after exploring the sacred city of Varanasi, offering soothing interiors and state-of-the-art modern electronics.'
    },
    {
      title: 'Premium Room',
      image: '/room_executive.png',
      guests: '2 Adults',
      bed: '1 Bed',
      size: '300 sq.ft',
      rawPrice: '4,500',
      price: '₹4,500 + Taxes',
      extra: '*Extra Guest Chargeable',
      desc: 'An upgraded luxury sanctuary boasting enhanced floor space, sophisticated plush bedding, and an expansive work desk area for discerning travelers.'
    },
    {
      title: 'Family Suite',
      image: '/room_family.png',
      guests: '4 Adults',
      bed: '2 Beds',
      size: '450 sq.ft',
      rawPrice: '7,500',
      price: '₹7,500 + Taxes',
      extra: '*Extra Guest Chargeable',
      desc: 'Our most spacious accommodation specifically tailored for families and pilgrim groups of up to 4 adults, featuring dual bedding configurations and generous living area.'
    }
  ];

  const commonAmenities = [
    'Air Conditioner (AC)',
    'LED Smart TV',
    'Free High-Speed Wi-Fi',
    'Complimentary Mineral Water',
    'Tea/Coffee Maker & Electric Kettle',
    'Attached Bathroom & Toiletries',
    '24 Hours Hot & Cold Water',
    'Bath & Hand Towels, Slippers',
    'Wardrobe, Work Desk & Chair',
    'Room Service & Daily Housekeeping',
    'In-Room Power Backup & Telephone'
  ];

  const scrollNext = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <div id="rooms" className="bg-[#FAF8F5] dark:bg-[#0f1114] py-16 md:py-20 overflow-hidden border-b border-gray-200/40 dark:border-gray-800 transition-colors duration-300 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start relative">
          
          {/* Left Text Block */}
          <div className="lg:w-1/4 pt-4">
            <div className="inline-block border-b-2 border-[#cda85c] pb-1 mb-4">
              <p className="text-[#cda85c] text-[11px] font-bold tracking-[0.2em] uppercase">
                OUR ROOMS & SUITES
              </p>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-serif text-gray-900 dark:text-white leading-tight mb-4 transition-colors">
              Stay in Luxury<br />& Comfort
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300 mb-8 text-xs sm:text-sm leading-relaxed transition-colors">
              Contemporary rooms and suites that blend heritage tranquility with modern verified amenities.
            </p>
            
            <button 
              onClick={() => setSelectedRoom(roomsData[0])}
              className="inline-flex items-center text-xs font-bold text-gray-900 dark:text-white hover:text-[#cda85c] dark:hover:text-[#cda85c] tracking-widest uppercase transition-colors group cursor-pointer"
            >
              <span className="border-b border-gray-900 dark:border-white group-hover:border-[#cda85c] dark:group-hover:border-[#cda85c] pb-0.5">EXPLORE SPECS & TARIFFS</span>
              <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right Cards Slider */}
          <div className="lg:w-3/4 w-full relative">
            <div 
              ref={scrollContainerRef}
              className="flex overflow-x-auto gap-5 pb-4 pt-1 snap-x hide-scrollbar scroll-smooth"
            >
              {roomsData.map((room, index) => (
                <div 
                  key={index} 
                  onClick={() => setSelectedRoom(room)}
                  className="min-w-[280px] w-[280px] sm:min-w-[310px] sm:w-[310px] flex-shrink-0 bg-white dark:bg-[#181a1f] rounded-2xl overflow-hidden shadow-sm border border-gray-200/80 dark:border-gray-800 group snap-start cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Room Image */}
                    <div className="relative h-48 overflow-hidden rounded-t-2xl">
                      <img 
                        src={room.image} 
                        alt={room.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute bottom-3 left-3 bg-gray-950/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-white/20">
                        {room.guests}
                      </div>
                    </div>
                    
                    {/* Room Details */}
                    <div className="p-6">
                      <h3 className="text-lg font-serif font-bold text-gray-900 dark:text-white mb-3 group-hover:text-[#cda85c] transition-colors">
                        {room.title}
                      </h3>
                      
                      {/* Icons Row */}
                      <div className="flex items-center space-x-3 text-xs text-gray-600 dark:text-gray-300 mb-4 font-medium transition-colors">
                        <span className="flex items-center">
                          <svg className="w-3.5 h-3.5 mr-1.5 text-[#cda85c]" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                          </svg>
                          {room.guests}
                        </span>
                        <span>•</span>
                        <span className="flex items-center">
                          <svg className="w-3.5 h-3.5 mr-1.5 text-[#cda85c]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M3 7v11m0-4h18m0-7v11M3 11h18" />
                          </svg>
                          {room.bed}
                        </span>
                        <span>•</span>
                        <span className="flex items-center">
                          <svg className="w-3.5 h-3.5 mr-1.5 text-[#cda85c]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                          </svg>
                          {room.size}
                        </span>
                      </div>
                      
                      {/* Price */}
                      <div className="pt-2 border-t border-gray-100 dark:border-gray-800 transition-colors">
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-medium transition-colors">
                          Tariff: <span className="text-base font-bold text-gray-900 dark:text-white">{room.price}</span> / Night
                        </p>
                        <span className="inline-block px-2.5 py-0.5 bg-amber-50 dark:bg-[#cda85c]/20 text-amber-800 dark:text-amber-300 border border-amber-200/80 dark:border-[#cda85c]/40 rounded text-[10px] font-bold tracking-wide transition-colors">
                          {room.extra}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* View Details Link */}
                  <div className="px-6 pb-6 pt-0">
                    <button className="w-full text-center py-2.5 rounded-xl bg-gray-900 group-hover:bg-[#cda85c] text-white group-hover:text-gray-950 text-xs font-bold uppercase tracking-wider transition-all shadow">
                      View Full Specs & Book
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Scroll Next Button */}
            <button 
              onClick={scrollNext}
              aria-label="Next Room"
              className="absolute -right-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-white border border-gray-200 shadow-xl rounded-full flex items-center justify-center text-gray-800 hover:text-[#cda85c] hover:scale-110 transition-all z-20 cursor-pointer"
            >
              <ChevronRight size={22} />
            </button>
          </div>

        </div>
      </div>

      {/* Full Specs & Booking Modal */}
      {selectedRoom && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 sm:p-6 pt-32 sm:pt-40 pb-8 bg-gray-950/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
          <div className="bg-[#121417] border border-gray-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl text-white relative max-h-[75vh] overflow-y-auto my-auto sm:my-0">
            
            {/* Modal Header Image */}
            <div className="relative h-56 w-full">
              <img src={selectedRoom.image} alt={selectedRoom.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121417] via-transparent to-transparent" />
              <button 
                onClick={() => setSelectedRoom(null)}
                className="absolute top-4 right-4 w-9 h-9 bg-gray-900/80 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors border border-white/20 shadow-lg"
              >
                <X size={18} />
              </button>
              <div className="absolute bottom-4 left-6">
                <span className="text-[#cda85c] text-[11px] font-bold tracking-widest uppercase block mb-1">
                  SHIVLOK PALACE ACCOMMODATION
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">{selectedRoom.title}</h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Tariff & Occupancy Bar */}
              <div className="bg-[#181a1f] p-4 rounded-2xl border border-gray-800 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-gray-400 block">Room Tariff (Per Night)</span>
                  <span className="text-xl sm:text-2xl font-bold text-[#cda85c]">{selectedRoom.price}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-400 block">Standard Occupancy</span>
                  <span className="text-sm font-bold text-white">{selectedRoom.guests} ({selectedRoom.extra})</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-300 text-xs sm:text-sm font-light leading-relaxed">
                {selectedRoom.desc} All rooms at Shivlok Palace are maintained with strict daily housekeeping and sanitary standards.
              </p>

              {/* Amenities Grid */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#cda85c] mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> Included Room Facilities
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 bg-[#181a1f] p-4 rounded-2xl border border-gray-800/80">
                  {commonAmenities.map((item, idx) => (
                    <div key={idx} className="flex items-center text-xs text-gray-300">
                      <Check className="w-4 h-4 mr-2 text-emerald-500 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Policy Warning */}
              <div className="p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-200 text-xs flex items-center space-x-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <span>
                  <strong className="text-white font-semibold">Check-in Rules:</strong> Standard Check-in at 01:00 PM | Check-out at 11:00 AM. Valid Govt ID is mandatory. No Local ID accepted.
                </span>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/918470905123?text=${encodeURIComponent(`Hello Shivlok Palace, I want to check availability & reserve the ${selectedRoom.title} (${selectedRoom.price}). Please let me know available dates!`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center space-x-2 transition-colors shadow-lg text-xs sm:text-sm uppercase tracking-wider"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                  <span>Reserve via WhatsApp</span>
                </a>
                <a
                  href="tel:+918470905123"
                  className="sm:w-1/3 bg-[#cda85c] hover:bg-[#b89448] text-gray-950 font-bold py-3 px-6 rounded-xl flex items-center justify-center space-x-2 transition-colors shadow-lg text-xs sm:text-sm uppercase tracking-wider"
                >
                  <Phone className="w-4 h-4 fill-gray-950 text-[#cda85c]" />
                  <span>Call to Book</span>
                </a>
              </div>

            </div>

          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
};

export default Rooms;
