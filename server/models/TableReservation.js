const mongoose = require('mongoose');

const tableReservationSchema = new mongoose.Schema(
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

    // ─── Reservation Details ──────────────────────────────────────────
    date: {
      type: Date,
      required: [true, 'Reservation date is required'],
    },
    time: {
      type: String,
      required: [true, 'Reservation time is required'],
      trim: true,
    },
    guests: {
      type: Number,
      required: [true, 'Number of guests is required'],
      min: [1, 'At least 1 guest required'],
      max: [20, 'Maximum 20 guests per reservation'],
    },
    occasion: {
      type: String,
      enum: ['none', 'birthday', 'anniversary', 'business', 'family', 'other'],
      default: 'none',
    },
    seatingPreference: {
      type: String,
      enum: ['any', 'rooftop', 'indoor', 'ganga-view'],
      default: 'any',
    },
    specialRequests: {
      type: String,
      trim: true,
      maxlength: [400, 'Special requests cannot exceed 400 characters'],
      default: '',
    },

    // ─── Reservation Meta ─────────────────────────────────────────────
    reservationRef: {
      type: String,
      unique: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending',
    },
    adminNotes: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Auto-generate reservation reference before saving: RT-YYMMDD-XXXX
tableReservationSchema.pre('save', function (next) {
  if (!this.reservationRef) {
    const now = new Date();
    const yy = String(now.getFullYear()).slice(2);
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
    this.reservationRef = `RT-${yy}${mm}${dd}-${rand}`;
  }
  next();
});

tableReservationSchema.index({ status: 1, date: 1 });
tableReservationSchema.index({ email: 1 });

module.exports = mongoose.model('TableReservation', tableReservationSchema);
