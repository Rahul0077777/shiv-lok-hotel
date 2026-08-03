import React, { useState } from 'react';
import { MessageCircle, Phone, Calendar, X, Sparkles } from 'lucide-react';

const FloatingActions = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {/* Mobile Fixed Bottom Action Bar (visible on < sm screens) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#121417]/98 backdrop-blur-xl border-t border-[#cda85c]/40 px-3 py-2 flex items-center justify-around gap-2 shadow-[0_-5px_25px_rgba(0,0,0,0.5)]">
        <a
          href="https://wa.me/918470905123?text=Hello%20Shivlok%20Palace%20Team%2C%20I%20would%20like%20to%20inquire%20about%20room%20availability%20and%20tariffs."
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center space-x-1.5 py-2.5 px-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-md transition-all active:scale-95"
        >
          <MessageCircle size={15} className="fill-current" />
          <span>WhatsApp</span>
        </a>

        <a
          href="tel:+918470905123"
          className="flex-1 flex items-center justify-center space-x-1.5 py-2.5 px-2 bg-amber-500 hover:bg-amber-600 text-stone-950 rounded-xl font-bold text-xs shadow-md transition-all active:scale-95"
        >
          <Phone size={15} />
          <span>Call Now</span>
        </a>

        <a
          href="#booking"
          className="flex-1 flex items-center justify-center space-x-1.5 py-2.5 px-2 bg-gradient-to-r from-[#cda85c] to-[#b89448] text-stone-950 rounded-xl font-bold text-xs shadow-md transition-all active:scale-95"
        >
          <Calendar size={15} />
          <span>Book Stay</span>
        </a>
      </div>

      {/* Desktop/Tablet Floating Action Pill (visible on sm+ screens) */}
      <div className="hidden sm:flex fixed bottom-6 right-6 z-50 flex-col items-end space-y-2.5 select-none animate-fadeIn">
        {isOpen ? (
          <div className="bg-[#121417]/95 backdrop-blur-xl border border-[#cda85c]/50 rounded-3xl p-3 shadow-2xl flex flex-col space-y-2.5 min-w-[170px] hover:border-[#cda85c] transition-all">
            
            {/* Header & Close Toggle */}
            <div className="flex items-center justify-between px-2 pt-1 pb-1.5 border-b border-gray-800/80">
              <span className="text-[10px] font-extrabold text-[#cda85c] uppercase tracking-widest flex items-center gap-1">
                <Sparkles size={11} className="text-[#cda85c]" /> QUICK CONTACT
              </span>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white p-0.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Minimize Menu"
              >
                <X size={14} />
              </button>
            </div>

            {/* WhatsApp Direct */}
            <a
              href="https://wa.me/918470905123?text=Hello%20Shivlok%20Palace%20Team%2C%20I%20would%20like%20to%20inquire%20about%20room%20availability%20and%20tariffs."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 p-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-all duration-300 group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/40 group-hover:scale-110 transition-transform">
                <MessageCircle size={18} className="fill-current" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">WhatsApp</span>
                <span className="text-[9px] text-gray-400 font-medium">Instant Response</span>
              </div>
            </a>

            {/* Call Desk */}
            <a
              href="tel:+918470905123"
              className="flex items-center space-x-3 p-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition-all duration-300 group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center shadow-md shadow-amber-500/40 group-hover:scale-110 transition-transform font-bold">
                <Phone size={15} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors">Call Reception</span>
                <span className="text-[9px] text-gray-400 font-medium">+91 8470905123</span>
              </div>
            </a>

            {/* Book Room */}
            <a
              href="#booking"
              className="flex items-center space-x-3 p-2 rounded-xl bg-[#cda85c]/10 hover:bg-[#cda85c]/20 border border-[#cda85c]/30 transition-all duration-300 group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#cda85c] to-[#b89448] text-stone-950 flex items-center justify-center shadow-md shadow-[#cda85c]/40 group-hover:scale-110 transition-transform font-bold">
                <Calendar size={15} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white group-hover:text-[#cda85c] transition-colors">Book Stay</span>
                <span className="text-[9px] text-gray-400 font-medium">Check Rates</span>
              </div>
            </a>

          </div>
        ) : (
          /* Minimized Trigger Button */
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Expand Quick Action Menu"
            className="w-13 h-13 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-2xl flex items-center justify-center hover:scale-110 transition-all cursor-pointer border-2 border-white/30 relative group"
          >
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full animate-ping"></span>
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-stone-900"></span>
            <MessageCircle size={24} className="fill-current" />
          </button>
        )}
      </div>
    </>
  );
};

export default FloatingActions;
