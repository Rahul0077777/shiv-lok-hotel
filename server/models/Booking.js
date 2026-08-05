const mongoose = require('mongoose');

// Auto-generate a unique booking reference: SP-YYMMDD-XXXX
const generateBookingRef = () => {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(2);
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `SP-${yy}${mm}${dd}-${rand}`;
};

const bookingSchema = new mongoose.Schema(
  {
    // ─── Guest Details ────────────────────────────────────────────────
    name: {
      type: String,
      required: [true, 'Guest name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      maxlength: [20, 'Phone cannot exceed 20 characters'],
    },

    // ─── Stay Details ─────────────────────────────────────────────────
    checkIn: {
      type: Date,
      required: [true, 'Check-in date is required'],
    },
    checkOut: {
      type: Date,
      required: [true, 'Check-out date is required'],
    },
    roomType: {
      type: String,
      required: [true, 'Room type is required'],
      enum: {
        values: ['Deluxe Room', 'Premium Room', 'Family Suite'],
        message: 'Invalid room type',
      },
    },
    guests: {
      type: Number,
      default: 2,
      min: [1, 'At least 1 guest required'],
      max: [8, 'Maximum 8 guests allowed'],
    },
    nights: {
      type: Number,
      required: true,
      min: [1, 'Minimum stay is 1 night'],
    },
    pricePerNight: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    specialRequests: {
      type: String,
      trim: true,
      maxlength: [500, 'Special requests cannot exceed 500 characters'],
      default: '',
    },

    // ─── Booking Meta ─────────────────────────────────────────────────
    bookingRef: {
      type: String,
      unique: true,
      default: generateBookingRef,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending',
    },
    source: {
      type: String,
      enum: ['website', 'whatsapp', 'phone', 'email'],
      default: 'website',
    },
    adminNotes: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

// Index for fast admin queries
bookingSchema.index({ status: 1, createdAt: -1 });
bookingSchema.index({ email: 1 });
bookingSchema.index({ checkIn: 1 });

module.exports = mongoose.model('Booking', bookingSchema);
