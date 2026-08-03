import React, { useState } from 'react';
import { Calendar, Users, X, MessageCircle, Mail, ShieldAlert, CheckCircle2, Sparkles, Clock } from 'lucide-react';

const BookingWidget = () => {
  // Set default check-in tomorrow, checkout +2 days
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextDay = new Date(today);
  nextDay.setDate(nextDay.getDate() + 2);

  const formatDate = (date) => date.toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(formatDate(tomorrow));
  const [checkOut, setCheckOut] = useState(formatDate(nextDay));
  const [roomType, setRoomType] = useState('Deluxe Room (₹3,200 + Taxes)');
  const [showModal, setShowModal] = useState(false);

  // Calculate number of nights
  const calculateNights = () => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 && !isNaN(diffDays) ? diffDays : 1;
  };

  const getPricePerNight = () => {
    if (roomType.includes('3,200')) return 3200;
    if (roomType.includes('4,500')) return 4500;
    if (roomType.includes('7,500')) return 7500;
    return 3200;
  };

  const nights = calculateNights();
  const totalTariff = nights * getPricePerNight();

  const handleCheckAvailability = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  return (
    <div id="booking" className="bg-white dark:bg-[#121417] rounded-2xl p-4 sm:p-6 shadow-2xl border border-gray-200 dark:border-gray-800 select-none relative z-40 transition-colors duration-300">
      <form onSubmit={handleCheckAvailability} className="flex flex-col lg:flex-row items-center gap-4">
        
        {/* Input Fields Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full flex-1">
          
          {/* Check In */}
          <div className="bg-[#FAF8F5] dark:bg-[#181a1f] p-3 sm:p-3.5 rounded-xl border border-gray-200/60 dark:border-gray-800 flex flex-col justify-center focus-within:border-[#cda85c] transition-colors">
            <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 mb-1 tracking-wider uppercase flex items-center gap-1">
              <Clock size={12} className="text-[#cda85c]" /> Check-In (From 01:00 PM)
            </label>
            <div className="flex items-center justify-between">
              <input 
                type="date" 
                required
                value={checkIn}
                min={formatDate(today)}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-transparent text-sm font-semibold text-gray-800 dark:text-gray-100 focus:outline-none cursor-pointer"
              />
              <Calendar size={18} className="text-[#cda85c] pointer-events-none ml-2 flex-shrink-0" />
            </div>
          </div>

          {/* Check Out */}
          <div className="bg-[#FAF8F5] dark:bg-[#181a1f] p-3 sm:p-3.5 rounded-xl border border-gray-200/60 dark:border-gray-800 flex flex-col justify-center focus-within:border-[#cda85c] transition-colors">
            <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 mb-1 tracking-wider uppercase flex items-center gap-1">
              <Clock size={12} className="text-[#cda85c]" /> Check-Out (Until 11:00 AM)
            </label>
            <div className="flex items-center justify-between">
              <input 
                type="date" 
                required
                value={checkOut}
                min={checkIn || formatDate(today)}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-transparent text-sm font-semibold text-gray-800 dark:text-gray-100 focus:outline-none cursor-pointer"
              />
              <Calendar size={18} className="text-[#cda85c] pointer-events-none ml-2 flex-shrink-0" />
            </div>
          </div>

          {/* Guests & Room Selection */}
          <div className="bg-[#FAF8F5] dark:bg-[#181a1f] p-3 sm:p-3.5 rounded-xl border border-gray-200/60 dark:border-gray-800 flex flex-col justify-center focus-within:border-[#cda85c] transition-colors">
            <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 mb-1 tracking-wider uppercase flex items-center gap-1">
              <Users size={12} className="text-[#cda85c]" /> Room Category & Tariff
            </label>
            <select 
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              className="w-full bg-transparent text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-100 focus:outline-none cursor-pointer py-0.5 truncate"
            >
              <option value="Deluxe Room (₹3,200 + Taxes)" className="bg-white dark:bg-[#181a1f] text-gray-900 dark:text-white">Deluxe Room (₹3,200 + Taxes) - 2 Adults</option>
              <option value="Premium Room (₹4,500 + Taxes)" className="bg-white dark:bg-[#181a1f] text-gray-900 dark:text-white">Premium Room (₹4,500 + Taxes) - 2 Adults</option>
              <option value="Family Suite (₹7,500 + Taxes)" className="bg-white dark:bg-[#181a1f] text-gray-900 dark:text-white">Family Suite (₹7,500 + Taxes) - 4 Adults</option>
            </select>
          </div>

        </div>

        {/* Submit Button */}
        <div className="w-full lg:w-auto">
          <button 
            type="submit"
            className="w-full lg:w-auto bg-[#121417] dark:bg-[#cda85c] hover:bg-black dark:hover:bg-[#b89448] text-[#cda85c] dark:text-gray-950 font-bold text-xs tracking-wider px-8 py-5 rounded-xl transition-all duration-300 shadow-xl uppercase whitespace-nowrap border border-[#cda85c]/40 flex items-center justify-center gap-2 cursor-pointer hover:scale-105"
          >
            <Sparkles size={15} className="text-[#cda85c] dark:text-gray-950 fill-current" />
            <span>CHECK AVAILABILITY & BOOK</span>
          </button>
        </div>

      </form>

      {/* Reservation Summary Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 sm:p-6 pt-32 sm:pt-40 pb-8 bg-gray-950/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
          <div className="bg-[#121417] border border-gray-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl text-white relative max-h-[75vh] overflow-y-auto my-auto sm:my-0">
            
            {/* Header */}
            <div className="flex justify-between items-start border-b border-gray-800 pb-4 mb-6">
              <div>
                <span className="text-xs font-bold text-[#cda85c] tracking-widest uppercase block mb-1">
                  INSTANT RESERVATION INQUIRY
                </span>
                <h3 className="text-2xl font-serif font-bold text-white">Shivlok Palace, Varanasi</h3>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-full bg-gray-800 hover:bg-red-600 flex items-center justify-center text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Selection Summary Card */}
            <div className="bg-[#181a1f] border border-gray-800 rounded-2xl p-5 mb-6 space-y-3.5 text-xs sm:text-sm">
              <div className="flex justify-between items-center border-b border-gray-800/60 pb-2.5">
                <span className="text-gray-400">Selected Room Category:</span>
                <span className="font-bold text-white text-right">{roomType.split(' - ')[0]}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-800/60 pb-2.5">
                <span className="text-gray-400">Stay Duration:</span>
                <span className="font-semibold text-emerald-400">{checkIn} ➔ {checkOut} ({nights} Night{nights > 1 ? 's' : ''})</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-800/60 pb-2.5">
                <span className="text-gray-400">Standard Occupancy:</span>
                <span className="font-semibold text-white">{roomType.includes('Family') ? '4 Adults' : '2 Adults'} (*Extra Guest Chargeable)</span>
              </div>
              <div className="flex justify-between items-center pt-1 text-base">
                <span className="text-gray-300 font-bold">Estimated Base Tariff:</span>
                <span className="font-extrabold text-xl text-[#cda85c]">₹{totalTariff.toLocaleString('en-IN')} + Taxes</span>
              </div>
            </div>

            {/* Mandatory Policy Reminders */}
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3.5 text-xs text-red-200 mb-6 space-y-1.5">
              <div className="font-bold flex items-center gap-1.5 text-red-300 uppercase tracking-wider text-[11px]">
                <ShieldAlert size={14} /> Mandatory Check-In Rules:
              </div>
              <p>🚫 <strong className="text-white">No Local ID:</strong> Local station IDs / Varanasi city residence IDs are not permitted.</p>
              <p>🪪 <strong className="text-white">Valid Govt ID Required:</strong> Mandatory for all guests upon arrival at reception.</p>
              <p>🕒 <strong className="text-white">Timings:</strong> Check-in from 01:00 PM | Check-out until 11:00 AM.</p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <a
                href={`https://wa.me/918470905123?text=${encodeURIComponent(
                  `Hello Shivlok Palace Team, I want to reserve:\n\n🏨 Room: ${roomType.split(' - ')[0]}\n📅 Check-In: ${checkIn} (From 01:00 PM)\n📅 Check-Out: ${checkOut} (Until 11:00 AM)\n🌙 Duration: ${nights} Night(s)\n👥 Occupancy: ${roomType.includes('Family') ? '4 Adults' : '2 Adults'}\n💰 Estimated Tariff: ₹${totalTariff.toLocaleString('en-IN')} + Taxes\n\nPlease confirm room availability and booking procedure!`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center space-x-2.5 transition-all shadow-lg text-xs sm:text-sm uppercase tracking-wider block"
              >
                <MessageCircle size={18} className="fill-white text-emerald-600 flex-shrink-0" />
                <span>Send Instant WhatsApp Reservation</span>
              </a>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href="tel:+918470905123"
                  className="bg-[#181a1f] hover:bg-[#202329] text-gray-200 border border-gray-700 font-bold py-2.5 px-4 rounded-xl flex items-center justify-center space-x-2 transition-colors text-xs uppercase tracking-wider"
                >
                  <span>Call Reservation Line</span>
                </a>
                <a
                  href={`mailto:shivlokpalace@gmail.com?subject=${encodeURIComponent(`Reservation Inquiry - ${roomType.split(' - ')[0]}`)}&body=${encodeURIComponent(
                    `Hello Shivlok Palace,\n\nI would like to book the ${roomType.split(' - ')[0]} from ${checkIn} to ${checkOut}.\n\nPlease let me know the confirmation details.\n\nThank you.`
                  )}`}
                  className="bg-[#181a1f] hover:bg-[#202329] text-gray-200 border border-gray-700 font-bold py-2.5 px-4 rounded-xl flex items-center justify-center space-x-2 transition-colors text-xs uppercase tracking-wider"
                >
                  <Mail size={14} className="text-[#cda85c]" />
                  <span>Email Inquiry</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default BookingWidget;
