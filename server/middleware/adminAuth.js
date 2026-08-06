/**
 * adminAuth middleware
 * ────────────────────
 * Protects admin-only endpoints with a static Bearer token.
 * Usage: router.get('/all', adminAuth, handler)
 *
 * The client must send:
 *   Authorization: Bearer <ADMIN_SECRET>
 */
const adminAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'] || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : null;

  if (!token || token !== process.env.ADMIN_SECRET) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized. Valid admin token required.',
    });
  }

  next();
};

module.exports = adminAuth;
