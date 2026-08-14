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
    { name: 'OFFERS', href: '#offers' },
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
            <a href="mailto:dm.shivlokpalace@gmail.com,shivlokpalace.vns@gmail.com" className="hover:text-[#cda85c] transition-colors">shivlokpalace.vns@gmail.com</a>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center space-x-1.5 text-gray-600 dark:text-gray-400 font-medium text-[10px]">
            <span className="text-[#cda85c] cursor-pointer font-bold">ENG</span>
            <span>|</span>
            <span className="hover:text-[#cda85c] cursor-pointer transition-colors">हिंदी</span>
          </div>
          <div className="flex items-center space-x-2.5 text-gray-600 dark:text-gray-400">
            <a href="https://www.facebook.com/shivlokpalacebsb" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebook size={13} className="hover:text-[#cda85c] transition-colors" /></a>
            <a href="https://www.instagram.com/shivlokpalacebsb" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram size={13} className="hover:text-[#cda85c] transition-colors" /></a>
            <a href="https://x.com/shivlokpalace" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X"><FaTwitter size={13} className="hover:text-[#cda85c] transition-colors" /></a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="bg-white dark:bg-[#121417] text-gray-900 dark:text-white px-3 sm:px-6 lg:px-4 xl:px-8 py-2 md:py-2.5 flex justify-between items-center border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
        
        {/* Logo */}
        <a href="#hero" className="flex items-center group py-0.5 ml-2 lg:ml-4 xl:ml-12">
          <img 
            src="/logo.png" 
            alt="Shivlok Palace Logo" 
            className="h-12 sm:h-14 md:h-16 w-auto object-contain transition-all duration-300 scale-[1.15] md:scale-125 group-hover:scale-[1.25] md:group-hover:scale-[1.35] filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.12)] dark:drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]" 
          />
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center space-x-3 lg:space-x-6 xl:space-x-10 2xl:space-x-14 text-[10px] lg:text-xs xl:text-sm font-bold tracking-wider">
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
            className="p-2 sm:p-2.5 xl:p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800/80 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-all duration-300 cursor-pointer shadow-sm"
          >
            {isDarkMode ? (
              <Sun size={16} className="text-amber-400 fill-amber-400/20" />
            ) : (
              <Moon size={16} className="text-indigo-950 fill-indigo-950/20" />
            )}
          </button>

          <a 
            href="https://wa.me/918470905123?text=Hello%20Shivlok%20Palace%20Team%2C%20I%20would%20like%20to%20book%20a%20room.%20Please%20share%20availability%20and%20tariffs."
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-block bg-[#cda85c] hover:bg-[#b89448] text-gray-950 font-bold text-[10px] lg:text-xs xl:text-sm px-4 lg:px-6 xl:px-8 py-2 xl:py-3 rounded-xl transition-all duration-300 tracking-wider uppercase shadow-md hover:scale-105"
          >
            BOOK
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
            href="https://wa.me/918470905123?text=Hello%20Shivlok%20Palace%20Team%2C%20I%20would%20like%20to%20book%20a%20room.%20Please%20share%20availability%20and%20tariffs."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-center bg-[#cda85c] text-gray-950 font-bold text-xs py-3 rounded-xl uppercase tracking-wider mt-4 shadow"
          >
            BOOK YOUR STAY
          </a>
        </div>
      )}

    </header>
  );
};

export default Navbar;
