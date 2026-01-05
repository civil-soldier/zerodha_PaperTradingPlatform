const nodemailer = require("nodemailer");

const sendResetPasswordEmail = async (email, resetLink) => {
  try {
    console.log("📧 Sending reset password email to:", email);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Zerodha" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset your Zerodha password",
      html: `
        <h2>Password Reset Request</h2>
        <p>We received a request to reset your password.</p>
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}" style="font-size:16px;">
          Reset Password
        </a>
        <p>This link is valid for 15 minutes.</p>
        <br />
        <p>If you did not request this, please ignore this email.</p>
      `,
    });

    await transporter.verify();
console.log("SMTP verified, ready to send");

    console.log("✅ Reset password email sent");
  } catch (err) {
    console.error("❌ RESET EMAIL FAILED:", err);
    throw err;
  }
};

module.exports = sendResetPasswordEmail;
