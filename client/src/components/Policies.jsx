import React from 'react';
import { 
  ShieldX, FileCheck, UserPlus, Clock, LogIn, LogOut, 
  ShieldAlert, Headphones, CheckCircle2, AlertCircle, PhoneCall, Sparkles 
} from 'lucide-react';

const Policies = () => {
  const policyItems = [
    {
      icon: <ShieldX className="w-5 h-5 text-rose-600 dark:text-rose-400" />,
      iconBg: "bg-rose-500/10 border-rose-500/20",
      title: "Local ID Accepted",
      status: "🚫 NOT PERMITTED",
      badgeClass: "bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/30",
      description: "Guests residing within local Varanasi city municipal boundaries or carrying local city IDs are not permitted for check-in."
    },
    {
      icon: <FileCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      iconBg: "bg-emerald-500/10 border-emerald-500/20",
      title: "Valid Govt ID Required",
      status: "✅ MANDATORY",
      badgeClass: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
      description: "Original physical Aadhaar Card, Passport, Voter ID, or Driving License is strictly required for all checking-in guests upon arrival."
    },
    {
      icon: <UserPlus className="w-5 h-5 text-amber-600 dark:text-[#cda85c]" />,
      iconBg: "bg-amber-500/10 border-amber-500/20",
      title: "Extra Guest Policy",
      status: "⚡ CHARGEABLE",
      badgeClass: "bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-500/30",
      description: "Any additional guest exceeding standard room occupancy (2 Adults in Deluxe/Premium, 4 in Suite) incurs extra guest charges."
    },
    {
      icon: <LogIn className="w-5 h-5 text-sky-600 dark:text-sky-400" />,
      iconBg: "bg-sky-500/10 border-sky-500/20",
      title: "Check-In Timing",
      status: "🕒 01:00 PM",
      badgeClass: "bg-sky-500/10 text-sky-700 dark:text-sky-400 border-sky-500/30",
      description: "Standard Check-in begins at 1:00 PM. Early check-in requests are strictly subject to room availability and hotel policy."
    },
    {
      icon: <LogOut className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
      iconBg: "bg-purple-500/10 border-purple-500/20",
      title: "Check-Out Timing",
      status: "🕛 11:00 AM",
      badgeClass: "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/30",
      description: "Standard check-out is strictly by 11:00 AM. Late check-out requests must be communicated in advance to the reception team."
    }
  ];

  return (
    <div id="policies" className="bg-[#FAF8F5] dark:bg-[#121417] text-gray-900 dark:text-white py-20 border-t border-b border-gray-200 dark:border-gray-800 transition-colors duration-300 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 border-b-2 border-[#cda85c] pb-1 mb-3">
            <Sparkles className="w-4 h-4 text-[#cda85c]" />
            <span className="text-[#cda85c] text-[11px] font-extrabold tracking-[0.2em] uppercase">
              HOUSE RULES & GUIDELINES
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-gray-900 dark:text-white leading-tight mb-4 transition-colors">
            Hotel Policies & Check-In Rules
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm font-light leading-relaxed max-w-2xl mx-auto transition-colors">
            To ensure a safe, peaceful, and harmonious stay for all our honored guests at Shivlok Palace, please review our check-in guidelines prior to arrival.
          </p>
        </div>

        {/* Policies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {policyItems.map((item, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-[#181a1f] rounded-2xl p-6 border border-gray-200/80 dark:border-gray-800 shadow-sm hover:shadow-2xl hover:border-[#cda85c]/60 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Header Row with Icon & Micro Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${item.iconBg} shadow-sm group-hover:scale-110 transition-transform`}>
                    {item.icon}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[11px] font-extrabold tracking-wider border ${item.badgeClass}`}>
                    {item.status}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-serif font-bold text-gray-900 dark:text-white group-hover:text-[#cda85c] transition-colors mb-2">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 text-xs font-light leading-relaxed transition-colors">
                  {item.description}
                </p>
              </div>
            </div>
          ))}

          {/* Standout 24x7 Front Desk Assistance Card */}
          <div className="bg-gradient-to-br from-stone-900 via-stone-850 to-stone-900 text-white rounded-2xl p-6 border border-[#cda85c]/40 shadow-2xl flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-[#cda85c]/10 rounded-full blur-2xl pointer-events-none"></div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-[#cda85c]/20 text-[#cda85c] flex items-center justify-center border border-[#cda85c]/40 shadow-sm">
                  <Headphones className="w-5 h-5" />
                </div>
                <span className="px-3 py-1 rounded-full text-[10px] font-extrabold tracking-widest uppercase bg-[#cda85c]/20 text-[#cda85c] border border-[#cda85c]/40">
                  24X7 HELP DESK
                </span>
              </div>

              <h3 className="text-lg font-serif font-bold text-white mb-2">
                Need Special Assistance?
              </h3>
              <p className="text-gray-300 text-xs font-light leading-relaxed mb-4">
                Our Front Desk & Travel Desk are at your service 24x7. For late check-in notice, temple Darshan guidance, or luggage storage, contact us directly.
              </p>
            </div>

            <a 
              href="tel:+918470905123" 
              className="w-full text-center bg-gradient-to-r from-[#cda85c] to-[#b89448] hover:from-[#b89448] hover:to-[#a37e38] text-gray-950 font-extrabold py-3 rounded-xl text-xs tracking-wider uppercase transition-all shadow-lg hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <PhoneCall size={14} />
              <span>Contact Front Desk</span>
            </a>
          </div>

        </div>

        {/* Bottom Disclaimer Banner */}
        <div className="mt-10 p-4 sm:p-5 bg-amber-500/10 dark:bg-amber-500/5 rounded-2xl border border-amber-500/30 flex items-center justify-center text-center shadow-sm transition-colors max-w-4xl mx-auto">
          <p className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed font-medium">
            <span className="font-bold text-[#cda85c]">Mandatory Police Requirement:</span> All arriving guests must present original physical government IDs at reception during check-in as per Varanasi city police regulations.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Policies;
