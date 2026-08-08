import React, { useState } from 'react';
import { Check, Play, X, User, Mail, Phone, Calendar, Clock, Users, Sparkles, ChevronDown, Loader2, CheckCircle2, UtensilsCrossed, Leaf } from 'lucide-react';

const API_BASE = 'http://localhost:5000/api';

const TIME_SLOTS = [
  { label: 'Breakfast', slots: ['07:00 AM', '07:30 AM', '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM'] },
  { label: 'Lunch', slots: ['12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM'] },
  { label: 'Dinner', slots: ['07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM', '09:00 PM', '09:30 PM', '10:00 PM'] },
];

// ── Full restaurant menu data ──────────────────────────────────────────────────
const MENU_DATA = [
  {
    category: 'Breakfast Buffet',
    emoji: '🌅',
    desc: 'Served 7:00 AM – 10:30 AM',
    items: [
      { name: 'Poha', desc: 'Flattened rice with mustard, curry leaves & peanuts', price: 80, tag: 'bestseller' },
      { name: 'Aloo Paratha', desc: 'Whole wheat flatbread stuffed with spiced potato', price: 100, tag: '' },
      { name: 'Idli Sambhar', desc: 'Steamed rice cakes with lentil soup & coconut chutney', price: 90, tag: '' },
      { name: 'Upma', desc: 'Semolina porridge with vegetables & cashews', price: 80, tag: '' },
      { name: 'Bread Toast & Jam', desc: 'Toasted brown / white bread with butter & seasonal jam', price: 70, tag: '' },
      { name: 'Fresh Fruit Platter', desc: 'Seasonal fruits — papaya, banana, watermelon & more', price: 120, tag: 'healthy' },
      { name: 'Cornflakes & Milk', desc: 'Choice of warm or cold milk with cornflakes', price: 90, tag: '' },
      { name: 'Masala Chai', desc: 'Freshly brewed spiced Indian tea with ginger & cardamom', price: 40, tag: 'bestseller' },
      { name: 'Filter Coffee', desc: 'South Indian style filter coffee — strong & aromatic', price: 50, tag: '' },
      { name: 'Fresh Juice', desc: 'Choice of orange, sweet lime, or pomegranate', price: 80, tag: '' },
    ],
  },
  {
    category: 'Soups & Starters',
    emoji: '🍲',
    desc: 'Light beginnings',
    items: [
      { name: 'Tomato Shorba', desc: 'Velvety tomato broth with Indian spices & cream swirl', price: 120, tag: 'bestseller' },
      { name: 'Dal Shorba', desc: 'Silky yellow lentil soup with cumin & ghee tempering', price: 110, tag: '' },
      { name: 'Sweet Corn Soup', desc: 'Classic creamy corn soup — mild & comforting', price: 110, tag: '' },
      { name: 'Veg Spring Rolls', desc: 'Crispy rolls stuffed with spiced cabbage, carrots & glass noodles', price: 160, tag: '' },
      { name: 'Paneer Tikka', desc: 'Smoky cottage cheese cubes marinated in tandoori spices', price: 220, tag: 'bestseller' },
      { name: 'Hara Bhara Kabab', desc: 'Spinach & green pea patties with mint chutney', price: 180, tag: 'healthy' },
      { name: 'Aloo Tikki Chaat', desc: 'Crispy potato patties with chutneys, yogurt & sev', price: 150, tag: 'local' },
      { name: 'Samosa (2 pcs)', desc: 'Golden pastry with spiced potato filling — served with chutney', price: 80, tag: 'local' },
    ],
  },
  {
    category: 'Main Course',
    emoji: '🍛',
    desc: 'Heart of the meal',
    items: [
      { name: 'Dal Makhani', desc: 'Slow-cooked black lentils in a rich buttery tomato gravy', price: 250, tag: 'bestseller' },
      { name: 'Paneer Butter Masala', desc: 'Cottage cheese in silky cashew-tomato sauce', price: 280, tag: 'bestseller' },
      { name: 'Palak Paneer', desc: 'Fresh spinach gravy with soft paneer cubes', price: 260, tag: 'healthy' },
      { name: 'Shahi Paneer', desc: 'Royal saffron-cream gravy with paneer — festive & rich', price: 290, tag: '' },
      { name: 'Kadai Paneer', desc: 'Spiced wok-tossed paneer with capsicum & tomato', price: 270, tag: '' },
      { name: 'Chana Masala', desc: 'Chickpeas in tangy onion-tomato gravy — Punjabi style', price: 220, tag: 'healthy' },
      { name: 'Mix Vegetable', desc: 'Seasonal vegetables in a mildly spiced curry', price: 200, tag: '' },
      { name: 'Aloo Gobi', desc: 'Dry-cooked potato and cauliflower with turmeric & cumin', price: 190, tag: 'local' },
      { name: 'Baingan Bharta', desc: 'Smoky roasted eggplant mash with onion & spices', price: 200, tag: 'local' },
      { name: 'Veg Kofta Curry', desc: 'Soft vegetable dumplings in rich Mughlai gravy', price: 250, tag: '' },
    ],
  },
  {
    category: 'Breads & Rice',
    emoji: '🫓',
    desc: 'Freshly prepared from the tandoor',
    items: [
      { name: 'Tandoori Roti', desc: 'Whole wheat bread baked in clay oven', price: 40, tag: '' },
      { name: 'Butter Naan', desc: 'Soft leavened bread brushed with butter', price: 60, tag: 'bestseller' },
      { name: 'Garlic Naan', desc: 'Naan topped with garlic & fresh coriander', price: 70, tag: 'bestseller' },
      { name: 'Laccha Paratha', desc: 'Multi-layered flaky whole wheat paratha', price: 70, tag: '' },
      { name: 'Missi Roti', desc: 'Gram flour flatbread with carom seeds — high protein', price: 50, tag: 'healthy' },
      { name: 'Steamed Basmati Rice', desc: 'Long-grain aged basmati — light & fragrant', price: 150, tag: '' },
      { name: 'Jeera Rice', desc: 'Basmati rice tempered with cumin & ghee', price: 170, tag: '' },
      { name: 'Veg Biryani', desc: 'Fragrant basmati with vegetables & whole spices — served with raita', price: 280, tag: 'bestseller' },
      { name: 'Veg Fried Rice', desc: 'Indo-Chinese style fried rice with vegetables & soy', price: 220, tag: '' },
    ],
  },
  {
    category: 'Desserts',
    emoji: '🍮',
    desc: 'Sweet endings from our kitchen',
    items: [
      { name: 'Gulab Jamun', desc: 'Soft milk-solid dumplings soaked in rose & cardamom syrup', price: 120, tag: 'bestseller' },
      { name: 'Rasgulla', desc: 'Spongy cottage cheese balls in light sugar syrup', price: 110, tag: '' },
      { name: 'Gajar Halwa', desc: 'Slow-cooked carrot pudding with milk, ghee & dry fruits', price: 140, tag: 'local' },
      { name: 'Kheer', desc: 'Creamy rice pudding with saffron, cardamom & pistachios', price: 130, tag: 'bestseller' },
      { name: 'Malpua', desc: 'Traditional Varanasi sweet pancake in saffron sugar syrup', price: 140, tag: 'local' },
      { name: 'Ice Cream (2 scoops)', desc: 'Choice of vanilla, mango, rose or kesar-pista', price: 150, tag: '' },
    ],
  },
  {
    category: 'Beverages',
    emoji: '🥤',
    desc: 'Refreshing drinks',
    items: [
      { name: 'Masala Lassi', desc: 'Chilled yogurt drink with cumin & black salt', price: 90, tag: 'bestseller' },
      { name: 'Sweet Lassi', desc: 'Chilled sweet yogurt drink with rose water', price: 80, tag: '' },
      { name: 'Mango Lassi', desc: 'Thick yogurt blended with Alphonso mango pulp', price: 120, tag: 'bestseller' },
      { name: 'Chaas (Buttermilk)', desc: 'Salted & spiced thin buttermilk — a digestive classic', price: 60, tag: 'healthy' },
      { name: 'Fresh Lime Soda', desc: 'Sweet / salted lime soda — perfectly chilled', price: 80, tag: '' },
      { name: 'Thandai', desc: 'Chilled milk with almonds, rose petals & spices — Banaras special', price: 130, tag: 'local' },
      { name: 'Cold Coffee', desc: 'Blended iced coffee with milk & sugar', price: 110, tag: '' },
      { name: 'Mineral Water (1L)', desc: 'Packaged drinking water', price: 30, tag: '' },
    ],
  },
];

