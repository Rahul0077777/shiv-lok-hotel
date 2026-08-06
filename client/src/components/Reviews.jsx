import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, PenLine, X, Loader2, CheckCircle2, Send } from 'lucide-react';

const API_BASE = 'http://localhost:5000/api';

// Static fallback data used when API is unavailable
const STATIC_REVIEWS = [
  {
    _id: 's1',
    name: "Rahul Sharma",
    city: "Delhi",
    text: "Amazing stay with beautiful Ganga view. Staff was very polite and helpful.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
    platform: "google",
  },
  {
    _id: 's2',
    name: "Priya Singh",
    city: "Mumbai",
    text: "The best hotel in Varanasi! Clean rooms, tasty food and great hospitality.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    platform: "google",
  },
  {
    _id: 's3',
    name: "Amit Verma",
    city: "Lucknow",
    text: "Perfect location near Kashi Vishwanath Temple. Highly recommended!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80",
    platform: "google",
  },
  {
    _id: 's4',
    name: "Neha Gupta",
    city: "Bangalore",
    text: "The rooftop dining view of Ganga Aarti was breathtaking! Will visit again.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    platform: "google",
  },
  {
    _id: 's5',
    name: "Vikram Malhotra",
    city: "Chandigarh",
    text: "Luxurious rooms with top notch room service. 10/10 experience.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    platform: "google",
  },
  {
    _id: 's6',
    name: "Ananya Roy",
    city: "Kolkata",
    text: "Pure veg delicious food and very serene spiritual atmosphere.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
    platform: "google",
  },
  {
    _id: 's7',
    name: "Suresh Kumar",
    city: "Hyderabad",
    text: "Excellent airport pickup service and friendly staff. Very comfortable stay.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    platform: "google",
  },
  {
    _id: 's8',
    name: "Ritu Agarwal",
    city: "Jaipur",
    text: "Waking up to the morning Ganga river view from our balcony was magical.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    platform: "google",
  },
  {
    _id: 's9',
    name: "Deepak Joshi",
    city: "Ahmedabad",
    text: "Very clean and modern amenities right in the heart of Varanasi.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&q=80",
    platform: "google",
  },
  {
    _id: 's10',
    name: "Pooja Trivedi",
    city: "Indore",
    text: "Superb hospitality! Loved the complimentary breakfast and peaceful environment.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&q=80",
    platform: "google",
  },
];

// Avatar initials fallback component
const AvatarFallback = ({ name }) => {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
  return (
    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#cda85c] to-[#8b6d2e] flex items-center justify-center text-white text-xs font-bold border border-[#cda85c]/30 flex-shrink-0">
      {initials}
    </div>
  );
};

