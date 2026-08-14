const nodemailer = require('nodemailer');

// Create reusable transporter using Gmail SMTP
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// ─── Email Templates ───────────────────────────────────────────────

/**
 * HTML template for admin notification when a new inquiry arrives
 */
const adminInquiryTemplate = ({ name, email, phone, message, date }) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Guest Inquiry — Shivlok Palace</title>
</head>
<body style="margin:0;padding:0;background:#f4f1ec;font-family:'Helvetica Neue',Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:24px;">

    <div style="background:#1a1208;border-radius:12px 12px 0 0;padding:28px 32px;text-align:center;">
      <h1 style="color:#cda85c;margin:0;font-size:22px;letter-spacing:2px;">SHIVLOK PALACE</h1>
      <p style="color:#9b8f7a;margin:6px 0 0;font-size:12px;letter-spacing:1px;">VARANASI, INDIA</p>
    </div>

    <div style="background:#ffffff;padding:32px;border:1px solid #e8e0d4;">
      <div style="border-left:4px solid #cda85c;padding-left:16px;margin-bottom:24px;">
        <h2 style="margin:0;color:#1a1208;font-size:18px;">📩 New Guest Inquiry Received</h2>
        <p style="margin:6px 0 0;color:#7a6f5e;font-size:13px;">${date}</p>
      </div>

      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:12px;background:#faf8f5;border:1px solid #ede8e0;width:30%;color:#7a6f5e;font-size:13px;font-weight:600;">Guest Name</td>
          <td style="padding:12px;background:#ffffff;border:1px solid #ede8e0;color:#1a1208;font-size:14px;font-weight:700;">${name}</td>
        </tr>
        <tr>
          <td style="padding:12px;background:#faf8f5;border:1px solid #ede8e0;color:#7a6f5e;font-size:13px;font-weight:600;">Email</td>
          <td style="padding:12px;background:#ffffff;border:1px solid #ede8e0;"><a href="mailto:${email}" style="color:#cda85c;text-decoration:none;font-size:14px;">${email}</a></td>
        </tr>
        <tr>
          <td style="padding:12px;background:#faf8f5;border:1px solid #ede8e0;color:#7a6f5e;font-size:13px;font-weight:600;">Phone</td>
          <td style="padding:12px;background:#ffffff;border:1px solid #ede8e0;"><a href="tel:${phone}" style="color:#cda85c;text-decoration:none;font-size:14px;">${phone}</a></td>
        </tr>
        <tr>
          <td style="padding:12px;background:#faf8f5;border:1px solid #ede8e0;color:#7a6f5e;font-size:13px;font-weight:600;vertical-align:top;">Message</td>
          <td style="padding:12px;background:#ffffff;border:1px solid #ede8e0;color:#1a1208;font-size:14px;line-height:1.6;">${message}</td>
        </tr>
      </table>

      <div style="margin-top:24px;text-align:center;">
        <a href="mailto:${email}?subject=Re: Your Inquiry at Shivlok Palace" 
           style="display:inline-block;background:#cda85c;color:#1a1208;font-weight:700;text-decoration:none;padding:12px 28px;border-radius:6px;font-size:13px;letter-spacing:1px;">
          REPLY TO GUEST
        </a>
      </div>
    </div>

    <div style="background:#1a1208;border-radius:0 0 12px 12px;padding:16px 32px;text-align:center;">
      <p style="color:#7a6f5e;margin:0;font-size:11px;">Shivlok Palace Hotel · Varanasi, India · shivlokpalace.vns@gmail.com</p>
    </div>

  </div>
