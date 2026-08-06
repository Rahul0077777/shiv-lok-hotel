const express = require('express');
const router = express.Router();
const { body, param, validationResult } = require('express-validator');
const Review = require('../models/Review');
const adminAuth = require('../middleware/adminAuth');

// ─── Validation Rules ─────────────────────────────────────────────────────────
const reviewValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ max: 80 }).withMessage('Name cannot exceed 80 characters'),

  body('email')
    .optional()
    .trim()
    .isEmail().withMessage('Please enter a valid email address')
    .normalizeEmail(),

  body('city')
    .optional()
    .trim()
    .isLength({ max: 60 }).withMessage('City cannot exceed 60 characters'),

  body('rating')
    .notEmpty().withMessage('Rating is required')
    .isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),

  body('text')
    .trim()
    .notEmpty().withMessage('Review text is required')
    .isLength({ min: 10, max: 600 }).withMessage('Review must be between 10 and 600 characters'),

  body('stayDate')
    .optional()
    .trim()
    .isLength({ max: 30 }),

  body('platform')
    .optional()
    .isIn(['google', 'direct', 'tripadvisor', 'booking'])
    .withMessage('Invalid platform'),
];

// ─── GET /api/reviews ─────────────────────────────────────────────────────────
// Public: Fetch approved reviews for the website carousel
router.get('/', async (req, res) => {
  try {
    const { limit = 20, featured } = req.query;
    const filter = { isApproved: true };
    if (featured === 'true') filter.isFeatured = true;

    const reviews = await Review.find(filter)
      .sort({ isFeatured: -1, createdAt: -1 })
      .limit(parseInt(limit))
      .select('name city rating text avatar platform stayDate createdAt');

    return res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (err) {
    console.error('❌ Reviews fetch error:', err.message);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ─── POST /api/reviews ────────────────────────────────────────────────────────
// Public: Submit a guest review (saved as unapproved, pending admin moderation)
router.post('/', reviewValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
    });
  }

  const { name, email, city, rating, text, stayDate, platform } = req.body;

  try {
    // Prevent duplicate review from same email (if provided)
    if (email) {
      const existing = await Review.findOne({ email });
      if (existing) {
        return res.status(409).json({
          success: false,
          message: 'A review from this email already exists.',
        });
      }
    }

    await Review.create({
      name,
      email: email || undefined,
      city: city || '',
      rating: parseInt(rating),
      text,
      stayDate: stayDate || '',
      platform: platform || 'direct',
      isApproved: false,
    });

    return res.status(201).json({
      success: true,
      message: 'Thank you for your review! It will appear after our team approves it.',
    });
  } catch (err) {
    console.error('❌ Review save error:', err.message);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again.',
    });
  }
});

// ─── GET /api/reviews/all ─────────────────────────────────────────────────────
// Admin: Fetch all reviews (including unapproved)
router.get('/all', adminAuth, async (req, res) => {
  try {
    const { approved, limit = 100 } = req.query;
    const filter = {};
    if (approved === 'true') filter.isApproved = true;
    if (approved === 'false') filter.isApproved = false;

    const [reviews, total] = await Promise.all([
      Review.find(filter)
        .sort({ createdAt: -1 })
        .limit(parseInt(limit))
        .select('-__v'),
      Review.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      total,
      count: reviews.length,
      data: reviews,
    });
  } catch (err) {
    console.error('❌ Admin reviews fetch error:', err.message);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ─── PUT /api/reviews/:id/approve ─────────────────────────────────────────────
// Admin: Approve or un-approve a review
router.put(
  '/:id/approve',
  adminAuth,
  [param('id').isMongoId().withMessage('Invalid review ID')],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const review = await Review.findByIdAndUpdate(
        req.params.id,
        {
          isApproved: req.body.isApproved !== false, // default true
          ...(req.body.isFeatured !== undefined && { isFeatured: req.body.isFeatured }),
        },
        { new: true, select: '-__v' }
      );

      if (!review) {
        return res.status(404).json({ success: false, message: 'Review not found' });
      }

      return res.status(200).json({
        success: true,
        message: `Review ${review.isApproved ? 'approved' : 'unapproved'} successfully`,
        data: review,
      });
    } catch (err) {
      console.error('❌ Review approve error:', err.message);
      return res.status(500).json({ success: false, message: 'Server error' });
    }
  }
);

// ─── DELETE /api/reviews/:id ──────────────────────────────────────────────────
// Admin: Delete a review
router.delete(
  '/:id',
  adminAuth,
  [param('id').isMongoId().withMessage('Invalid review ID')],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const review = await Review.findByIdAndDelete(req.params.id);

      if (!review) {
        return res.status(404).json({ success: false, message: 'Review not found' });
      }

      return res.status(200).json({
        success: true,
        message: 'Review deleted successfully',
      });
    } catch (err) {
      console.error('❌ Review delete error:', err.message);
      return res.status(500).json({ success: false, message: 'Server error' });
    }
  }
);

module.exports = router;
