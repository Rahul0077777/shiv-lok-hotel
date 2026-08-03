const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Inquiry = require('../models/Inquiry');
const { sendInquiryEmails } = require('../utils/mailer');

// Validation rules
const inquiryValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
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

  body('message')
    .trim()
    .notEmpty().withMessage('Message is required')
    .isLength({ min: 10, max: 2000 }).withMessage('Message must be between 10 and 2000 characters'),
];

// POST /api/inquiry
router.post('/', inquiryValidation, async (req, res) => {
  // Validate inputs
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
    });
  }

  const { name, email, phone, message } = req.body;

  try {
    // Save inquiry to MongoDB
    const inquiry = await Inquiry.create({ name, email, phone, message });

    // Send emails (non-blocking — don't fail the request if email fails)
    sendInquiryEmails({ name, email, phone, message }).catch((err) => {
      console.error('⚠️  Email send error (inquiry):', err.message);
    });

    return res.status(201).json({
      success: true,
      message: 'Your inquiry has been received! We will get back to you within 24 hours.',
      data: { id: inquiry._id },
    });
  } catch (err) {
    console.error('❌ Inquiry save error:', err.message);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again or call us directly.',
    });
  }
});

// GET /api/inquiry (admin view — list all inquiries, newest first)
router.get('/', async (req, res) => {
  try {
    const inquiries = await Inquiry.find()
      .sort({ createdAt: -1 })
      .select('-__v')
      .limit(100);

    return res.status(200).json({
      success: true,
      count: inquiries.length,
      data: inquiries,
    });
  } catch (err) {
    console.error('❌ Inquiry fetch error:', err.message);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