</body>
</html>
`;

/**
 * HTML template for guest confirmation email
 */
const guestConfirmationTemplate = ({ name }) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You — Shivlok Palace</title>
</head>
<body style="margin:0;padding:0;background:#f4f1ec;font-family:'Helvetica Neue',Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:24px;">

    <div style="background:#1a1208;border-radius:12px 12px 0 0;padding:28px 32px;text-align:center;">
      <h1 style="color:#cda85c;margin:0;font-size:22px;letter-spacing:2px;">SHIVLOK PALACE</h1>
      <p style="color:#9b8f7a;margin:6px 0 0;font-size:12px;letter-spacing:1px;">VARANASI, INDIA</p>
    </div>

    <div style="background:#ffffff;padding:40px 32px;border:1px solid #e8e0d4;text-align:center;">
      <div style="width:56px;height:56px;background:#f0ead8;border-radius:50%;margin:0 auto 20px;display:flex;align-items:center;justify-content:center;font-size:28px;">🙏</div>
      <h2 style="color:#1a1208;margin:0 0 12px;font-size:22px;">Thank You, ${name}!</h2>
      <p style="color:#5a4e3e;font-size:15px;line-height:1.7;margin:0 0 24px;">
        We have received your inquiry and our team will get back to you within <strong style="color:#cda85c;">24 hours</strong>.
      </p>

      <div style="background:#faf8f5;border:1px solid #ede8e0;border-radius:8px;padding:20px;text-align:left;margin-bottom:28px;">
        <p style="margin:0 0 10px;color:#7a6f5e;font-size:12px;font-weight:700;letter-spacing:1px;">FOR IMMEDIATE ASSISTANCE</p>
        <p style="margin:0 0 6px;color:#1a1208;font-size:14px;">📞 <a href="tel:+918470905123" style="color:#cda85c;text-decoration:none;font-weight:700;">+91 84709 05123</a> (Reservation)</p>
        <p style="margin:0;color:#1a1208;font-size:14px;">✉️ <a href="mailto:shivlokpalace.vns@gmail.com" style="color:#cda85c;text-decoration:none;font-weight:700;">shivlokpalace.vns@gmail.com</a></p>
      </div>

      <p style="color:#9b8f7a;font-size:12px;line-height:1.7;margin:0;">
        D-34/183, Ganesh Mahal Road, Jangambadi, Near Godowlia Chauraha, Varanasi – 221001<br>
        Check-in: 01:00 PM | Check-out: 11:00 AM
      </p>
    </div>

    <div style="background:#1a1208;border-radius:0 0 12px 12px;padding:16px 32px;text-align:center;">
      <p style="color:#7a6f5e;margin:0;font-size:11px;">© 2026 Shivlok Palace. All Rights Reserved.</p>
    </div>

  </div>
</body>
</html>
`;

/**
 * HTML template for newsletter welcome email
 */
const newsletterWelcomeTemplate = () => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome — Shivlok Palace Newsletter</title>
</head>
<body style="margin:0;padding:0;background:#f4f1ec;font-family:'Helvetica Neue',Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:24px;">

    <div style="background:#1a1208;border-radius:12px 12px 0 0;padding:28px 32px;text-align:center;">
      <h1 style="color:#cda85c;margin:0;font-size:22px;letter-spacing:2px;">SHIVLOK PALACE</h1>
      <p style="color:#9b8f7a;margin:6px 0 0;font-size:12px;letter-spacing:1px;">VARANASI, INDIA</p>
    </div>

    <div style="background:#ffffff;padding:40px 32px;border:1px solid #e8e0d4;text-align:center;">
      <div style="font-size:40px;margin-bottom:16px;">✨</div>
      <h2 style="color:#1a1208;margin:0 0 12px;font-size:22px;">You're Now Subscribed!</h2>
      <p style="color:#5a4e3e;font-size:15px;line-height:1.7;margin:0 0 24px;">
        Welcome to the Shivlok Palace newsletter. You'll be the first to receive<br>
        <strong style="color:#cda85c;">exclusive offers, seasonal packages</strong> and updates from the<br>
        Spiritual Capital of India.
      </p>

      <div style="border-top:1px solid #ede8e0;border-bottom:1px solid #ede8e0;padding:20px 0;margin-bottom:24px;">
        <p style="color:#7a6f5e;font-size:12px;margin:0 0 12px;font-weight:700;letter-spacing:1px;">WHAT TO EXPECT</p>
        <p style="color:#1a1208;font-size:13px;margin:0 0 8px;">🏨 &nbsp;Special room offers & weekend deals</p>
        <p style="color:#1a1208;font-size:13px;margin:0 0 8px;">🍽️ &nbsp;Restaurant & dining event updates</p>
        <p style="color:#1a1208;font-size:13px;margin:0;">🕯️ &nbsp;Ganga Aarti & spiritual experience guides</p>
      </div>

      <p style="color:#9b8f7a;font-size:11px;margin:0;">
        You can unsubscribe anytime by contacting shivlokpalace.vns@gmail.com
      </p>
    </div>

    <div style="background:#1a1208;border-radius:0 0 12px 12px;padding:16px 32px;text-align:center;">
      <p style="color:#7a6f5e;margin:0;font-size:11px;">© 2026 Shivlok Palace. All Rights Reserved.</p>
    </div>

  </div>