const Restaurant = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [showReserveModal, setShowReserveModal] = useState(false);
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [activeMenuTab, setActiveMenuTab] = useState(0);

  // Form state
  const today = new Date().toISOString().split('T')[0];
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    occasion: 'none',
    seatingPreference: 'any',
    specialRequests: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null); // { reservationRef, date, time, guests }
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch(`${API_BASE}/table-reservation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, guests: parseInt(form.guests) }),
      });

      const data = await res.json();

      if (data.success) {
        setResult(data.data);
      } else {
        setError(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Unable to connect to server. Please call us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setShowReserveModal(false);
    setResult(null);
    setError('');
    setForm({ name: '', email: '', phone: '', date: '', time: '', guests: '2', occasion: 'none', seatingPreference: 'any', specialRequests: '' });
  };

  return (
    <div id="restaurant" className="bg-[#F5F2ED] dark:bg-[#181412] text-gray-900 dark:text-white py-16 md:py-20 overflow-hidden border-t border-b border-gray-200 dark:border-gray-900 transition-colors duration-300 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Left Text Block (4 cols) */}
          <div className="lg:col-span-4 pr-0 lg:pr-4">
            <p className="text-[#cda85c] text-[11px] font-bold tracking-[0.2em] uppercase mb-3">
              PURE VEG RESTAURANT · COMING SOON
            </p>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-gray-900 dark:text-white leading-tight mb-4 transition-colors">
              Our Restaurant<br />
              <span className="text-[#cda85c] italic">Opening Soon</span>
            </h2>
            
            <p className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm leading-relaxed mb-6 font-light transition-colors">
              Our in-house pure vegetarian restaurant is coming soon. Look forward to a delightful dining experience with authentic Indian flavours, local Banarasi specialties, and warm hospitality — right at Shivlok Palace.
            </p>

            {/* Checkmarks Grid */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {['100% Pure Veg', 'Banarasi Specialties', 'Multi-cuisine Menu', 'Rooftop Dining'].map((item) => (
                <div key={item} className="flex items-center space-x-2 text-xs text-gray-800 dark:text-gray-200 font-semibold dark:font-medium">
                  <Check size={16} className="text-[#cda85c] flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Coming Soon Notice */}
            <div className="mb-5 p-3.5 bg-amber-50 dark:bg-amber-900/20 border border-amber-300 dark:border-amber-700/50 rounded-xl flex items-start gap-2.5">
              <span className="text-amber-600 dark:text-amber-400 text-lg leading-none">🍽️</span>
              <div>
                <p className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wide mb-0.5">Opening Soon</p>
                <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">Our restaurant is not yet operational. Register your interest via WhatsApp and we'll notify you on launch!</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => { setShowMenuModal(true); setActiveMenuTab(0); }}
                className="bg-[#cda85c] hover:bg-[#b89448] text-gray-950 font-bold text-xs px-6 py-3 rounded-xl transition-all duration-300 tracking-wider uppercase shadow-lg cursor-pointer">
                PREVIEW MENU
              </button>
              <a
                href="https://wa.me/918470905123?text=Hello%20Shivlok%20Palace%20Team%2C%20I%20am%20interested%20in%20dining%20at%20your%20restaurant.%20Please%20notify%20me%20when%20it%20opens!"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all duration-300 tracking-wider uppercase shadow-lg"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
                NOTIFY ME ON WHATSAPP
              </a>
            </div>
          </div>

          {/* Center Main Image (5 cols) — Coming Soon Overlay */}
          <div className="lg:col-span-5 h-[360px] sm:h-[400px] lg:h-[430px] rounded-2xl overflow-hidden shadow-xl border border-gray-300 dark:border-gray-800 relative group">
            <img 
              src="/rest_main.png" 
              alt="Shivlok Palace Restaurant Coming Soon" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
            {/* Coming Soon Badge */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <div className="bg-black/60 backdrop-blur-sm border border-[#cda85c]/60 rounded-2xl px-6 py-4 shadow-2xl">
                <p className="text-[#cda85c] text-[10px] font-bold tracking-[0.3em] uppercase mb-1">🍽️ Restaurant</p>
                <p className="text-white text-2xl font-serif font-bold">Coming Soon</p>
                <p className="text-gray-300 text-xs mt-1">Pure Veg · Banarasi Specialties</p>
              </div>
            </div>
          </div>

          {/* Right 3 Thumbnails Stack (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-3 h-[360px] sm:h-[400px] lg:h-[430px]">
            
            <div className="flex-1 rounded-2xl overflow-hidden border border-gray-300 dark:border-gray-800 shadow-md relative group">
              <img src="/rest_thumb1.png" alt="Restaurant Ambiance Preview" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-75" />
              <div className="absolute inset-0 bg-black/30 flex items-end p-3">
                <span className="text-[9px] font-bold text-[#cda85c] bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full uppercase tracking-widest border border-[#cda85c]/40">Coming Soon</span>
              </div>
            </div>

            <div className="flex-1 rounded-2xl overflow-hidden border border-gray-300 dark:border-gray-800 shadow-md relative group cursor-pointer">
              <img src="/rest_thumb2.png" alt="Restaurant Dining Preview" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-75" />
              <div className="absolute inset-0 bg-black/30 flex items-end p-3">
                <span className="text-[9px] font-bold text-[#cda85c] bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full uppercase tracking-widest border border-[#cda85c]/40">Coming Soon</span>
              </div>
            </div>

            <div className="flex-1 rounded-2xl overflow-hidden border border-gray-300 dark:border-gray-800 shadow-md relative group">
              <img src="/rest_thumb3.png" alt="Restaurant Food Preview" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-75" />
              <div className="absolute inset-0 bg-black/30 flex items-end p-3">
                <span className="text-[9px] font-bold text-[#cda85c] bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full uppercase tracking-widest border border-[#cda85c]/40">Coming Soon</span>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* ── Menu Modal ── */}
      {showMenuModal && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0e0f11] border border-gray-800 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">

            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#cda85c]/20 border border-[#cda85c]/30 flex items-center justify-center">
                  <UtensilsCrossed size={16} className="text-[#cda85c]" />
                </div>
                <div>
                  <h3 className="text-lg font-serif font-bold text-white leading-none">Menu Preview</h3>
                  <p className="text-[11px] text-amber-400 mt-0.5 flex items-center gap-1">
                    <Leaf size={10} className="text-green-500" /> 100% Pure Vegetarian · Restaurant Opening Soon
                  </p>
                </div>
              </div>
              <button onClick={() => setShowMenuModal(false)} className="w-8 h-8 rounded-full bg-gray-800 hover:bg-red-600 flex items-center justify-center text-white transition-colors flex-shrink-0">
                <X size={18} />
              </button>
            </div>

            {/* Category Tabs */}
            <div className="flex gap-1 px-4 pt-3 pb-0 overflow-x-auto flex-shrink-0 scrollbar-hide">
              {MENU_DATA.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveMenuTab(idx)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-bold tracking-wide whitespace-nowrap transition-all cursor-pointer flex-shrink-0 ${
                    activeMenuTab === idx
                      ? 'bg-[#cda85c] text-gray-950'
                      : 'bg-gray-800/60 text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  <span>{cat.emoji}</span>
                  <span className="uppercase">{cat.category}</span>
                </button>
              ))}
            </div>

            {/* Active Category Content */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              {(() => {
                const cat = MENU_DATA[activeMenuTab];
                return (
                  <div>
                    {/* Category Header */}
                    <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-800">
                      <span className="text-3xl">{cat.emoji}</span>
                      <div>
                        <h4 className="text-xl font-serif font-bold text-white">{cat.category}</h4>
                        <p className="text-[11px] text-gray-400 mt-0.5">{cat.desc}</p>
                      </div>
                    </div>

                    {/* Menu Items Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {cat.items.map((item, i) => (
                        <div
                          key={i}
                          className="bg-[#181a1f] border border-gray-800 hover:border-[#cda85c]/40 rounded-2xl p-4 flex justify-between items-start gap-3 transition-all group"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <h5 className="text-sm font-bold text-white group-hover:text-[#cda85c] transition-colors">{item.name}</h5>
                              {item.tag === 'bestseller' && (
                                <span className="text-[9px] font-bold bg-[#cda85c] text-gray-950 px-1.5 py-0.5 rounded-full uppercase tracking-wide">★ Best</span>
                              )}
                              {item.tag === 'healthy' && (
                                <span className="text-[9px] font-bold bg-green-500/20 text-green-400 border border-green-500/30 px-1.5 py-0.5 rounded-full uppercase tracking-wide">Healthy</span>
                              )}
                              {item.tag === 'local' && (
                                <span className="text-[9px] font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30 px-1.5 py-0.5 rounded-full uppercase tracking-wide">Local</span>
                              )}
                            </div>
                            <p className="text-[11px] text-gray-400 leading-relaxed">{item.desc}</p>
                          </div>
                          <div className="flex-shrink-0 text-right">
                            <span className="text-sm font-extrabold text-[#cda85c]">₹{item.price}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-6 py-3 border-t border-gray-800 flex-shrink-0">
              <p className="text-[10px] text-amber-400 font-semibold flex items-center gap-1">
                <Leaf size={10} className="inline text-green-500" />
                Menu Preview · Restaurant Opening Soon
              </p>
              <a
                href="https://wa.me/918470905123?text=Hello%20Shivlok%20Palace%20Team%2C%20I%20am%20interested%20in%20dining%20at%20your%20restaurant.%20Please%20notify%20me%20when%20it%20opens!"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowMenuModal(false)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] px-4 py-2 rounded-xl uppercase tracking-wider transition-all flex items-center gap-1.5"
              >
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
                Notify Me on WhatsApp
              </a>
            </div>

          </div>
        </div>
      )}

      {/* ── Video Modal ── */}
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

      {/* ── Reserve a Table Modal ── */}
      {showReserveModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-950/85 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#121417] border border-gray-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl text-white relative my-4">

            {/* Header */}
            <div className="flex justify-between items-start border-b border-gray-800 pb-4 mb-6">
              <div>
                <span className="text-xs font-bold text-[#cda85c] tracking-widest uppercase block mb-1">🍽️ RESTAURANT</span>
                <h3 className="text-2xl font-serif font-bold text-white">Reserve a Table</h3>
                <p className="text-gray-400 text-xs mt-0.5">Shivlok Palace · Varanasi</p>
              </div>
              <button onClick={handleCloseModal} className="w-8 h-8 rounded-full bg-gray-800 hover:bg-red-600 flex items-center justify-center text-white transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* ── Success State ── */}
            {result ? (
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-emerald-500/20 border-2 border-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} className="text-emerald-400" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Table Reserved!</h4>
                <p className="text-gray-400 text-sm mb-6">Confirmation sent to your email. We'll confirm within 1 hour.</p>

                <div className="bg-[#181a1f] border-2 border-[#cda85c] rounded-2xl p-5 mb-5 text-left">
                  <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase text-center mb-2">YOUR RESERVATION REFERENCE</p>
                  <p className="text-3xl font-extrabold text-[#cda85c] tracking-widest text-center mb-4">{result.reservationRef}</p>
                  <div className="space-y-2 text-sm border-t border-gray-800 pt-3">
                    <div className="flex justify-between"><span className="text-gray-400">Date:</span><span className="font-semibold text-white">{result.date}</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">Time:</span><span className="font-semibold text-emerald-400">{result.time}</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">Guests:</span><span className="font-semibold text-white">{result.guests} Person{result.guests > 1 ? 's' : ''}</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">Status:</span><span className="font-semibold text-yellow-400 capitalize">{result.status}</span></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <a href="tel:+918470905123" className="bg-[#181a1f] hover:bg-[#202329] text-gray-200 border border-gray-700 font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors text-xs uppercase tracking-wider">
                    Call Restaurant
                  </a>
                  <a href={`https://wa.me/918470905123?text=${encodeURIComponent(`Hi! I just reserved a table. Ref: ${result.reservationRef}. Please confirm!`)}`} target="_blank" rel="noopener noreferrer" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors text-xs uppercase tracking-wider">
                    WhatsApp
                  </a>
                </div>
              </div>
            ) : (
              /* ── Reservation Form ── */
              <form onSubmit={handleSubmit} className="space-y-4">

                {/* Name */}
                <div className="relative">
                  <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#cda85c]" />
                  <input type="text" name="name" required disabled={submitting} placeholder="Full Name *" value={form.name} onChange={handleChange}
                    className="w-full pl-9 pr-4 py-2.5 bg-[#181a1f] border border-gray-700 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#cda85c] transition-colors disabled:opacity-60" />
                </div>

                {/* Email + Phone */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#cda85c]" />
                    <input type="email" name="email" required disabled={submitting} placeholder="Email *" value={form.email} onChange={handleChange}
                      className="w-full pl-9 pr-4 py-2.5 bg-[#181a1f] border border-gray-700 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#cda85c] transition-colors disabled:opacity-60" />
                  </div>
                  <div className="relative">
                    <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#cda85c]" />
                    <input type="tel" name="phone" required disabled={submitting} placeholder="Phone *" value={form.phone} onChange={handleChange}
                      className="w-full pl-9 pr-4 py-2.5 bg-[#181a1f] border border-gray-700 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#cda85c] transition-colors disabled:opacity-60" />
                  </div>
                </div>

                {/* Date + Guests */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#cda85c]" />
                    <input type="date" name="date" required disabled={submitting} min={today} value={form.date} onChange={handleChange}
                      className="w-full pl-9 pr-4 py-2.5 bg-[#181a1f] border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:border-[#cda85c] transition-colors disabled:opacity-60 [&::-webkit-calendar-picker-indicator]:invert" />
                  </div>
                  <div className="relative">
                    <Users size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#cda85c]" />
                    <select name="guests" required disabled={submitting} value={form.guests} onChange={handleChange}
                      className="w-full pl-9 pr-8 py-2.5 bg-[#181a1f] border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:border-[#cda85c] transition-colors disabled:opacity-60 appearance-none cursor-pointer">
                      {[1,2,3,4,5,6,7,8,10,12,15,20].map(n => (
                        <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Time Slots */}
                <div>
                  <label className="text-[11px] font-bold text-gray-400 tracking-widest uppercase block mb-2 flex items-center gap-1.5">
                    <Clock size={12} className="text-[#cda85c]" /> Select Time Slot *
                  </label>
                  <div className="space-y-2">
                    {TIME_SLOTS.map(({ label, slots }) => (
                      <div key={label}>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1.5">{label}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {slots.map((slot) => (
                            <button
                              key={slot}
                              type="button"
                              disabled={submitting}
                              onClick={() => setForm({ ...form, time: slot })}
                              className={`text-[11px] font-semibold px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
                                form.time === slot
                                  ? 'bg-[#cda85c] border-[#cda85c] text-gray-950'
                                  : 'bg-[#181a1f] border-gray-700 text-gray-300 hover:border-[#cda85c] hover:text-[#cda85c]'
                              }`}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  {!form.time && <p className="text-[10px] text-gray-500 mt-1.5">* Please select a time slot</p>}
                </div>

                {/* Occasion + Seating */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <label className="text-[11px] font-bold text-gray-400 tracking-widest uppercase block mb-1">Occasion</label>
                    <select name="occasion" disabled={submitting} value={form.occasion} onChange={handleChange}
                      className="w-full px-3 pr-8 py-2.5 bg-[#181a1f] border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:border-[#cda85c] transition-colors appearance-none cursor-pointer disabled:opacity-60">
                      <option value="none">General Dining</option>
                      <option value="birthday">🎂 Birthday</option>
                      <option value="anniversary">💍 Anniversary</option>
                      <option value="business">💼 Business</option>
                      <option value="family">👨‍👩‍👧 Family</option>
                      <option value="other">Special Occasion</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-3 bottom-2.5 text-gray-400 pointer-events-none" />
                  </div>
                  <div className="relative">
                    <label className="text-[11px] font-bold text-gray-400 tracking-widest uppercase block mb-1">Seating</label>
                    <select name="seatingPreference" disabled={submitting} value={form.seatingPreference} onChange={handleChange}
                      className="w-full px-3 pr-8 py-2.5 bg-[#181a1f] border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:border-[#cda85c] transition-colors appearance-none cursor-pointer disabled:opacity-60">
                      <option value="any">No Preference</option>
                      <option value="rooftop">🌙 Rooftop</option>
                      <option value="indoor">🏠 Indoor</option>
                      <option value="ganga-view">🌊 Ganga View</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-3 bottom-2.5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Special Requests */}
                <div>
                  <textarea name="specialRequests" rows="2" disabled={submitting} placeholder="Special requests (allergies, décor, high chair...)" value={form.specialRequests} onChange={handleChange} maxLength={400}
                    className="w-full px-3 py-2.5 bg-[#181a1f] border border-gray-700 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#cda85c] transition-colors resize-none disabled:opacity-60" />
                  <p className="text-[10px] text-gray-500 text-right">{form.specialRequests.length}/400</p>
                </div>

                {error && (
                  <p className="text-red-400 text-xs font-semibold bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">{error}</p>
                )}

                <button type="submit" disabled={submitting || !form.time}
                  className="w-full bg-[#cda85c] hover:bg-[#b89448] text-gray-950 font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2.5 transition-all shadow-lg text-sm uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed">
                  {submitting ? (
                    <><Loader2 size={16} className="animate-spin" /> RESERVING...</>
                  ) : (
                    <><Sparkles size={16} className="fill-gray-950" /> CONFIRM RESERVATION</>
                  )}
                </button>

                <p className="text-center text-[10px] text-gray-500">
                  Restaurant hours: 7:00 AM – 11:00 AM · 12:00 PM – 3:00 PM · 7:00 PM – 10:00 PM
                </p>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default Restaurant;
