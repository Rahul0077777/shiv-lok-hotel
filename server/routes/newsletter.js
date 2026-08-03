const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Newsletter = require('../models/Newsletter');
const { sendNewsletterWelcome } = require('../utils/mailer');

// Validation rules
const newsletterValidation = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email address')
    .normalizeEmail(),
];

// POST /api/newsletter
router.post('/', newsletterValidation, async (req, res) => {
  // Validate inputs
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array()[0].msg,
    });
  }

  const { email } = req.body;

  try {
    // Check if already subscribed
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: 'This email is already subscribed to our newsletter.',
      });
    }

    // Save new subscriber
    await Newsletter.create({ email });

    // Send welcome email (non-blocking)
    sendNewsletterWelcome(email).catch((err) => {
      console.error('⚠️  Email send error (newsletter):', err.message);
    });

    return res.status(201).json({
      success: true,
      message: 'Successfully subscribed! Check your inbox for a welcome email.',
    });
  } catch (err) {
    // Handle MongoDB duplicate key error (race condition safety)
    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'This email is already subscribed to our newsletter.',
      });
    }
    console.error('❌ Newsletter save error:', err.message);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again.',
    });
  }
});

// GET /api/newsletter (admin view — list all subscribers)
router.get('/', async (req, res) => {
  try {
    const subscribers = await Newsletter.find({ isActive: true })
      .sort({ createdAt: -1 })
      .select('email createdAt')
      .limit(500);

    return res.status(200).json({
      success: true,
      count: subscribers.length,
      data: subscribers,
    });
  } catch (err) {
    console.error('❌ Newsletter fetch error:', err.message);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
