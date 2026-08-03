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
      <p style="color:#7a6f5e;margin:0;font-size:11px;">Shivlok Palace Hotel · Varanasi, India · shivlokpalace@gmail.com</p>
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
        <p style="margin:0;color:#1a1208;font-size:14px;">✉️ <a href="mailto:shivlokpalace@gmail.com" style="color:#cda85c;text-decoration:none;font-weight:700;">shivlokpalace@gmail.com</a></p>
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
        You can unsubscribe anytime by contacting shivlokpalace@gmail.com
      </p>
    </div>

    <div style="background:#1a1208;border-radius:0 0 12px 12px;padding:16px 32px;text-align:center;">
      <p style="color:#7a6f5e;margin:0;font-size:11px;">© 2026 Shivlok Palace. All Rights Reserved.</p>
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

module.exports = { sendInquiryEmails, sendNewsletterWelcome };
