import React, { useState, useRef } from 'react';
import { Calendar, Users, X, MessageCircle, Mail, ShieldAlert, CheckCircle2, Sparkles, Clock, User, Phone, FileText, Loader2 } from 'lucide-react';

const API_BASE = 'http://localhost:5000/api';

const ROOM_PRICES = {
  'Deluxe Room': 2500,
  'Premium Room': 3500,
  'Family Suite': 4500,
};

const BookingWidget = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextDay = new Date(today);
  nextDay.setDate(nextDay.getDate() + 2);

  const formatDate = (date) => date.toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(formatDate(tomorrow));
  const [checkOut, setCheckOut] = useState(formatDate(nextDay));
  const [roomType, setRoomType] = useState('Deluxe Room');
  const [showModal, setShowModal] = useState(false);

  // Refs to programmatically open native date pickers
  const checkInRef = useRef(null);
  const checkOutRef = useRef(null);

  // Booking form state
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [bookingResult, setBookingResult] = useState(null); // { ref, status, total, nights }
  const [bookingError, setBookingError] = useState('');

  const calculateNights = () => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 && !isNaN(diffDays) ? diffDays : 1;
  };

  const getPricePerNight = () => ROOM_PRICES[roomType] || 3200;
  const nights = calculateNights();
  const totalTariff = nights * getPricePerNight();

  const handleCheckAvailability = (e) => {
    e.preventDefault();
    setBookingResult(null);
    setBookingError('');
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setBookingResult(null);
    setBookingError('');
    setGuestName('');
    setGuestEmail('');
    setGuestPhone('');
    setSpecialRequests('');
  };

  const handleConfirmBooking = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setBookingError('');

    try {
      const res = await fetch(`${API_BASE}/booking`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: guestName,
          email: guestEmail,
          phone: guestPhone,
          checkIn,
          checkOut,
          roomType,
          guests: roomType === 'Family Suite' ? 4 : 2,
          specialRequests,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setBookingResult(data.data);
      } else {
        setBookingError(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setBookingError('Unable to connect to server. Please try WhatsApp or call us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  const roomLabel = `${roomType} (₹${getPricePerNight().toLocaleString('en-IN')} + Taxes)`;

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
                ref={checkInRef}
                type="date" 
                required
                value={checkIn}
                min={formatDate(today)}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-transparent text-sm font-semibold text-gray-800 dark:text-gray-100 focus:outline-none cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute"
              />
              <button
                type="button"
                onClick={() => checkInRef.current?.showPicker()}
                className="text-[#cda85c] ml-2 flex-shrink-0 hover:scale-110 transition-transform cursor-pointer"
                aria-label="Open check-in date picker"
              >
                <Calendar size={18} />
              </button>
            </div>
          </div>

          {/* Check Out */}
          <div className="bg-[#FAF8F5] dark:bg-[#181a1f] p-3 sm:p-3.5 rounded-xl border border-gray-200/60 dark:border-gray-800 flex flex-col justify-center focus-within:border-[#cda85c] transition-colors">
            <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 mb-1 tracking-wider uppercase flex items-center gap-1">
              <Clock size={12} className="text-[#cda85c]" /> Check-Out (Until 11:00 AM)
            </label>
            <div className="flex items-center justify-between">
              <input 
                ref={checkOutRef}
                type="date" 
                required
                value={checkOut}
                min={checkIn || formatDate(today)}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-transparent text-sm font-semibold text-gray-800 dark:text-gray-100 focus:outline-none cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute"
              />
              <button
                type="button"
                onClick={() => checkOutRef.current?.showPicker()}
                className="text-[#cda85c] ml-2 flex-shrink-0 hover:scale-110 transition-transform cursor-pointer"
                aria-label="Open check-out date picker"
              >
                <Calendar size={18} />
              </button>
            </div>
          </div>

          {/* Room Selection */}
          <div className="bg-[#FAF8F5] dark:bg-[#181a1f] p-3 sm:p-3.5 rounded-xl border border-gray-200/60 dark:border-gray-800 flex flex-col justify-center focus-within:border-[#cda85c] transition-colors">
            <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 mb-1 tracking-wider uppercase flex items-center gap-1">
              <Users size={12} className="text-[#cda85c]" /> Room Category & Tariff
            </label>
            <select 
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              className="w-full bg-transparent text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-100 focus:outline-none cursor-pointer py-0.5 truncate"
            >
              <option value="Deluxe Room" className="bg-white dark:bg-[#181a1f] text-gray-900 dark:text-white">Deluxe Room (₹2,500 + Taxes) - 2 Adults</option>
              <option value="Premium Room" className="bg-white dark:bg-[#181a1f] text-gray-900 dark:text-white">Premium Room (₹3,500 + Taxes) - 2 Adults</option>
              <option value="Family Suite" className="bg-white dark:bg-[#181a1f] text-gray-900 dark:text-white">Family Suite (₹4,500 + Taxes) - 4 Adults</option>
            </select>
          </div>

        </div>

        {/* Submit Button & WhatsApp Quick Note */}
        <div className="w-full lg:w-auto flex flex-col items-center gap-2">
          <button 
            type="submit"
            className="w-full lg:w-auto bg-[#121417] dark:bg-[#cda85c] hover:bg-black dark:hover:bg-[#b89448] text-[#cda85c] dark:text-gray-950 font-bold text-xs tracking-wider px-8 py-5 rounded-xl transition-all duration-300 shadow-xl uppercase whitespace-nowrap border border-[#cda85c]/40 flex items-center justify-center gap-2 cursor-pointer hover:scale-105"
          >
            <Sparkles size={15} className="text-[#cda85c] dark:text-gray-950 fill-current" />
            <span>BOOK YOUR STAY</span>
          </button>
          <a
            href="https://wa.me/918470905123?text=Hello%20Shivlok%20Palace%20Team%2C%20I%20would%20like%20to%20book%20a%20room.%20Please%20share%20availability%20and%20tariffs."
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold hover:underline flex items-center gap-1"
          >
            <MessageCircle size={11} className="fill-current" /> WhatsApp for Instant Booking
          </a>
        </div>

      </form>

      {/* Booking Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 sm:p-6 pt-20 sm:pt-32 pb-8 bg-gray-950/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
          <div className="bg-[#121417] border border-gray-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl text-white relative my-auto sm:my-0">
            
            {/* Header */}
            <div className="flex justify-between items-start border-b border-gray-800 pb-4 mb-6">
              <div>
                <span className="text-xs font-bold text-[#cda85c] tracking-widest uppercase block mb-1">
                  ROOM RESERVATION
                </span>
                <h3 className="text-2xl font-serif font-bold text-white">Shivlok Palace, Varanasi</h3>
              </div>
              <button 
                onClick={handleCloseModal}
                className="w-8 h-8 rounded-full bg-gray-800 hover:bg-red-600 flex items-center justify-center text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* ── STEP 1: Success State ── */}
            {bookingResult ? (
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-emerald-500/20 border-2 border-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} className="text-emerald-400" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Booking Request Sent!</h4>
                <p className="text-gray-400 text-sm mb-6">
                  Confirmation has been sent to your email. Our team will confirm within 2 hours.
                </p>

                {/* Booking Ref Card */}
                <div className="bg-[#181a1f] border-2 border-[#cda85c] rounded-2xl p-5 mb-5 text-left">
                  <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase text-center mb-2">YOUR BOOKING REFERENCE</p>
                  <p className="text-3xl font-extrabold text-[#cda85c] tracking-widest text-center mb-4">{bookingResult.bookingRef}</p>
                  <div className="space-y-2 text-sm border-t border-gray-800 pt-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Room:</span>
                      <span className="font-semibold text-white">{bookingResult.roomType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Duration:</span>
                      <span className="font-semibold text-emerald-400">{bookingResult.nights} Night{bookingResult.nights > 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Status:</span>
                      <span className="font-semibold text-yellow-400 capitalize">{bookingResult.status}</span>
                    </div>
                    <div className="flex justify-between pt-1 border-t border-gray-800">
                      <span className="text-gray-300 font-bold">Est. Total:</span>
                      <span className="font-extrabold text-lg text-[#cda85c]">₹{bookingResult.totalAmount?.toLocaleString('en-IN')} + Taxes</span>
                    </div>
                  </div>
                </div>

                {/* Quick contact buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="tel:+918470905123"
                    className="bg-[#181a1f] hover:bg-[#202329] text-gray-200 border border-gray-700 font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors text-xs uppercase tracking-wider"
                  >
                    Call Reception
                  </a>
                  <a
                    href={`https://wa.me/918470905123?text=${encodeURIComponent(`Hi! I just submitted a booking request. Reference: ${bookingResult.bookingRef}. Please confirm!`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors text-xs uppercase tracking-wider"
                  >
                    <MessageCircle size={14} className="fill-white text-emerald-600 flex-shrink-0" />
                    WhatsApp
                  </a>
                </div>
              </div>
            ) : (
              <>
                {/* ── STEP 2: Summary + Form ── */}

                {/* Stay Summary Card */}
                <div className="bg-[#181a1f] border border-gray-800 rounded-2xl p-5 mb-5 space-y-3 text-xs sm:text-sm">
                  <div className="flex justify-between items-center border-b border-gray-800/60 pb-2.5">
                    <span className="text-gray-400">Room Category:</span>
                    <span className="font-bold text-white text-right">{roomLabel}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-800/60 pb-2.5">
                    <span className="text-gray-400">Stay Duration:</span>
                    <span className="font-semibold text-emerald-400">{checkIn} ➔ {checkOut} ({nights} Night{nights > 1 ? 's' : ''})</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-800/60 pb-2.5">
                    <span className="text-gray-400">Occupancy:</span>
                    <span className="font-semibold text-white">{roomType === 'Family Suite' ? '4 Adults' : '2 Adults'} (*Extra Guest Chargeable)</span>
                  </div>
                  <div className="flex justify-between items-center pt-1 text-base">
                    <span className="text-gray-300 font-bold">Estimated Tariff:</span>
                    <span className="font-extrabold text-xl text-[#cda85c]">₹{totalTariff.toLocaleString('en-IN')} + Taxes</span>
                  </div>
                </div>

                {/* Mandatory Policy Reminders */}
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3.5 text-xs text-red-200 mb-5 space-y-1.5">
                  <div className="font-bold flex items-center gap-1.5 text-red-300 uppercase tracking-wider text-[11px]">
                    <ShieldAlert size={14} /> Mandatory Check-In Rules:
                  </div>
                  <p>🚫 <strong className="text-white">No Local ID:</strong> Local station IDs / Varanasi city residence IDs are not permitted.</p>
                  <p>🪪 <strong className="text-white">Valid Govt ID Required:</strong> Mandatory for all guests upon arrival at reception.</p>
                  <p>🕒 <strong className="text-white">Timings:</strong> Check-in from 01:00 PM | Check-out until 11:00 AM.</p>
                </div>

                {/* Guest Details Form */}
                <form onSubmit={handleConfirmBooking} className="space-y-3 mb-4">
                  <p className="text-[11px] font-bold text-gray-400 tracking-widest uppercase">Your Contact Details</p>
                  
                  <div className="relative">
                    <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#cda85c]" />
                    <input
                      type="text"
                      required
                      disabled={submitting}
                      placeholder="Full Name *"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 bg-[#181a1f] border border-gray-700 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#cda85c] transition-colors disabled:opacity-60"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative">
                      <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#cda85c]" />
                      <input
                        type="email"
                        required
                        disabled={submitting}
                        placeholder="Email *"
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 bg-[#181a1f] border border-gray-700 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#cda85c] transition-colors disabled:opacity-60"
                      />
                    </div>
                    <div className="relative">
                      <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#cda85c]" />
                      <input
                        type="tel"
                        required
                        disabled={submitting}
                        placeholder="Phone *"
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 bg-[#181a1f] border border-gray-700 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#cda85c] transition-colors disabled:opacity-60"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <FileText size={14} className="absolute left-3 top-3 text-[#cda85c]" />
                    <textarea
                      rows="2"
                      disabled={submitting}
                      placeholder="Special requests (optional)"
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 bg-[#181a1f] border border-gray-700 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#cda85c] transition-colors resize-none disabled:opacity-60"
                    />
                  </div>

                  {bookingError && (
                    <p className="text-red-400 text-xs font-semibold bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
                      {bookingError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[#cda85c] hover:bg-[#b89448] text-gray-950 font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2.5 transition-all shadow-lg text-sm uppercase tracking-wider disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <><Loader2 size={16} className="animate-spin" /> PROCESSING...</>
                    ) : (
                      <><Sparkles size={16} className="fill-gray-950" /> CONFIRM BOOKING REQUEST</>
                    )}
                  </button>
                </form>

                {/* WhatsApp Fallback */}
                <div className="border-t border-gray-800 pt-4">
                  <p className="text-[10px] text-gray-500 text-center mb-2.5 uppercase tracking-wider">Or book instantly via</p>
                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href={`https://wa.me/918470905123?text=${encodeURIComponent(
                        `Hello Shivlok Palace Team, I want to reserve:\n\n🏨 Room: ${roomType}\n📅 Check-In: ${checkIn} (From 01:00 PM)\n📅 Check-Out: ${checkOut} (Until 11:00 AM)\n🌙 Duration: ${nights} Night(s)\n💰 Estimated Tariff: ₹${totalTariff.toLocaleString('en-IN')} + Taxes\n\nPlease confirm room availability!`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors text-xs uppercase tracking-wider"
                    >
                      <MessageCircle size={14} className="fill-white text-emerald-600" />
                      WhatsApp
                    </a>
                    <a
                      href={`mailto:shivlokpalace.vns@gmail.com?subject=${encodeURIComponent(`Reservation Inquiry - ${roomType}`)}&body=${encodeURIComponent(`Hello Shivlok Palace,\n\nI would like to book the ${roomType} from ${checkIn} to ${checkOut}.\n\nPlease let me know the confirmation details.\n\nThank you.`)}`}
                      className="bg-[#181a1f] hover:bg-[#202329] text-gray-200 border border-gray-700 font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors text-xs uppercase tracking-wider"
                    >
                      <Mail size={14} className="text-[#cda85c]" />
                      Email
                    </a>
                  </div>
                </div>
              </>
            )}

          </div>
        </div>
      )}

    </div>
  );
};

export default BookingWidget;