</body>
</html>
`;

// ─── Booking Email Templates ──────────────────────────────────────

/**
 * Admin notification template for a new room booking
 */
const adminBookingTemplate = ({ name, email, phone, checkIn, checkOut, roomType, nights, totalAmount, bookingRef, specialRequests, date }) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Booking — Shivlok Palace</title>
</head>
<body style="margin:0;padding:0;background:#f4f1ec;font-family:'Helvetica Neue',Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:24px;">

    <div style="background:#1a1208;border-radius:12px 12px 0 0;padding:28px 32px;text-align:center;">
      <h1 style="color:#cda85c;margin:0;font-size:22px;letter-spacing:2px;">SHIVLOK PALACE</h1>
      <p style="color:#9b8f7a;margin:6px 0 0;font-size:12px;letter-spacing:1px;">VARANASI, INDIA</p>
    </div>

    <div style="background:#ffffff;padding:32px;border:1px solid #e8e0d4;">
      <div style="background:#cda85c;color:#1a1208;border-radius:8px;padding:12px 20px;display:inline-block;margin-bottom:20px;">
        <span style="font-size:11px;font-weight:700;letter-spacing:2px;">NEW BOOKING REQUEST</span>
      </div>
      <div style="border-left:4px solid #cda85c;padding-left:16px;margin-bottom:24px;">
        <h2 style="margin:0;color:#1a1208;font-size:18px;">🏨 Room Booking Received</h2>
        <p style="margin:4px 0 0;color:#7a6f5e;font-size:13px;">${date}</p>
        <p style="margin:4px 0 0;color:#cda85c;font-size:13px;font-weight:700;">Ref: ${bookingRef}</p>
      </div>

      <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
        <tr>
          <td style="padding:10px 12px;background:#faf8f5;border:1px solid #ede8e0;width:35%;color:#7a6f5e;font-size:12px;font-weight:600;">Guest Name</td>
          <td style="padding:10px 12px;background:#fff;border:1px solid #ede8e0;color:#1a1208;font-size:13px;font-weight:700;">${name}</td>
        </tr>
        <tr>
          <td style="padding:10px 12px;background:#faf8f5;border:1px solid #ede8e0;color:#7a6f5e;font-size:12px;font-weight:600;">Email</td>
          <td style="padding:10px 12px;background:#fff;border:1px solid #ede8e0;"><a href="mailto:${email}" style="color:#cda85c;text-decoration:none;font-size:13px;">${email}</a></td>
        </tr>
        <tr>
          <td style="padding:10px 12px;background:#faf8f5;border:1px solid #ede8e0;color:#7a6f5e;font-size:12px;font-weight:600;">Phone</td>
          <td style="padding:10px 12px;background:#fff;border:1px solid #ede8e0;"><a href="tel:${phone}" style="color:#cda85c;text-decoration:none;font-size:13px;">${phone}</a></td>
        </tr>
        <tr>
          <td style="padding:10px 12px;background:#faf8f5;border:1px solid #ede8e0;color:#7a6f5e;font-size:12px;font-weight:600;">Room Type</td>
          <td style="padding:10px 12px;background:#fff;border:1px solid #ede8e0;color:#1a1208;font-size:13px;font-weight:700;">${roomType}</td>
        </tr>
        <tr>
          <td style="padding:10px 12px;background:#faf8f5;border:1px solid #ede8e0;color:#7a6f5e;font-size:12px;font-weight:600;">Check-In</td>
          <td style="padding:10px 12px;background:#fff;border:1px solid #ede8e0;color:#1a1208;font-size:13px;">${checkIn} (From 01:00 PM)</td>
        </tr>
        <tr>
          <td style="padding:10px 12px;background:#faf8f5;border:1px solid #ede8e0;color:#7a6f5e;font-size:12px;font-weight:600;">Check-Out</td>
          <td style="padding:10px 12px;background:#fff;border:1px solid #ede8e0;color:#1a1208;font-size:13px;">${checkOut} (Until 11:00 AM)</td>
        </tr>
        <tr>
          <td style="padding:10px 12px;background:#faf8f5;border:1px solid #ede8e0;color:#7a6f5e;font-size:12px;font-weight:600;">Nights</td>
          <td style="padding:10px 12px;background:#fff;border:1px solid #ede8e0;color:#1a1208;font-size:13px;">${nights} Night${nights > 1 ? 's' : ''}</td>
        </tr>
        <tr>
          <td style="padding:10px 12px;background:#faf8f5;border:1px solid #ede8e0;color:#7a6f5e;font-size:12px;font-weight:600;">Est. Total</td>
          <td style="padding:10px 12px;background:#fff;border:1px solid #ede8e0;color:#cda85c;font-size:15px;font-weight:700;">₹${totalAmount.toLocaleString('en-IN')} + Taxes</td>
        </tr>
        ${specialRequests ? `<tr><td style="padding:10px 12px;background:#faf8f5;border:1px solid #ede8e0;color:#7a6f5e;font-size:12px;font-weight:600;vertical-align:top;">Special Requests</td><td style="padding:10px 12px;background:#fff;border:1px solid #ede8e0;color:#1a1208;font-size:13px;line-height:1.6;">${specialRequests}</td></tr>` : ''}
      </table>

      <div style="margin-top:20px;text-align:center;">
        <a href="mailto:${email}?subject=Booking Confirmation ${bookingRef} — Shivlok Palace"
           style="display:inline-block;background:#cda85c;color:#1a1208;font-weight:700;text-decoration:none;padding:12px 28px;border-radius:6px;font-size:13px;letter-spacing:1px;">
          REPLY & CONFIRM BOOKING
        </a>
      </div>
    </div>

    <div style="background:#1a1208;border-radius:0 0 12px 12px;padding:16px 32px;text-align:center;">
      <p style="color:#7a6f5e;margin:0;font-size:11px;">Shivlok Palace Hotel · Varanasi, India · shivlokpalace.vns@gmail.com</p>
    </div>

  </div>
</body>
</html>
`;

