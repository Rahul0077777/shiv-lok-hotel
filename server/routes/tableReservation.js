const express = require('express');
const router = express.Router();
const { body, param, validationResult } = require('express-validator');
const TableReservation = require('../models/TableReservation');
const adminAuth = require('../middleware/adminAuth');
const { sendTableReservationEmails } = require('../utils/mailer');

// ─── Available time slots ─────────────────────────────────────────────────────
const VALID_TIMES = [
  '07:00 AM', '07:30 AM', '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM',
  '10:00 AM', '10:30 AM', '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM',
  '02:00 PM', '02:30 PM', '03:00 PM', '07:00 PM', '07:30 PM', '08:00 PM',
  '08:30 PM', '09:00 PM', '09:30 PM', '10:00 PM',
];

// ─── Validation Rules ─────────────────────────────────────────────────────────
const reservationValidation = [
  body('name')
    .trim().notEmpty().withMessage('Name is required')
    .isLength({ max: 100 }).withMessage('Name cannot exceed 100 characters'),

  body('email')
    .trim().notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email')
    .normalizeEmail(),

  body('phone')
    .trim().notEmpty().withMessage('Phone number is required')
    .isLength({ min: 7, max: 20 }).withMessage('Please enter a valid phone number'),

  body('date')
    .notEmpty().withMessage('Date is required')
    .isISO8601().withMessage('Invalid date format'),

  body('time')
    .notEmpty().withMessage('Time is required')
    .isIn(VALID_TIMES).withMessage('Invalid time slot'),

  body('guests')
    .notEmpty().withMessage('Number of guests is required')
    .isInt({ min: 1, max: 20 }).withMessage('Guests must be between 1 and 20'),

  body('occasion')
    .optional()
    .isIn(['none', 'birthday', 'anniversary', 'business', 'family', 'other'])
    .withMessage('Invalid occasion'),

  body('seatingPreference')
    .optional()
    .isIn(['any', 'rooftop', 'indoor', 'ganga-view'])
    .withMessage('Invalid seating preference'),

  body('specialRequests')
    .optional().trim()
    .isLength({ max: 400 }).withMessage('Special requests cannot exceed 400 characters'),
];

// ─── POST /api/table-reservation ──────────────────────────────────────────────
// Public: Create a new table reservation
router.post('/', reservationValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
    });
  }

  const { name, email, phone, date, time, guests, occasion, seatingPreference, specialRequests } = req.body;

  // Ensure date is not in the past
  const reservationDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (reservationDate < today) {
    return res.status(400).json({
      success: false,
      message: 'Reservation date cannot be in the past.',
    });
  }

  try {
    const reservation = await TableReservation.create({
      name,
      email,
      phone,
      date: reservationDate,
      time,
      guests: parseInt(guests),
      occasion: occasion || 'none',
      seatingPreference: seatingPreference || 'any',
      specialRequests: specialRequests || '',
    });

    // Send emails (non-blocking)
    sendTableReservationEmails({
      name, email, phone, date, time,
      guests: parseInt(guests),
      occasion: occasion || 'none',
      seatingPreference: seatingPreference || 'any',
      specialRequests: specialRequests || '',
      reservationRef: reservation.reservationRef,
    }).catch((err) => {
      console.error('⚠️  Email send error (table reservation):', err.message);
    });

    return res.status(201).json({
      success: true,
      message: 'Table reserved! Confirmation sent to your email.',
      data: {
        reservationRef: reservation.reservationRef,
        status: reservation.status,
        date,
        time,
        guests: parseInt(guests),
      },
    });
  } catch (err) {
    console.error('❌ Table reservation error:', err.message);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again or call us directly.',
    });
  }
});

// ─── GET /api/table-reservation ───────────────────────────────────────────────
// Admin: List all reservations
router.get('/', adminAuth, async (req, res) => {
  try {
    const { status, limit = 100 } = req.query;
    const filter = {};
    if (status && ['pending', 'confirmed', 'cancelled'].includes(status)) {
      filter.status = status;
    }

    const [reservations, total] = await Promise.all([
      TableReservation.find(filter)
        .sort({ date: 1, time: 1 })
        .limit(parseInt(limit))
        .select('-__v'),
      TableReservation.countDocuments(filter),
    ]);

    return res.status(200).json({ success: true, total, count: reservations.length, data: reservations });
  } catch (err) {
    console.error('❌ Table reservation fetch error:', err.message);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ─── PUT /api/table-reservation/:id/status ────────────────────────────────────
// Admin: Update reservation status
router.put(
  '/:id/status',
  adminAuth,
  [
    param('id').isMongoId().withMessage('Invalid reservation ID'),
    body('status').isIn(['pending', 'confirmed', 'cancelled']).withMessage('Invalid status'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const reservation = await TableReservation.findByIdAndUpdate(
        req.params.id,
        {
          status: req.body.status,
          ...(req.body.adminNotes !== undefined && { adminNotes: req.body.adminNotes }),
        },
        { new: true, select: '-__v' }
      );

      if (!reservation) {
        return res.status(404).json({ success: false, message: 'Reservation not found' });
      }

      return res.status(200).json({
        success: true,
        message: `Reservation status updated to "${req.body.status}"`,
        data: reservation,
      });
    } catch (err) {
      console.error('❌ Reservation status update error:', err.message);
      return res.status(500).json({ success: false, message: 'Server error' });
    }
  }
);

module.exports = router;
