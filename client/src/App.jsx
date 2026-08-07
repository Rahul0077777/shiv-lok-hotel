import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BookingWidget from './components/BookingWidget';
import Amenities from './components/Amenities';
import Rooms from './components/Rooms';
import Restaurant from './components/Restaurant';
import Gallery from './components/Gallery';
import Explore from './components/Explore';
import Reviews from './components/Reviews';
import Policies from './components/Policies';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false); // Default to white theme

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <div className={`min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-white dark:bg-[#0f1114] text-gray-900 dark:text-gray-100 flex flex-col font-sans transition-colors duration-300 pb-16 sm:pb-0 ${isDarkMode ? 'dark' : ''}`}>
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <section id="hero">
        <Hero />
      </section>

      <div id="booking" className="relative z-20 -mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <BookingWidget />
      </div>

      <section id="amenities">
        <Amenities />
      </section>

      <section id="rooms">
        <Rooms />
      </section>

      <section id="restaurant">
        <Restaurant />
      </section>

      <section id="gallery">
        <Gallery />
      </section>

      <section id="explore">
        <Explore />
      </section>

      <section id="policies">
        <Policies />
      </section>

      <section id="reviews">
        <Reviews />
      </section>

      <section id="contact">
        <Footer />
      </section>

      {/* Fixed Site-Wide Floating Speed Dial Widget */}
      <FloatingActions />
    </div>
  );
}

export default App;
