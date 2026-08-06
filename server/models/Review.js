const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    // ─── Reviewer Info ────────────────────────────────────────────────
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [80, 'Name cannot exceed 80 characters'],
    },
    city: {
      type: String,
      trim: true,
      maxlength: [60, 'City cannot exceed 60 characters'],
      default: '',
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
      // Not publicly displayed — stored for deduplication only
    },

    // ─── Review Content ───────────────────────────────────────────────
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5'],
    },
    text: {
      type: String,
      required: [true, 'Review text is required'],
      trim: true,
      minlength: [10, 'Review must be at least 10 characters'],
      maxlength: [600, 'Review cannot exceed 600 characters'],
    },
    avatar: {
      type: String,
      default: '', // empty = use initials fallback on frontend
    },

    // ─── Meta ─────────────────────────────────────────────────────────
    platform: {
      type: String,
      enum: ['google', 'direct', 'tripadvisor', 'booking'],
      default: 'direct',
    },
    isApproved: {
      type: Boolean,
      default: false, // admin must approve before it shows publicly
    },
    isFeatured: {
      type: Boolean,
      default: false, // admin can feature top reviews
    },
    stayDate: {
      type: String, // e.g., "July 2025" — guest provides
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Only approved reviews for public queries
reviewSchema.index({ isApproved: 1, createdAt: -1 });
reviewSchema.index({ rating: -1 });

module.exports = mongoose.model('Review', reviewSchema);
