import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const Reviews = () => {
  const [startIndex, setStartIndex] = useState(0);

  const reviews = [
    {
      name: "Rahul Sharma",
      city: "Delhi",
      text: "Amazing stay with beautiful Ganga view. Staff was very polite and helpful.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Priya Singh",
      city: "Mumbai",
      text: "The best hotel in Varanasi! Clean rooms, tasty food and great hospitality.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Amit Verma",
      city: "Lucknow",
      text: "Perfect location near Kashi Vishwanath Temple. Highly recommended!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Neha Gupta",
      city: "Bangalore",
      text: "The rooftop dining view of Ganga Aarti was breathtaking! Will visit again.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Vikram Malhotra",
      city: "Chandigarh",
      text: "Luxurious rooms with top notch room service. 10/10 experience.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Ananya Roy",
      city: "Kolkata",
      text: "Pure veg delicious food and very serene spiritual atmosphere.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Suresh Kumar",
      city: "Hyderabad",
      text: "Excellent airport pickup service and friendly staff. Very comfortable stay.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Ritu Agarwal",
      city: "Jaipur",
      text: "Waking up to the morning Ganga river view from our balcony was magical.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Deepak Joshi",
      city: "Ahmedabad",
      text: "Very clean and modern amenities right in the heart of Varanasi.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Pooja Trivedi",
      city: "Indore",
      text: "Superb hospitality! Loved the complimentary breakfast and peaceful environment.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&q=80"
    }
  ];

  const handleNext = () => {
    setStartIndex((prev) => (prev + 3 >= reviews.length ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setStartIndex((prev) => (prev === 0 ? reviews.length - 3 : prev - 1));
  };

  const visibleReviews = [
    reviews[startIndex],
    reviews[(startIndex + 1) % reviews.length],
    reviews[(startIndex + 2) % reviews.length]
  ];

  return (
    <div className="bg-[#FAF8F5] dark:bg-[#0f1114] py-14 md:py-20 border-b border-gray-200/40 dark:border-gray-800 transition-colors duration-300 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-block border-b-2 border-[#cda85c] pb-1 mb-2">
            <p className="text-[#cda85c] text-[11px] font-bold tracking-[0.2em] uppercase">
              GUEST REVIEWS
            </p>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-gray-900 dark:text-white leading-tight transition-colors">
            What Our Guests Say
          </h2>
        </div>

        {/* Carousel Area */}
        <div className="relative px-2 sm:px-6">
          
          {/* Left Arrow Button */}
          <button 
            onClick={handlePrev}
            aria-label="Previous Reviews"
            className="absolute -left-2 sm:left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white dark:bg-[#181a1f] border border-gray-200 dark:border-gray-800 shadow-md rounded-full flex items-center justify-center text-gray-700 dark:text-gray-200 hover:text-[#cda85c] dark:hover:text-[#cda85c] hover:scale-110 transition-all z-20 cursor-pointer"
          >
            <ChevronLeft size={20} />
          </button>

          {/* 3 Active Review Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visibleReviews.map((review, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-[#181a1f] rounded-2xl p-6 shadow-sm border border-gray-200/70 dark:border-gray-800 flex flex-col justify-between hover:shadow-lg transition-all duration-300 min-h-[200px]"
              >
                <div>
                  {/* 5 Stars */}
                  <div className="flex text-[#cda85c] mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={15} fill="currentColor" className="mr-0.5" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm leading-relaxed mb-6 font-normal transition-colors">
                    "{review.text}"
                  </p>
                </div>

                {/* User Info & Google Icon Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800 transition-colors">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={review.avatar} 
                      alt={review.name} 
                      className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-gray-700"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-snug transition-colors">{review.name}</h4>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium transition-colors">{review.city}</p>
                    </div>
                  </div>

                  {/* Google Logo */}
                  <div className="flex items-center justify-center">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                    </svg>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Right Arrow Button */}
          <button 
            onClick={handleNext}
            aria-label="Next Reviews"
            className="absolute -right-2 sm:right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white dark:bg-[#181a1f] border border-gray-200 dark:border-gray-800 shadow-md rounded-full flex items-center justify-center text-gray-700 dark:text-gray-200 hover:text-[#cda85c] dark:hover:text-[#cda85c] hover:scale-110 transition-all z-20 cursor-pointer"
          >
            <ChevronRight size={20} />
          </button>

        </div>

      </div>
    </div>
  );
};

export default Reviews;
