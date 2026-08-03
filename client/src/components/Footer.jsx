import React, { useState } from 'react';
import { Phone, Mail, MapPin, Globe, Clock, Loader2 } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const API_BASE = 'http://localhost:5000/api';

const Footer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [newsletterEmail, setNewsletterEmail] = useState('');

  // Inquiry form states
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [inquiryError, setInquiryError] = useState('');

  // Newsletter states
  const [newsletterSubmitting, setNewsletterSubmitting] = useState(false);
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [newsletterError, setNewsletterError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setInquiryError('');

    try {
      const res = await fetch(`${API_BASE}/inquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => setSubmitted(false), 6000);
      } else {
        setInquiryError(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setInquiryError('Unable to connect to the server. Please call us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setNewsletterSubmitting(true);
    setNewsletterError('');

    try {
      const res = await fetch(`${API_BASE}/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail }),
      });

      const data = await res.json();

      if (data.success) {
        setNewsletterSubmitted(true);
        setNewsletterEmail('');
        setTimeout(() => setNewsletterSubmitted(false), 6000);
      } else {
        setNewsletterError(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setNewsletterError('Unable to connect. Please try again later.');
    } finally {
      setNewsletterSubmitting(false);
    }
  };

  return (
    <footer className="bg-[#F5F2ED] dark:bg-[#121417] text-gray-700 dark:text-gray-300 pt-12 pb-8 border-t border-gray-200 dark:border-gray-900 transition-colors duration-300 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Contact & Inquiry Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-12 border-b border-gray-300 dark:border-gray-800/80 pb-12 transition-colors">
          
          {/* Column 1: Contact Info (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between py-1">
            <div>
              <div className="inline-block border-b-2 border-[#cda85c] pb-0.5 mb-2">
                <p className="text-[#cda85c] text-[10px] font-bold tracking-[0.2em] uppercase">
                  CONTACT US
                </p>
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-serif text-gray-900 dark:text-white leading-tight mb-4 transition-colors">
                We are Here to Help You
              </h2>
              
              <div className="space-y-2.5 text-xs">
                <div className="flex items-start space-x-3">
                  <Phone size={15} className="text-[#cda85c] mt-0.5 flex-shrink-0" />
                  <div className="text-gray-800 dark:text-gray-200 font-bold dark:font-medium leading-tight transition-colors">
                    <p>Reservation: +91 8470905123</p>
                    <p className="mt-0.5 text-gray-600 dark:text-gray-400 text-[11px] font-normal">General Manager: +91 9839293936</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail size={15} className="text-[#cda85c] flex-shrink-0" />
                  <a href="mailto:shivlokpalace@gmail.com" className="text-gray-800 dark:text-gray-200 font-bold dark:font-medium hover:text-[#cda85c] transition-colors">shivlokpalace@gmail.com</a>
                </div>

                <div className="flex items-center space-x-3">
                  <Globe size={15} className="text-[#cda85c] flex-shrink-0" />
                  <a href="https://www.shivlokpalace.com" target="_blank" rel="noopener noreferrer" className="text-gray-800 dark:text-gray-200 font-bold dark:font-medium hover:text-[#cda85c] transition-colors">www.shivlokpalace.com</a>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin size={15} className="text-[#cda85c] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-800 dark:text-gray-200 font-bold dark:font-medium leading-tight transition-colors">
                    D-34/181, Ganesh Mahal Road, Jangambadi, Near Godowlia Chauraha, Varanasi – 221001
                  </span>
                </div>

                <div className="flex items-start space-x-3 pt-1 border-t border-gray-300 dark:border-gray-800/60 transition-colors">
                  <Clock size={15} className="text-[#cda85c] mt-0.5 flex-shrink-0" />
                  <div className="text-gray-800 dark:text-gray-200 font-bold dark:font-medium leading-tight transition-colors">
                    <p>Check-in: 01:00 PM | Check-out: 11:00 AM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Icons Row */}
            <div className="flex items-center space-x-2.5 mt-4">
              <a href="#" aria-label="Facebook" className="w-8 h-8 rounded-full border border-gray-400 dark:border-gray-700 text-gray-800 dark:text-white hover:border-[#cda85c] hover:bg-[#cda85c] hover:text-gray-950 flex items-center justify-center transition-all">
                <FaFacebookF size={12} />
              </a>
              <a href="#" aria-label="Instagram" className="w-8 h-8 rounded-full border border-gray-400 dark:border-gray-700 text-gray-800 dark:text-white hover:border-[#cda85c] hover:bg-[#cda85c] hover:text-gray-950 flex items-center justify-center transition-all">
                <FaInstagram size={12} />
              </a>
              <a href="#" aria-label="Twitter" className="w-8 h-8 rounded-full border border-gray-400 dark:border-gray-700 text-gray-800 dark:text-white hover:border-[#cda85c] hover:bg-[#cda85c] hover:text-gray-950 flex items-center justify-center transition-all">
                <FaTwitter size={12} />
              </a>
              <a href="#" aria-label="Youtube" className="w-8 h-8 rounded-full border border-gray-400 dark:border-gray-700 text-gray-800 dark:text-white hover:border-[#cda85c] hover:bg-[#cda85c] hover:text-gray-950 flex items-center justify-center transition-all">
                <FaYoutube size={12} />
              </a>
            </div>
          </div>

          {/* Column 2: Google Maps Embed Card */}
          <div className="lg:col-span-4 rounded-xl overflow-hidden shadow-xl border border-gray-300 dark:border-gray-800 relative bg-[#e5e3df] h-[210px] sm:h-[220px] transition-colors">
            <iframe 
              title="Shivlok Palace Map Location"
              src="https://www.google.com/maps?q=D-34/181,+Ganesh+Mahal+Road,+Jangambadi,+Near+Godowlia+Chauraha,+Varanasi+221001&output=embed" 
              className="w-full h-full border-0"
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Column 3: Send Us An Inquiry Form Card */}
          <div className="lg:col-span-4 bg-white dark:bg-[#181a1f] rounded-xl p-4 shadow-xl border border-gray-200/80 dark:border-gray-800 flex flex-col justify-between h-[210px] sm:h-[220px] transition-colors">
            <div>
              <p className="text-[10px] font-bold text-gray-600 dark:text-gray-400 tracking-[0.15em] uppercase mb-2">
                SEND US AN INQUIRY
              </p>

              {submitted ? (
                <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 p-3 rounded-lg text-xs font-semibold text-center my-4">
                  ✓ Thank you! Your inquiry has been saved. We'll contact you within 24 hours.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <input 
                      type="text" 
                      required
                      disabled={submitting}
                      placeholder="Your Name" 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full text-[11px] px-2.5 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#121417] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-[#cda85c] disabled:opacity-60" 
                    />
                    <input 
                      type="email" 
                      required
                      disabled={submitting}
                      placeholder="Email Address" 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full text-[11px] px-2.5 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#121417] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-[#cda85c] disabled:opacity-60" 
                    />
                  </div>
                  <input 
                    type="tel" 
                    required
                    disabled={submitting}
                    placeholder="Phone Number" 
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full text-[11px] px-2.5 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#121417] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-[#cda85c] disabled:opacity-60" 
                  />
                  <textarea 
                    rows="2" 
                    required
                    disabled={submitting}
                    placeholder="Your Message" 
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full text-[11px] px-2.5 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#121417] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-[#cda85c] resize-none disabled:opacity-60"
                  ></textarea>
                  {inquiryError && (
                    <p className="text-red-500 dark:text-red-400 text-[10px] font-semibold">{inquiryError}</p>
                  )}
                  <button 
                    type="submit" 
                    disabled={submitting}
                    className="w-full bg-[#cda85c] hover:bg-[#b89448] text-gray-950 font-bold py-2 rounded-lg text-[11px] tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-1.5 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <><Loader2 size={12} className="animate-spin" /> SENDING...</>
                    ) : 'SEND MESSAGE'}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* Bottom 5-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-start mb-10 text-xs">
          
          {/* Col 1: Logo & Tagline */}
          <div className="pr-2">
            <a href="#hero" className="flex items-center space-x-3 mb-4 cursor-pointer group">
              <div className="bg-stone-900 p-1 rounded-2xl border-2 border-[#cda85c]/60 shadow-xl group-hover:scale-105 transition-transform flex items-center justify-center">
                <img 
                  src="/logo.jpg" 
                  alt="Shivlok Palace Logo" 
                  className="h-14 sm:h-16 w-auto object-contain rounded-xl" 
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl tracking-widest text-[#cda85c] font-extrabold leading-none">SHIVLOK</span>
                <span className="text-[9px] tracking-[0.2em] text-gray-600 dark:text-gray-400 mt-1 font-bold">PALACE HOTEL</span>
              </div>
            </a>
            <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed transition-colors">
              Luxury Stay in the Spiritual Capital of India
            </p>
          </div>

          {/* Col 2: QUICK LINKS */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-bold uppercase tracking-wider mb-3 text-[11px] transition-colors">QUICK LINKS</h4>
            <ul className="space-y-1.5 text-gray-600 dark:text-gray-400 transition-colors">
              <li><a href="#hero" className="hover:text-[#cda85c] transition-colors">Home</a></li>
              <li><a href="#rooms" className="hover:text-[#cda85c] transition-colors">Rooms</a></li>
              <li><a href="#restaurant" className="hover:text-[#cda85c] transition-colors">Restaurant</a></li>
              <li><a href="#amenities" className="hover:text-[#cda85c] transition-colors">Facilities</a></li>
              <li><a href="#policies" className="hover:text-[#cda85c] transition-colors">Policies</a></li>
              <li><a href="#gallery" className="hover:text-[#cda85c] transition-colors">Gallery</a></li>
              <li><a href="#contact" className="hover:text-[#cda85c] transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Col 3: EXPLORE VARANASI */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-bold uppercase tracking-wider mb-3 text-[11px] transition-colors">EXPLORE VARANASI</h4>
            <ul className="space-y-1.5 text-gray-600 dark:text-gray-400 transition-colors">
              <li><a href="#explore" className="hover:text-[#cda85c] transition-colors">Kashi Vishwanath Temple</a></li>
              <li><a href="#explore" className="hover:text-[#cda85c] transition-colors">Dashashwamedh Ghat</a></li>
              <li><a href="#explore" className="hover:text-[#cda85c] transition-colors">Assi Ghat</a></li>
              <li><a href="#explore" className="hover:text-[#cda85c] transition-colors">Varanasi Railway Station</a></li>
              <li><a href="#explore" className="hover:text-[#cda85c] transition-colors">BHU University</a></li>
              <li><a href="#explore" className="hover:text-[#cda85c] transition-colors">Sarnath & Airport</a></li>
            </ul>
          </div>

          {/* Col 4: POLICIES */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-bold uppercase tracking-wider mb-3 text-[11px] transition-colors">POLICIES</h4>
            <ul className="space-y-1.5 text-gray-600 dark:text-gray-400 transition-colors">
              <li><a href="#policies" className="hover:text-[#cda85c] transition-colors">Check-In & ID Rules</a></li>
              <li><a href="#policies" className="hover:text-[#cda85c] transition-colors">Extra Guest Terms</a></li>
              <li><a href="#policies" className="hover:text-[#cda85c] transition-colors">Privacy Policy</a></li>
              <li><a href="#policies" className="hover:text-[#cda85c] transition-colors">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Col 5: NEWSLETTER */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-bold uppercase tracking-wider mb-2 text-[11px] transition-colors">NEWSLETTER</h4>
            <p className="text-gray-600 dark:text-gray-400 text-xs mb-3 leading-relaxed transition-colors">
              Subscribe to get latest offers and updates
            </p>

            {newsletterSubmitted ? (
              <div className="bg-[#cda85c]/20 border border-[#cda85c] text-[#cda85c] text-[11px] p-2 rounded-lg font-bold">
                ✓ Subscribed! Check your inbox for a welcome email.
              </div>
            ) : (
              <>
                <form onSubmit={handleNewsletterSubmit} className="flex items-center">
                  <input 
                    type="email" 
                    required
                    disabled={newsletterSubmitting}
                    placeholder="Enter your email" 
                    value={newsletterEmail}
                    onChange={(e) => { setNewsletterEmail(e.target.value); setNewsletterError(''); }}
                    className="w-full bg-white dark:bg-[#181a1f] border border-gray-300 dark:border-gray-700/80 text-xs px-3 py-2 text-gray-900 dark:text-white placeholder-gray-500 rounded-l-md focus:outline-none focus:border-[#cda85c] disabled:opacity-60"
                  />
                  <button 
                    type="submit"
                    disabled={newsletterSubmitting}
                    className="bg-[#cda85c] hover:bg-[#b89448] text-gray-950 font-bold text-[10px] px-3.5 py-2 rounded-r-md uppercase transition-colors tracking-wider whitespace-nowrap flex items-center gap-1 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {newsletterSubmitting ? <Loader2 size={12} className="animate-spin" /> : 'SUBSCRIBE'}
                  </button>
                </form>
                {newsletterError && (
                  <p className="text-red-500 dark:text-red-400 text-[10px] font-semibold mt-1.5">{newsletterError}</p>
                )}
              </>
            )}
          </div>

        </div>

        {/* Copyright Bottom Bar */}
        <div className="border-t border-gray-300 dark:border-gray-800/80 pt-5 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-600 dark:text-gray-400 gap-2 transition-colors">
          <p>© 2026 Shivlok Palace. All Rights Reserved.</p>
          <p className="flex items-center">
            Designed with <span className="text-red-500 mx-1.5 text-sm">♥</span> for Varanasi
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