/**
 * Guest booking confirmation email template
 */
const guestBookingTemplate = ({ name, bookingRef, checkIn, checkOut, roomType, nights, totalAmount }) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Booking Received — Shivlok Palace</title>
</head>
<body style="margin:0;padding:0;background:#f4f1ec;font-family:'Helvetica Neue',Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:24px;">

    <div style="background:#1a1208;border-radius:12px 12px 0 0;padding:28px 32px;text-align:center;">
      <h1 style="color:#cda85c;margin:0;font-size:22px;letter-spacing:2px;">SHIVLOK PALACE</h1>
      <p style="color:#9b8f7a;margin:6px 0 0;font-size:12px;letter-spacing:1px;">VARANASI, INDIA</p>
    </div>

    <div style="background:#ffffff;padding:40px 32px;border:1px solid #e8e0d4;text-align:center;">
      <div style="width:60px;height:60px;background:#f0ead8;border-radius:50%;margin:0 auto 16px;display:flex;align-items:center;justify-content:center;font-size:30px;">🏨</div>
      <h2 style="color:#1a1208;margin:0 0 8px;font-size:22px;">Booking Request Received!</h2>
      <p style="color:#5a4e3e;font-size:14px;line-height:1.7;margin:0 0 24px;">
        Dear <strong>${name}</strong>, we have received your booking request.<br>
        Our team will confirm availability within <strong style="color:#cda85c;">2 hours</strong>.
      </p>

      <div style="background:#faf8f5;border:2px solid #cda85c;border-radius:10px;padding:16px 20px;text-align:left;margin-bottom:24px;">
        <p style="margin:0 0 12px;color:#7a6f5e;font-size:11px;font-weight:700;letter-spacing:1.5px;text-align:center;">YOUR BOOKING REFERENCE</p>
        <p style="margin:0 0 16px;color:#cda85c;font-size:26px;font-weight:800;letter-spacing:3px;text-align:center;">${bookingRef}</p>
        <table style="width:100%;font-size:13px;">
          <tr>
            <td style="padding:5px 0;color:#7a6f5e;">Room:</td>
            <td style="padding:5px 0;color:#1a1208;font-weight:700;text-align:right;">${roomType}</td>
          </tr>
          <tr>
            <td style="padding:5px 0;color:#7a6f5e;">Check-In:</td>
            <td style="padding:5px 0;color:#1a1208;font-weight:600;text-align:right;">${checkIn} (01:00 PM)</td>
          </tr>
          <tr>
            <td style="padding:5px 0;color:#7a6f5e;">Check-Out:</td>
            <td style="padding:5px 0;color:#1a1208;font-weight:600;text-align:right;">${checkOut} (11:00 AM)</td>
          </tr>
          <tr>
            <td style="padding:5px 0;color:#7a6f5e;">Duration:</td>
            <td style="padding:5px 0;color:#1a1208;font-weight:600;text-align:right;">${nights} Night${nights > 1 ? 's' : ''}</td>
          </tr>
          <tr style="border-top:1px solid #ede8e0;">
            <td style="padding:10px 0 5px;color:#1a1208;font-weight:700;font-size:14px;">Est. Total:</td>
            <td style="padding:10px 0 5px;color:#cda85c;font-weight:800;font-size:16px;text-align:right;">₹${totalAmount.toLocaleString('en-IN')} + Taxes</td>
          </tr>
        </table>
      </div>

      <div style="background:#fff8e7;border:1px solid #f0d080;border-radius:8px;padding:16px 20px;text-align:left;margin-bottom:24px;">
        <p style="margin:0 0 8px;color:#8a6a00;font-size:11px;font-weight:700;letter-spacing:1px;">⚠️ MANDATORY CHECK-IN RULES</p>
        <p style="margin:0 0 5px;color:#5a4a00;font-size:12px;">🚫 <strong>No Local IDs accepted</strong> — Varanasi / local station IDs not permitted.</p>
        <p style="margin:0 0 5px;color:#5a4a00;font-size:12px;">🪪 <strong>Valid Govt ID required</strong> for all guests (Aadhaar / Passport / Driving License).</p>
        <p style="margin:0;color:#5a4a00;font-size:12px;">🕒 Check-in from <strong>01:00 PM</strong> | Check-out by <strong>11:00 AM</strong>.</p>
      </div>

      <div style="margin-bottom:20px;">
        <p style="color:#7a6f5e;font-size:12px;margin:0 0 12px;">For immediate assistance:</p>
        <p style="margin:0 0 6px;font-size:13px;">📞 <a href="tel:+918470905123" style="color:#cda85c;text-decoration:none;font-weight:700;">+91 84709 05123</a> (Reservation Line)</p>
        <p style="margin:0;font-size:13px;">💬 <a href="https://wa.me/918470905123" style="color:#25d366;text-decoration:none;font-weight:700;">WhatsApp Us</a></p>
      </div>
    </div>

    <div style="background:#1a1208;border-radius:0 0 12px 12px;padding:16px 32px;text-align:center;">
      <p style="color:#7a6f5e;margin:0;font-size:11px;">© 2026 Shivlok Palace. D-34/183, Ganesh Mahal Road, Varanasi – 221001</p>
    </div>

  </div>
