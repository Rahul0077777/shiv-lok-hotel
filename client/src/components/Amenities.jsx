import React, { useState } from 'react';
import { 
  Wifi, Utensils, ArrowUpSquare, Wind, Zap, Headphones, ShieldCheck, 
  Briefcase, Compass, Coffee, Shirt, Car, Ban, Users, Stethoscope, 
  Tv, Droplets, ShowerHead, Bath, Sparkles, Clock, Building2, 
  BedDouble, Phone, CheckCircle2, XCircle, AlertCircle, MapPin,
  ShieldAlert, Sparkle, HeartHandshake, Layers, Check
} from 'lucide-react';

const Amenities = () => {
  const [activeTab, setActiveTab] = useState('hotel'); // 'hotel' or 'room'

  const hotelFacilities = [
    { name: 'Free Wi-Fi', status: 'Included', category: 'Connectivity', icon: <Wifi className="w-6 h-6" />, desc: 'High-speed Fiber Internet across all rooms & public areas' },
    { name: 'Pure Veg Restaurant', status: 'Coming Soon', category: 'Dining', icon: <Utensils className="w-6 h-6" />, desc: 'Our in-house pure vegetarian restaurant is opening soon. Stay tuned for authentic Banarasi flavors!' },
    { name: 'Modern Lift / Elevator', status: 'Included', category: 'Accessibility', icon: <ArrowUpSquare className="w-6 h-6" />, desc: 'Smooth elevator connectivity to all guest room floors' },
    { name: 'Air Conditioning (AC)', status: 'Included', category: 'Comfort', icon: <Wind className="w-6 h-6" />, desc: 'Climate-controlled cooling throughout the entire property' },
    { name: '24x7 Power Backup', status: 'Included', category: 'Essential', icon: <Zap className="w-6 h-6" />, desc: 'Uninterrupted electricity backup with silent generators' },
    { name: '24-Hour Front Desk', status: 'Included', category: 'Service', icon: <Headphones className="w-6 h-6" />, desc: 'Round-the-clock reception, assistance & concierge service' },
    { name: 'CCTV & Security', status: 'Included', category: 'Safety', icon: <ShieldCheck className="w-6 h-6" />, desc: 'Full 24/7 security surveillance in public areas & corridors' },
    { name: 'Luggage Storage', status: 'Included', category: 'Service', icon: <Briefcase className="w-6 h-6" />, desc: 'Secure cloakroom service for early arrivals & late departures' },
    { name: 'Travel & Tour Desk', status: 'Included', category: 'Assistance', icon: <Compass className="w-6 h-6" />, desc: 'Custom assistance for Kashi Temple Darshan, Ganga Aarti & Boats' },
    { name: 'In-Room Dining', status: 'Included', category: 'Dining', icon: <Coffee className="w-6 h-6" />, desc: 'Prompt room service for tea, breakfast & evening meals' },
    { name: 'Laundry Service', status: 'Chargeable', category: 'Service', icon: <Shirt className="w-6 h-6" />, desc: 'Express washing, ironing, and professional dry cleaning' },
    { name: 'Nearby Paid Parking', status: 'Available', category: 'Parking', icon: <Car className="w-6 h-6" />, desc: 'Safe & guarded vehicle parking options located nearby' },
    { name: 'On-Site Hotel Parking', status: 'Not Available', category: 'Parking', icon: <Ban className="w-6 h-6" />, desc: 'In-campus vehicle parking is not available on site' },
    { name: 'Banquet Hall', status: 'Not Available', category: 'Events', icon: <Users className="w-6 h-6" />, desc: 'Property is dedicated purely to peaceful guest lodging' },
    { name: 'Conference Room', status: 'Not Available', category: 'Events', icon: <Building2 className="w-6 h-6" />, desc: 'Conference and corporate meeting rooms not available' },
    { name: 'Doctor on Call', status: 'On Request', category: 'Medical', icon: <Stethoscope className="w-6 h-6" />, desc: 'Emergency medical guidance & nearby hospital direction' }
  ];

  const roomFacilities = [
    { name: 'Air Conditioner (AC)', status: 'Included', category: 'Comfort', icon: <Wind className="w-5 h-5" /> },
    { name: 'LED Smart TV', status: 'Included', category: 'Entertainment', icon: <Tv className="w-5 h-5" /> },
    { name: 'High-Speed Wi-Fi', status: 'Included', category: 'Connectivity', icon: <Wifi className="w-5 h-5" /> },
    { name: 'Mineral Water Bottle', status: 'Included', category: 'Refreshment', icon: <Droplets className="w-5 h-5" /> },
    { name: 'Tea & Coffee Maker', status: 'Included', category: 'Refreshment', icon: <Coffee className="w-5 h-5" /> },
    { name: 'Electric Kettle', status: 'Included', category: 'Refreshment', icon: <Coffee className="w-5 h-5" /> },
    { name: 'Attached Western Bath', status: 'Included', category: 'Sanitation', icon: <ShowerHead className="w-5 h-5" /> },
    { name: 'Hot & Cold Water', status: '24 Hours', category: 'Sanitation', icon: <Bath className="w-5 h-5" /> },
    { name: 'Premium Toiletries', status: 'Included', category: 'Sanitation', icon: <Sparkles className="w-5 h-5" /> },
    { name: 'Soft Bath Towels', status: 'Included', category: 'Sanitation', icon: <Layers className="w-5 h-5" /> },
    { name: 'Hand Towels', status: 'Included', category: 'Sanitation', icon: <Layers className="w-5 h-5" /> },
    { name: 'Spacious Wardrobe', status: 'Included', category: 'Furniture', icon: <Building2 className="w-5 h-5" /> },
    { name: 'Work Desk & Chair', status: 'Included', category: 'Furniture', icon: <Briefcase className="w-5 h-5" /> },
    { name: 'Intercom Telephone', status: 'Included', category: 'Communication', icon: <Phone className="w-5 h-5" /> },
    { name: '24x7 Room Service', status: 'Included', category: 'Service', icon: <Headphones className="w-5 h-5" /> },
    { name: 'Daily Housekeeping', status: 'Included', category: 'Service', icon: <Sparkle className="w-5 h-5" /> },
    { name: 'Fresh Bed Linen', status: 'Included', category: 'Bedding', icon: <BedDouble className="w-5 h-5" /> },
    { name: 'Comfy Room Slippers', status: 'Included', category: 'Comfort', icon: <Sparkles className="w-5 h-5" /> },
    { name: 'Sanitized Bucket & Mug', status: 'Included', category: 'Sanitation', icon: <Droplets className="w-5 h-5" /> },
    { name: 'Covered Dustbin', status: 'Included', category: 'Hygiene', icon: <CheckCircle2 className="w-5 h-5" /> },
    { name: 'Power Backup Outlet', status: 'Included', category: 'Essential', icon: <Zap className="w-5 h-5" /> },
    { name: 'Wake-Up Call Service', status: 'Available', category: 'Service', icon: <Clock className="w-5 h-5" /> },
    { name: 'Extra Pillow & Blanket', status: 'On Request', category: 'Bedding', icon: <BedDouble className="w-5 h-5" /> },
    { name: 'Iron & Ironing Board', status: 'On Request', category: 'Service', icon: <Shirt className="w-5 h-5" /> },
    { name: 'Hair Dryer', status: 'On Request', category: 'Grooming', icon: <Wind className="w-5 h-5" /> },
    { name: 'Dental Kit', status: 'On Request', category: 'Grooming', icon: <Sparkles className="w-5 h-5" /> },
    { name: 'Shaving Kit', status: 'On Request', category: 'Grooming', icon: <Sparkles className="w-5 h-5" /> },
    { name: 'Dry Cleaning Service', status: 'Chargeable', category: 'Service', icon: <Shirt className="w-5 h-5" /> }
  ];

  const renderBadge = (status) => {
    switch (status) {
      case 'Included':
      case 'Yes':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 whitespace-nowrap">
            <CheckCircle2 className="w-3 h-3 flex-shrink-0" /> Included
          </span>
        );
      case '24 Hours':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-sky-500/10 text-sky-700 dark:text-sky-400 border border-sky-500/30 whitespace-nowrap">
            <Clock className="w-3 h-3 flex-shrink-0" /> 24 Hours
          </span>
        );
      case 'Available':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/30 whitespace-nowrap">
            <Sparkles className="w-3 h-3 flex-shrink-0" /> Available
          </span>
        );
      case 'On Request':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/30 whitespace-nowrap">
            <AlertCircle className="w-3 h-3 text-amber-600 flex-shrink-0" /> On Request
          </span>
        );
      case 'Chargeable':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-purple-500/10 text-purple-800 dark:text-purple-300 border border-purple-500/30 whitespace-nowrap">
            <ShieldAlert className="w-3 h-3 text-purple-600 flex-shrink-0" /> Chargeable
          </span>
        );
      case 'Coming Soon':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/30 whitespace-nowrap">
            🍽️ Coming Soon
          </span>
        );
      case 'Not Available':
      case 'No':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-500/30 whitespace-nowrap">
            <XCircle className="w-3 h-3 text-rose-500 flex-shrink-0" /> N/A
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div id="amenities" className="bg-[#FAF8F5] dark:bg-[#0f1114] text-gray-900 dark:text-white py-20 border-b border-gray-200 dark:border-gray-800/80 transition-colors duration-300 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 border-b-2 border-[#cda85c] pb-1 mb-3">
            <Sparkles className="w-4 h-4 text-[#cda85c]" />
            <span className="text-[#cda85c] text-[11px] font-extrabold tracking-[0.2em] uppercase">
              VERIFIED HOTEL SPECS
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-gray-900 dark:text-white leading-tight mb-4 transition-colors">
            Facilities & Room Amenities
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm font-light leading-relaxed max-w-2xl mx-auto transition-colors">
            Experience complete transparency. Browse through our 100% verified directory of property facilities and in-room luxury appointments.
          </p>
        </div>

        {/* Floating Glassmorphic Tab Switcher */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <div className="bg-white/80 dark:bg-[#181a1f]/90 backdrop-blur-md p-1.5 sm:p-2 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl flex flex-col sm:flex-row w-full sm:w-auto space-y-2 sm:space-y-0 sm:space-x-2 transition-all">
            <button
              onClick={() => setActiveTab('hotel')}
              className={`flex items-center justify-center space-x-2.5 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeTab === 'hotel' 
                  ? 'bg-gradient-to-r from-[#cda85c] to-[#b89448] text-gray-950 shadow-lg scale-[1.02]' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'
              }`}
            >
              <Building2 className="w-4 h-4 flex-shrink-0" />
              <span>General Facilities ({hotelFacilities.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('room')}
              className={`flex items-center justify-center space-x-2.5 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeTab === 'room' 
                  ? 'bg-gradient-to-r from-[#cda85c] to-[#b89448] text-gray-950 shadow-lg scale-[1.02]' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'
              }`}
            >
              <BedDouble className="w-4 h-4 flex-shrink-0" />
              <span>In-Room Amenities ({roomFacilities.length})</span>
            </button>
          </div>
        </div>

        {/* TAB 1: General Hotel Facilities */}
        {activeTab === 'hotel' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 animate-fadeIn">
            {hotelFacilities.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-white dark:bg-[#181a1f] rounded-xl p-3 sm:p-4 border border-gray-200/80 dark:border-gray-800 shadow-sm hover:shadow-xl hover:border-[#cda85c]/60 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Icon */}
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-amber-500/10 text-[#cda85c] flex items-center justify-center group-hover:bg-[#cda85c] group-hover:text-gray-950 transition-all duration-300 shadow-sm flex-shrink-0 mb-2 sm:mb-3">
                    {React.cloneElement(item.icon, { className: 'w-4 h-4' })}
                  </div>

                  {/* Category & Title */}
                  <span className="text-[8px] sm:text-[9px] font-extrabold text-[#cda85c] uppercase tracking-widest block mb-0.5">
                    {item.category}
                  </span>
                  <h3 className="text-xs sm:text-sm font-serif font-bold text-gray-900 dark:text-white group-hover:text-[#cda85c] transition-colors leading-snug">
                    {item.name}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 text-[10px] sm:text-[11px] font-light mt-1 leading-relaxed transition-colors line-clamp-3 sm:line-clamp-none">
                    {item.desc}
                  </p>

                  {/* Badge below description — never overlaps */}
                  <div className="mt-2">
                    {renderBadge(item.status)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: In-Room Facilities */}
        {activeTab === 'room' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 animate-fadeIn">
            {roomFacilities.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-white dark:bg-[#181a1f] rounded-2xl px-4 py-3 sm:p-5 border border-gray-200/80 dark:border-gray-800 shadow-sm hover:shadow-xl hover:border-[#cda85c]/60 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-between gap-3 group"
              >
                {/* Left: icon + category + name */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-[#cda85c] flex items-center justify-center flex-shrink-0 group-hover:bg-[#cda85c] group-hover:text-gray-950 transition-colors">
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <span className="text-[9px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest block leading-none mb-0.5">
                      {item.category}
                    </span>
                    <h3 className="text-xs font-bold text-gray-900 dark:text-white leading-tight group-hover:text-[#cda85c] transition-colors truncate">
                      {item.name}
                    </h3>
                  </div>
                </div>

                {/* Right: badge — flex-shrink-0 so it never gets squeezed */}
                <div className="flex-shrink-0">
                  {renderBadge(item.status)}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* High-End Bottom Banner */}
        <div className="mt-14 bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 text-white rounded-3xl p-8 sm:p-10 border border-[#cda85c]/30 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-[#cda85c]/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 max-w-2xl">
            <div className="flex items-center space-x-2 text-[#cda85c] mb-2 font-bold text-xs uppercase tracking-widest">
              <MapPin size={16} />
              <span>Unbeatable Central Location</span>
            </div>
            <h4 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
              Just 500 Meters from Kashi Vishwanath & Ghats
            </h4>
            <p className="text-gray-300 text-xs sm:text-sm font-light leading-relaxed">
              Situated right at Ganesh Mahal Road near Godowlia Chauraha, offering 24/7 access to holy Darshan, Ganga Aarti, and local Varanasi street food.
            </p>
          </div>

          <a
            href="#rooms"
            className="relative z-10 whitespace-nowrap bg-gradient-to-r from-[#cda85c] to-[#b89448] hover:from-[#b89448] hover:to-[#a37e38] text-gray-950 font-extrabold px-8 py-4 rounded-2xl text-xs uppercase tracking-wider transition-all duration-300 shadow-xl hover:scale-105"
          >
            Explore Rooms & Book
          </a>
        </div>

      </div>
    </div>
  );
};

export default Amenities;
