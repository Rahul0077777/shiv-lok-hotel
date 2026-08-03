import React, { useState } from 'react';
import { MapPin, Phone, Mail, Menu, X, Sun, Moon } from 'lucide-react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Navbar = ({ isDarkMode, toggleDarkMode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'HOME', href: '#hero' },
    { name: 'ROOMS', href: '#rooms' },
    { name: 'RESTAURANT', href: '#restaurant' },
    { name: 'FACILITIES', href: '#amenities' },
    { name: 'POLICIES', href: '#policies' },
    { name: 'GALLERY', href: '#gallery' },
    { name: 'EXPLORE VARANASI', href: '#explore' },
    { name: 'REVIEWS', href: '#reviews' },
    { name: 'CONTACT', href: '#contact' },
  ];

  return (
    <header className="w-full sticky top-0 z-50 shadow-md dark:shadow-xl transition-all duration-300 select-none">
      
      {/* Top Bar */}
      <div className="bg-[#F5F2ED] dark:bg-[#0f1114] text-gray-700 dark:text-gray-300 text-[11px] py-1.5 px-4 sm:px-6 lg:px-8 flex justify-between items-center border-b border-gray-200/80 dark:border-gray-800/80 transition-colors duration-300">
        <div className="flex items-center space-x-5">
          <div className="flex items-center space-x-1.5">
            <MapPin size={13} className="text-[#cda85c]" />
            <span className="hidden sm:inline font-medium">D-34/183, Ganesh Mahal Road, Near Godowlia Chauraha, Varanasi – 221001</span>
          </div>
          <div className="flex items-center space-x-1.5 font-medium">
            <Phone size={13} className="text-[#cda85c]" />
            <a href="tel:+918470905123" className="hover:text-[#cda85c] transition-colors">+91 8470905123</a>
          </div>
          <div className="hidden md:flex items-center space-x-1.5 font-medium">
            <Mail size={13} className="text-[#cda85c]" />
            <a href="mailto:shivlokpalace@gmail.com" className="hover:text-[#cda85c] transition-colors">shivlokpalace@gmail.com</a>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center space-x-1.5 text-gray-600 dark:text-gray-400 font-medium text-[10px]">
            <span className="text-[#cda85c] cursor-pointer font-bold">ENG</span>
            <span>|</span>
            <span className="hover:text-[#cda85c] cursor-pointer transition-colors">हिंदी</span>
          </div>
          <div className="flex items-center space-x-2.5 text-gray-600 dark:text-gray-400">
            <a href="#" aria-label="Facebook"><FaFacebook size={13} className="hover:text-[#cda85c] transition-colors" /></a>
            <a href="#" aria-label="Instagram"><FaInstagram size={13} className="hover:text-[#cda85c] transition-colors" /></a>
            <a href="#" aria-label="Twitter"><FaTwitter size={13} className="hover:text-[#cda85c] transition-colors" /></a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="bg-white dark:bg-[#121417] text-gray-900 dark:text-white px-4 sm:px-6 lg:px-8 py-3.5 flex justify-between items-center border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
        
        {/* Logo */}
        <a href="#hero" className="flex items-center space-x-3 group">
          <div className="bg-stone-900 p-1 rounded-2xl border-2 border-[#cda85c]/60 shadow-xl group-hover:scale-105 transition-transform flex items-center justify-center">
            <img 
              src="/logo.jpg" 
              alt="Shivlok Palace Logo" 
              className="h-10 sm:h-14 md:h-16 w-auto object-contain rounded-xl" 
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl sm:text-2xl tracking-[0.2em] text-[#cda85c] font-extrabold leading-none">SHIVLOK</span>
            <span className="text-[9px] tracking-[0.2em] text-gray-500 dark:text-gray-400 mt-1 font-bold">PALACE HOTEL</span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center space-x-6 text-xs font-bold tracking-wider">
          {navLinks.map((link, index) => (
            <a 
              key={index}
              href={link.href} 
              className="text-gray-800 dark:text-gray-200 hover:text-[#cda85c] dark:hover:text-[#cda85c] transition-colors py-1 relative group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#cda85c] group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
        </nav>

        {/* Action Button & Theme Toggle */}
        <div className="flex items-center space-x-3">
          
          {/* Theme Switcher Toggle */}
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle Dark Mode"
            className="p-2 sm:px-3 sm:py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800/80 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-amber-400 font-bold text-xs flex items-center gap-1.5 transition-all duration-300 cursor-pointer shadow-sm"
          >
            {isDarkMode ? (
              <>
                <Sun size={15} className="text-amber-400 fill-amber-400/20 flex-shrink-0" />
                <span className="hidden sm:inline text-[11px] uppercase tracking-wider">Light Mode</span>
              </>
            ) : (
              <>
                <Moon size={15} className="text-indigo-950 fill-indigo-950/20 flex-shrink-0" />
                <span className="hidden sm:inline text-[11px] uppercase tracking-wider text-gray-800">Dark Mode</span>
              </>
            )}
          </button>

          <a 
            href="#booking" 
            className="hidden sm:inline-block bg-[#cda85c] hover:bg-[#b89448] text-gray-950 font-bold text-xs px-5 py-2.5 rounded-xl transition-all duration-300 tracking-wider uppercase shadow-md hover:scale-105"
          >
            BOOK NOW
          </a>
          
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-gray-800 dark:text-white hover:text-[#cda85c] focus:outline-none ml-1"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-[#121417] border-b border-gray-200 dark:border-gray-800 px-6 py-4 space-y-3 animate-fadeIn transition-colors duration-300">
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-bold text-gray-800 dark:text-gray-200 hover:text-[#cda85c] py-2 border-b border-gray-100 dark:border-gray-800/50"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#booking"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-center bg-[#cda85c] text-gray-950 font-bold text-xs py-3 rounded-xl uppercase tracking-wider mt-4 shadow"
          >
            BOOK NOW
          </a>
        </div>
      )}

    </header>
  );
};

export default Navbar;