</body>
</html>
`;

// ─── Send Functions ─────────────────────────────────────────────────

/**
 * Sends admin notification + guest confirmation for a new inquiry
 */
const sendInquiryEmails = async ({ name, email, phone, message }) => {
  const transporter = createTransporter();
  const date = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'short',
  });

  // 1. Admin notification
  await transporter.sendMail({
    from: `"Shivlok Palace Website" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `🏨 New Guest Inquiry from ${name} — Shivlok Palace`,
    html: adminInquiryTemplate({ name, email, phone, message, date }),
  });

  // 2. Guest confirmation
  await transporter.sendMail({
    from: `"Shivlok Palace Hotel" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'We received your inquiry — Shivlok Palace, Varanasi',
    html: guestConfirmationTemplate({ name }),
  });
};

/**
 * Sends a welcome email to a new newsletter subscriber
 */
const sendNewsletterWelcome = async (email) => {
  const transporter = createTransporter();

  await transporter.sendMail({
    from: `"Shivlok Palace Hotel" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: '✨ Welcome to Shivlok Palace Newsletter!',
    html: newsletterWelcomeTemplate(),
  });
};

/**
 * Sends admin notification + guest confirmation for a new booking
 */
const sendBookingEmails = async ({ name, email, phone, checkIn, checkOut, roomType, nights, totalAmount, bookingRef, specialRequests }) => {
  const transporter = createTransporter();
  const date = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'short',
  });

  // 1. Admin notification
  await transporter.sendMail({
    from: `"Shivlok Palace Website" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `🏨 New Booking [${bookingRef}] — ${name} | ${roomType}`,
    html: adminBookingTemplate({ name, email, phone, checkIn, checkOut, roomType, nights, totalAmount, bookingRef, specialRequests, date }),
  });

  // 2. Guest confirmation
  await transporter.sendMail({
    from: `"Shivlok Palace Hotel" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Booking Received [${bookingRef}] — Shivlok Palace, Varanasi`,
    html: guestBookingTemplate({ name, bookingRef, checkIn, checkOut, roomType, nights, totalAmount }),
  });
};

module.exports = { sendInquiryEmails, sendNewsletterWelcome, sendBookingEmails };

// ─── Table Reservation Email Templates ───────────────────────────────────────

const OCCASION_LABELS = {
  none: 'General Dining',
  birthday: '🎂 Birthday Celebration',
  anniversary: '💍 Anniversary',
  business: '💼 Business Meal',
  family: '👨‍👩‍👧 Family Gathering',
  other: 'Special Occasion',
};

const SEATING_LABELS = {
  any: 'No Preference',
  rooftop: '🌙 Rooftop',
  indoor: '🏠 Indoor',
  'ganga-view': '🌊 Ganga View',
};

const adminTableTemplate = ({ name, email, phone, date, time, guests, occasion, seatingPreference, specialRequests, reservationRef, dateStr }) => `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f4f1ec;font-family:'Helvetica Neue',Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:24px;">
    <div style="background:#1a1208;border-radius:12px 12px 0 0;padding:28px 32px;text-align:center;">
      <h1 style="color:#cda85c;margin:0;font-size:22px;letter-spacing:2px;">SHIVLOK PALACE</h1>
      <p style="color:#9b8f7a;margin:6px 0 0;font-size:12px;letter-spacing:1px;">RESTAURANT RESERVATION</p>
    </div>
    <div style="background:#fff;padding:32px;border:1px solid #e8e0d4;">
      <div style="background:#cda85c;color:#1a1208;border-radius:8px;padding:10px 18px;display:inline-block;margin-bottom:20px;">
        <span style="font-size:11px;font-weight:700;letter-spacing:2px;">NEW TABLE RESERVATION</span>
      </div>
      <div style="border-left:4px solid #cda85c;padding-left:16px;margin-bottom:22px;">
        <h2 style="margin:0;color:#1a1208;font-size:18px;">🍽️ Table Reservation Received</h2>
        <p style="margin:4px 0 0;color:#7a6f5e;font-size:13px;">${dateStr}</p>
        <p style="margin:4px 0 0;color:#cda85c;font-size:13px;font-weight:700;">Ref: ${reservationRef}</p>
      </div>
      <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
        <tr><td style="padding:10px 12px;background:#faf8f5;border:1px solid #ede8e0;width:35%;color:#7a6f5e;font-size:12px;font-weight:600;">Guest Name</td><td style="padding:10px 12px;background:#fff;border:1px solid #ede8e0;color:#1a1208;font-size:13px;font-weight:700;">${name}</td></tr>
        <tr><td style="padding:10px 12px;background:#faf8f5;border:1px solid #ede8e0;color:#7a6f5e;font-size:12px;font-weight:600;">Email</td><td style="padding:10px 12px;background:#fff;border:1px solid #ede8e0;"><a href="mailto:${email}" style="color:#cda85c;text-decoration:none;font-size:13px;">${email}</a></td></tr>
        <tr><td style="padding:10px 12px;background:#faf8f5;border:1px solid #ede8e0;color:#7a6f5e;font-size:12px;font-weight:600;">Phone</td><td style="padding:10px 12px;background:#fff;border:1px solid #ede8e0;"><a href="tel:${phone}" style="color:#cda85c;text-decoration:none;font-size:13px;">${phone}</a></td></tr>
        <tr><td style="padding:10px 12px;background:#faf8f5;border:1px solid #ede8e0;color:#7a6f5e;font-size:12px;font-weight:600;">Date</td><td style="padding:10px 12px;background:#fff;border:1px solid #ede8e0;color:#1a1208;font-size:13px;font-weight:700;">${date}</td></tr>
        <tr><td style="padding:10px 12px;background:#faf8f5;border:1px solid #ede8e0;color:#7a6f5e;font-size:12px;font-weight:600;">Time</td><td style="padding:10px 12px;background:#fff;border:1px solid #ede8e0;color:#1a1208;font-size:13px;font-weight:700;">${time}</td></tr>
        <tr><td style="padding:10px 12px;background:#faf8f5;border:1px solid #ede8e0;color:#7a6f5e;font-size:12px;font-weight:600;">Guests</td><td style="padding:10px 12px;background:#fff;border:1px solid #ede8e0;color:#1a1208;font-size:13px;">${guests} Person${guests > 1 ? 's' : ''}</td></tr>
        <tr><td style="padding:10px 12px;background:#faf8f5;border:1px solid #ede8e0;color:#7a6f5e;font-size:12px;font-weight:600;">Occasion</td><td style="padding:10px 12px;background:#fff;border:1px solid #ede8e0;color:#1a1208;font-size:13px;">${OCCASION_LABELS[occasion] || occasion}</td></tr>
        <tr><td style="padding:10px 12px;background:#faf8f5;border:1px solid #ede8e0;color:#7a6f5e;font-size:12px;font-weight:600;">Seating</td><td style="padding:10px 12px;background:#fff;border:1px solid #ede8e0;color:#1a1208;font-size:13px;">${SEATING_LABELS[seatingPreference] || seatingPreference}</td></tr>
        ${specialRequests ? `<tr><td style="padding:10px 12px;background:#faf8f5;border:1px solid #ede8e0;color:#7a6f5e;font-size:12px;font-weight:600;vertical-align:top;">Special Requests</td><td style="padding:10px 12px;background:#fff;border:1px solid #ede8e0;color:#1a1208;font-size:13px;line-height:1.6;">${specialRequests}</td></tr>` : ''}
      </table>
      <div style="text-align:center;">
        <a href="mailto:${email}?subject=Table Reservation Confirmed ${reservationRef}" style="display:inline-block;background:#cda85c;color:#1a1208;font-weight:700;text-decoration:none;padding:12px 28px;border-radius:6px;font-size:13px;letter-spacing:1px;">REPLY & CONFIRM TABLE</a>
      </div>
    </div>
    <div style="background:#1a1208;border-radius:0 0 12px 12px;padding:16px 32px;text-align:center;">
      <p style="color:#7a6f5e;margin:0;font-size:11px;">Shivlok Palace Hotel · Varanasi, India · shivlokpalace.vns@gmail.com</p>
    </div>
  </div>
</body>
</html>
`;

const guestTableTemplate = ({ name, reservationRef, date, time, guests, occasion, seatingPreference }) => `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f4f1ec;font-family:'Helvetica Neue',Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:24px;">
    <div style="background:#1a1208;border-radius:12px 12px 0 0;padding:28px 32px;text-align:center;">
      <h1 style="color:#cda85c;margin:0;font-size:22px;letter-spacing:2px;">SHIVLOK PALACE</h1>
      <p style="color:#9b8f7a;margin:6px 0 0;font-size:12px;letter-spacing:1px;">RESTAURANT, VARANASI</p>
    </div>
    <div style="background:#fff;padding:40px 32px;border:1px solid #e8e0d4;text-align:center;">
      <div style="font-size:40px;margin-bottom:12px;">🍽️</div>
      <h2 style="color:#1a1208;margin:0 0 8px;font-size:22px;">Table Reserved!</h2>
      <p style="color:#5a4e3e;font-size:14px;line-height:1.7;margin:0 0 24px;">
        Dear <strong>${name}</strong>, your table request has been received.<br>
        Our team will confirm within <strong style="color:#cda85c;">1 hour</strong>.
      </p>
      <div style="background:#faf8f5;border:2px solid #cda85c;border-radius:10px;padding:16px 20px;text-align:left;margin-bottom:24px;">
        <p style="margin:0 0 12px;color:#7a6f5e;font-size:11px;font-weight:700;letter-spacing:1.5px;text-align:center;">YOUR RESERVATION REFERENCE</p>
        <p style="margin:0 0 16px;color:#cda85c;font-size:26px;font-weight:800;letter-spacing:3px;text-align:center;">${reservationRef}</p>
        <table style="width:100%;font-size:13px;">
          <tr><td style="padding:5px 0;color:#7a6f5e;">Date:</td><td style="padding:5px 0;color:#1a1208;font-weight:700;text-align:right;">${date}</td></tr>
          <tr><td style="padding:5px 0;color:#7a6f5e;">Time:</td><td style="padding:5px 0;color:#1a1208;font-weight:700;text-align:right;">${time}</td></tr>
          <tr><td style="padding:5px 0;color:#7a6f5e;">Guests:</td><td style="padding:5px 0;color:#1a1208;font-weight:600;text-align:right;">${guests} Person${guests > 1 ? 's' : ''}</td></tr>
          <tr><td style="padding:5px 0;color:#7a6f5e;">Occasion:</td><td style="padding:5px 0;color:#1a1208;font-weight:600;text-align:right;">${OCCASION_LABELS[occasion] || 'General'}</td></tr>
          <tr><td style="padding:5px 0;color:#7a6f5e;">Seating:</td><td style="padding:5px 0;color:#1a1208;font-weight:600;text-align:right;">${SEATING_LABELS[seatingPreference] || 'Any'}</td></tr>
        </table>
      </div>
      <div style="margin-bottom:20px;">
        <p style="color:#7a6f5e;font-size:12px;margin:0 0 10px;">For changes or immediate assistance:</p>
        <p style="margin:0 0 6px;font-size:13px;">📞 <a href="tel:+918470905123" style="color:#cda85c;text-decoration:none;font-weight:700;">+91 84709 05123</a></p>
        <p style="margin:0;font-size:13px;">💬 <a href="https://wa.me/918470905123" style="color:#25d366;text-decoration:none;font-weight:700;">WhatsApp Us</a></p>
      </div>
    </div>
    <div style="background:#1a1208;border-radius:0 0 12px 12px;padding:16px 32px;text-align:center;">
      <p style="color:#7a6f5e;margin:0;font-size:11px;">© 2026 Shivlok Palace. D-34/183, Ganesh Mahal Road, Varanasi – 221001</p>
    </div>
  </div>
</body>
</html>
`;

/**
 * Sends admin alert + guest confirmation for a new table reservation
 */
const sendTableReservationEmails = async ({ name, email, phone, date, time, guests, occasion, seatingPreference, specialRequests, reservationRef }) => {
  const transporter = createTransporter();
  const dateStr = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata', dateStyle: 'full', timeStyle: 'short',
  });

  await transporter.sendMail({
    from: `"Shivlok Palace Website" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `🍽️ Table Reservation [${reservationRef}] — ${name} | ${guests} Guests | ${date} ${time}`,
    html: adminTableTemplate({ name, email, phone, date, time, guests, occasion, seatingPreference, specialRequests, reservationRef, dateStr }),
  });

  await transporter.sendMail({
    from: `"Shivlok Palace Hotel" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Table Reserved [${reservationRef}] — Shivlok Palace Restaurant`,
    html: guestTableTemplate({ name, reservationRef, date, time, guests, occasion, seatingPreference }),
  });
};

module.exports = { sendInquiryEmails, sendNewsletterWelcome, sendBookingEmails, sendTableReservationEmails };

