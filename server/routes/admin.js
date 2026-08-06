const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth');
const Booking = require('../models/Booking');
const Inquiry = require('../models/Inquiry');
const Newsletter = require('../models/Newsletter');
const Review = require('../models/Review');
const TableReservation = require('../models/TableReservation');

// All admin routes require authentication
router.use(adminAuth);

// ─── GET /api/admin/stats ─────────────────────────────────────────────────────
// Dashboard summary: counts across all collections
router.get('/stats', async (req, res) => {
  try {
    const [
      totalBookings,
      pendingBookings,
      confirmedBookings,
      cancelledBookings,
      totalInquiries,
      newInquiries,
      totalSubscribers,
      totalReviews,
      pendingReviews,
      approvedReviews,
      totalTableReservations,
      pendingTableReservations,
    ] = await Promise.all([
      Booking.countDocuments(),
      Booking.countDocuments({ status: 'pending' }),
      Booking.countDocuments({ status: 'confirmed' }),
      Booking.countDocuments({ status: 'cancelled' }),
      Inquiry.countDocuments(),
      Inquiry.countDocuments({ status: 'new' }),
      Newsletter.countDocuments({ isActive: true }),
      Review.countDocuments(),
      Review.countDocuments({ isApproved: false }),
      Review.countDocuments({ isApproved: true }),
      TableReservation.countDocuments(),
      TableReservation.countDocuments({ status: 'pending' }),
    ]);

    // Revenue estimate (confirmed bookings only)
    const revenueAgg = await Booking.aggregate([
      { $match: { status: 'confirmed' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } },
    ]);
    const confirmedRevenue = revenueAgg[0]?.total || 0;

    // Recent 5 bookings
    const recentBookings = await Booking.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('bookingRef name roomType checkIn checkOut totalAmount status createdAt');

    // Recent 5 inquiries
    const recentInquiries = await Inquiry.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email phone status createdAt');

    return res.status(200).json({
      success: true,
      data: {
        bookings: {
          total: totalBookings,
          pending: pendingBookings,
          confirmed: confirmedBookings,
          cancelled: cancelledBookings,
          confirmedRevenue,
        },
        inquiries: {
          total: totalInquiries,
          new: newInquiries,
        },
        newsletter: {
          subscribers: totalSubscribers,
        },
        reviews: {
          total: totalReviews,
          pending: pendingReviews,
          approved: approvedReviews,
        },
        tableReservations: {
          total: totalTableReservations,
          pending: pendingTableReservations,
        },
        recent: {
          bookings: recentBookings,
          inquiries: recentInquiries,
        },
      },
    });
  } catch (err) {
    console.error('❌ Admin stats error:', err.message);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
