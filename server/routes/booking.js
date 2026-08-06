const express = require('express');
const router = express.Router();
const { body, param, validationResult } = require('express-validator');
const Booking = require('../models/Booking');
const adminAuth = require('../middleware/adminAuth');
const { sendBookingEmails } = require('../utils/mailer');

// ─── Room price map ───────────────────────────────────────────────────────────
const ROOM_PRICES = {
  'Deluxe Room': 3200,
  'Premium Room': 4500,
  'Family Suite': 7500,
};

// ─── Validation Rules ─────────────────────────────────────────────────────────
const bookingValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Guest name is required')
    .isLength({ max: 100 }).withMessage('Name cannot exceed 100 characters'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email address')
    .normalizeEmail(),

  body('phone')
    .trim()
    .notEmpty().withMessage('Phone number is required')
    .isLength({ min: 7, max: 20 }).withMessage('Please enter a valid phone number'),

  body('checkIn')
    .notEmpty().withMessage('Check-in date is required')
    .isISO8601().withMessage('Invalid check-in date format'),

  body('checkOut')
    .notEmpty().withMessage('Check-out date is required')
    .isISO8601().withMessage('Invalid check-out date format'),

  body('roomType')
    .notEmpty().withMessage('Room type is required')
    .isIn(['Deluxe Room', 'Premium Room', 'Family Suite'])
    .withMessage('Invalid room type'),

  body('guests')
    .optional()
    .isInt({ min: 1, max: 8 }).withMessage('Guests must be between 1 and 8'),

  body('specialRequests')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Special requests cannot exceed 500 characters'),
];

// ─── POST /api/booking ─────────────────────────────────────────────────────────
// Public: Create a new room booking
router.post('/', bookingValidation, async (req, res) => {
  // Validate inputs
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
    });
  }

  const { name, email, phone, checkIn, checkOut, roomType, guests, specialRequests } = req.body;

  // Validate date logic
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  if (checkOutDate <= checkInDate) {
    return res.status(400).json({
      success: false,
      message: 'Check-out date must be after check-in date.',
    });
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (checkInDate < today) {
    return res.status(400).json({
      success: false,
      message: 'Check-in date cannot be in the past.',
    });
  }

  // Compute nights and total
  const msPerDay = 1000 * 60 * 60 * 24;
  const nights = Math.round((checkOutDate - checkInDate) / msPerDay);
  const pricePerNight = ROOM_PRICES[roomType] || 3200;
  const totalAmount = nights * pricePerNight;

  try {
    const booking = await Booking.create({
      name,
      email,
      phone,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      roomType,
      guests: guests || (roomType === 'Family Suite' ? 4 : 2),
      nights,
      pricePerNight,
      totalAmount,
      specialRequests: specialRequests || '',
    });

    // Send confirmation emails (non-blocking)
    sendBookingEmails({
      name,
      email,
      phone,
      checkIn,
      checkOut,
      roomType,
      nights,
      totalAmount,
      bookingRef: booking.bookingRef,
      specialRequests: specialRequests || '',
    }).catch((err) => {
      console.error('⚠️  Email send error (booking):', err.message);
    });

    return res.status(201).json({
      success: true,
      message: 'Booking request received! Confirmation sent to your email.',
      data: {
        bookingRef: booking.bookingRef,
        status: booking.status,
        nights,
        totalAmount,
        roomType,
      },
    });
  } catch (err) {
    console.error('❌ Booking save error:', err.message);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again or contact us directly.',
    });
  }
});

// ─── GET /api/booking ─────────────────────────────────────────────────────────
// Admin: List all bookings (newest first), filterable by status
router.get('/', adminAuth, async (req, res) => {
  try {
    const { status, limit = 100, page = 1 } = req.query;
    const filter = {};
    if (status && ['pending', 'confirmed', 'cancelled'].includes(status)) {
      filter.status = status;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [bookings, total] = await Promise.all([
      Booking.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .select('-__v'),
      Booking.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      total,
      count: bookings.length,
      page: parseInt(page),
      data: bookings,
    });
  } catch (err) {
    console.error('❌ Booking fetch error:', err.message);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ─── PUT /api/booking/:id/status ─────────────────────────────────────────────
// Admin: Update booking status
router.put(
  '/:id/status',
  adminAuth,
  [
    param('id').isMongoId().withMessage('Invalid booking ID'),
    body('status')
      .isIn(['pending', 'confirmed', 'cancelled'])
      .withMessage('Invalid status value'),
    body('adminNotes').optional().trim().isLength({ max: 500 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const booking = await Booking.findByIdAndUpdate(
        req.params.id,
        {
          status: req.body.status,
          ...(req.body.adminNotes !== undefined && { adminNotes: req.body.adminNotes }),
        },
        { new: true, select: '-__v' }
      );

      if (!booking) {
        return res.status(404).json({ success: false, message: 'Booking not found' });
      }

      return res.status(200).json({
        success: true,
        message: `Booking status updated to "${req.body.status}"`,
        data: booking,
      });
    } catch (err) {
      console.error('❌ Booking status update error:', err.message);
      return res.status(500).json({ success: false, message: 'Server error' });
    }
  }
);

// ─── GET /api/booking/:ref ────────────────────────────────────────────────────
// Public: Look up a booking by its reference number
router.get('/:ref', async (req, res) => {
  try {
    const booking = await Booking.findOne({ bookingRef: req.params.ref.toUpperCase() })
      .select('bookingRef name roomType checkIn checkOut nights totalAmount status createdAt');

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking reference not found' });
    }

    return res.status(200).json({ success: true, data: booking });
  } catch (err) {
    console.error('❌ Booking lookup error:', err.message);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