const Reviews = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [reviews, setReviews] = useState(STATIC_REVIEWS);
  const [loading, setLoading] = useState(true);

  // Write a review modal state
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewForm, setReviewForm] = useState({ name: '', email: '', city: '', rating: 5, text: '', stayDate: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Fetch approved reviews from API on mount
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`${API_BASE}/reviews?limit=20`);
        const data = await res.json();
        if (data.success && data.data.length > 0) {
          setReviews(data.data);
        }
        // If no approved reviews in DB, keep showing static data
      } catch (err) {
        // API unavailable — silently fall back to static data
        console.warn('Reviews API unavailable, using static data.');
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const handleNext = () => {
    setStartIndex((prev) => (prev + 3 >= reviews.length ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setStartIndex((prev) => (prev === 0 ? reviews.length - 3 : prev - 1));
  };

  const visibleReviews = [
    reviews[startIndex],
    reviews[(startIndex + 1) % reviews.length],
    reviews[(startIndex + 2) % reviews.length],
  ].filter(Boolean);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');

    try {
      const res = await fetch(`${API_BASE}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...reviewForm,
          rating: parseInt(reviewForm.rating),
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setSubmitError(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setSubmitError('Unable to connect to server. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCloseReviewModal = () => {
    setShowReviewModal(false);
    setSubmitted(false);
    setSubmitError('');
    setReviewForm({ name: '', email: '', city: '', rating: 5, text: '', stayDate: '' });
  };

  return (
    <div id="reviews" className="bg-[#FAF8F5] dark:bg-[#0f1114] py-14 md:py-20 border-b border-gray-200/40 dark:border-gray-800 transition-colors duration-300 select-none">
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
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 transition-colors">
            Trusted by guests from across India and the world
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-8">
            <Loader2 size={28} className="animate-spin text-[#cda85c]" />
          </div>
        )}

        {/* Carousel Area */}
        {!loading && (
          <div className="relative px-2 sm:px-6">
            
            {/* Left Arrow */}
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
                  key={review._id || index}
                  className="bg-white dark:bg-[#181a1f] rounded-2xl p-6 shadow-sm border border-gray-200/70 dark:border-gray-800 flex flex-col justify-between hover:shadow-lg transition-all duration-300 min-h-[200px]"
                >
                  <div>
                    {/* Stars */}
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

                  {/* User Info & Platform Icon Footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800 transition-colors">
                    <div className="flex items-center space-x-3">
                      {review.avatar ? (
                        <img 
                          src={review.avatar} 
                          alt={review.name} 
                          className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-gray-700 flex-shrink-0"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      ) : (
                        <AvatarFallback name={review.name} />
                      )}
                      <div>
                        <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-snug transition-colors">{review.name}</h4>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium transition-colors">{review.city}</p>
                      </div>
                    </div>

                    {/* Platform icon */}
                    {review.platform === 'google' || !review.platform ? (
                      <div className="flex items-center justify-center">
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                        </svg>
                      </div>
                    ) : (
                      <span className="text-[10px] text-gray-400 font-medium capitalize">{review.platform}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Right Arrow */}
            <button 
              onClick={handleNext}
              aria-label="Next Reviews"
              className="absolute -right-2 sm:right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white dark:bg-[#181a1f] border border-gray-200 dark:border-gray-800 shadow-md rounded-full flex items-center justify-center text-gray-700 dark:text-gray-200 hover:text-[#cda85c] dark:hover:text-[#cda85c] hover:scale-110 transition-all z-20 cursor-pointer"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}

        {/* Write a Review CTA */}
        <div className="text-center mt-10">
          <button
            onClick={() => setShowReviewModal(true)}
            className="inline-flex items-center gap-2 bg-[#121417] dark:bg-[#181a1f] hover:bg-[#cda85c] dark:hover:bg-[#cda85c] text-[#cda85c] hover:text-gray-950 dark:hover:text-gray-950 font-bold text-xs tracking-widest uppercase px-6 py-3 rounded-xl border border-[#cda85c]/40 hover:border-[#cda85c] transition-all duration-300 cursor-pointer"
          >
            <PenLine size={14} />
            Share Your Experience
          </button>
          <p className="text-gray-400 dark:text-gray-500 text-[11px] mt-2">
            Reviewed stays are visible after approval by our team
          </p>
        </div>
      </div>

      {/* ── Write a Review Modal ── */}
      {showReviewModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-950/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#121417] border border-gray-800 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl text-white relative max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex justify-between items-start border-b border-gray-800 pb-4 mb-6">
              <div>
                <span className="text-xs font-bold text-[#cda85c] tracking-widest uppercase block mb-1">SHARE YOUR STAY</span>
                <h3 className="text-xl font-serif font-bold text-white">Write a Review</h3>
              </div>
              <button
                onClick={handleCloseReviewModal}
                className="w-8 h-8 rounded-full bg-gray-800 hover:bg-red-600 flex items-center justify-center text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {submitted ? (
              /* Success State */
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-emerald-500/20 border-2 border-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} className="text-emerald-400" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Thank You!</h4>
                <p className="text-gray-400 text-sm">
                  Your review has been submitted. It will appear on the website after our team approves it.
                </p>
                <button
                  onClick={handleCloseReviewModal}
                  className="mt-6 bg-[#cda85c] hover:bg-[#b89448] text-gray-950 font-bold py-2.5 px-8 rounded-xl text-sm uppercase tracking-wider transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              /* Review Form */
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                
                {/* Star Rating */}
                <div>
                  <label className="text-[11px] font-bold text-gray-400 tracking-widest uppercase block mb-2">Your Rating *</label>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          size={28}
                          fill={star <= reviewForm.rating ? '#cda85c' : 'transparent'}
                          className={star <= reviewForm.rating ? 'text-[#cda85c]' : 'text-gray-600'}
                        />
                      </button>
                    ))}
                    <span className="text-gray-400 text-sm ml-2 self-center">
                      {['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][reviewForm.rating]}
                    </span>
                  </div>
                </div>

                {/* Name & City */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-gray-400 tracking-widest uppercase block mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      disabled={submitting}
                      placeholder="Your name"
                      value={reviewForm.name}
                      onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                      className="w-full px-3 py-2.5 bg-[#181a1f] border border-gray-700 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#cda85c] transition-colors disabled:opacity-60"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-gray-400 tracking-widest uppercase block mb-1">City</label>
                    <input
                      type="text"
                      disabled={submitting}
                      placeholder="Your city"
                      value={reviewForm.city}
                      onChange={(e) => setReviewForm({ ...reviewForm, city: e.target.value })}
                      className="w-full px-3 py-2.5 bg-[#181a1f] border border-gray-700 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#cda85c] transition-colors disabled:opacity-60"
                    />
                  </div>
                </div>

                {/* Email & Stay Date */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-gray-400 tracking-widest uppercase block mb-1">Email</label>
                    <input
                      type="email"
                      disabled={submitting}
                      placeholder="(not shown publicly)"
                      value={reviewForm.email}
                      onChange={(e) => setReviewForm({ ...reviewForm, email: e.target.value })}
                      className="w-full px-3 py-2.5 bg-[#181a1f] border border-gray-700 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#cda85c] transition-colors disabled:opacity-60"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-gray-400 tracking-widest uppercase block mb-1">Stay Period</label>
                    <input
                      type="text"
                      disabled={submitting}
                      placeholder="e.g. July 2025"
                      value={reviewForm.stayDate}
                      onChange={(e) => setReviewForm({ ...reviewForm, stayDate: e.target.value })}
                      className="w-full px-3 py-2.5 bg-[#181a1f] border border-gray-700 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#cda85c] transition-colors disabled:opacity-60"
                    />
                  </div>
                </div>

                {/* Review Text */}
                <div>
                  <label className="text-[11px] font-bold text-gray-400 tracking-widest uppercase block mb-1">Your Review *</label>
                  <textarea
                    rows="4"
                    required
                    disabled={submitting}
                    placeholder="Tell us about your experience at Shivlok Palace..."
                    value={reviewForm.text}
                    onChange={(e) => setReviewForm({ ...reviewForm, text: e.target.value })}
                    maxLength={600}
                    className="w-full px-3 py-2.5 bg-[#181a1f] border border-gray-700 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#cda85c] transition-colors resize-none disabled:opacity-60"
                  />
                  <p className="text-[10px] text-gray-500 text-right mt-1">{reviewForm.text.length}/600</p>
                </div>

                {submitError && (
                  <p className="text-red-400 text-xs font-semibold bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
                    {submitError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#cda85c] hover:bg-[#b89448] text-gray-950 font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2.5 transition-all shadow-lg text-sm uppercase tracking-wider disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <><Loader2 size={16} className="animate-spin" /> SUBMITTING...</>
                  ) : (
                    <><Send size={16} /> SUBMIT REVIEW</>
                  )}
                </button>

                <p className="text-center text-[10px] text-gray-500">
                  Your review will appear after approval by our team. Email is never shown publicly.
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;
