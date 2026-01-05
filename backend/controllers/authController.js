const UserModel = require("../model/UserModel");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmailOtp = require("../utils/sendEmailOtp");
const sendEmail = require("../utils/sendResetPasswordEmail");
console.log("UserModel:", UserModel);

/* =========================
   STEP 1: SEND MOBILE OTP (DEMO)
========================= */
const sendMobileOtp = async (req, res) => {
  try {
    const { mobile } = req.body;

    if (!mobile) {
      return res.status(400).json({ message: "Mobile required" });
    }

    let user = await UserModel.findOne({ mobile });

    if (!user) {
      user = await UserModel.create({
        mobile,
        signupStep: 1,
        isMobileVerified: false,
      });
    }

    console.log("📲 DEMO OTP: 000000");
    res.json({ success: true });
  } catch (err) {
    console.error("Send OTP error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   STEP 1 VERIFY: MOBILE OTP
========================= */
const verifyMobileOtp = async (req, res) => {
  const { mobile, otp } = req.body;

  if (otp !== "000000") {
    return res.status(400).json({ success: false, message: "Invalid OTP" });
  }

  let user = await UserModel.findOne({ mobile });

  if (!user) {
    // safety (ideally yahan nahi aana chahiye)
    user = await UserModel.create({
      mobile,
      signupStep: 1,
      isMobileVerified: true,
      isEmailVerified: false,
    });
  }

  user.isMobileVerified = true;
  await user.save();

  // 🆕 NEW USER (just verified mobile)
  if (user.signupStep === 1) {
    return res.json({
      success: true,
      userType: "NEW_USER",
    });
  }

  // 🔁 OLD USER (email already verified earlier)
  if (user.isEmailVerified === true) {
    return res.json({
      success: true,
      userType: "OLD_USER",
      redirect: "/account/active",
    });
  }

  // ⏸ INCOMPLETE USER
  return res.json({
    success: true,
    userType: "INCOMPLETE_USER",
    nextStep: user.signupStep,
  });
};



/* =========================
   STEP 2: NAME + EMAIL
========================= */
const addEmailAndName = async (req, res) => {
  try {
    const { mobile, name, email } = req.body;

    if (!mobile || !name || !email) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = await UserModel.findOne({ mobile });

    if (!user || !user.isMobileVerified) {
      return res.status(403).json({ message: "Verify mobile first" });
    }

    // check email uniqueness
    const emailOwner = await UserModel.findOne({ email });
    if (emailOwner && emailOwner.mobile !== mobile) {
      return res.status(400).json({
        message: "Email already used by another account",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // ✅ SEND EMAIL FIRST
    await sendEmailOtp(email, otp);

    // ✅ SAVE ONLY ON SUCCESS
    user.name = name;
    user.email = email;
    user.emailOtp = otp;
    user.emailOtpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    user.signupStep = 3;

    await user.save();

    res.json({ success: true });
  } catch (err) {
    console.error("EMAIL OTP ERROR:", err);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

// STEP 2 VERIFY: EMAIL OTP
const verifyEmailOtp = async (req, res) => {
  try {
    const { mobile, otp } = req.body;
    const enteredOtp = String(otp).trim();

    if (!mobile || !enteredOtp) {
      return res.status(400).json({ message: "Mobile and OTP required" });
    }

    const user = await UserModel.findOne({ mobile });

    if (!user || user.signupStep !== 3) {
      return res.status(404).json({ message: "OTP not found" });
    }

    console.log("ENTERED OTP:", enteredOtp);
    console.log("DB OTP:", user.emailOtp);

    if (String(user.emailOtp).trim() !== enteredOtp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.emailOtpExpiry < new Date()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    user.isEmailVerified = true;
    user.emailOtp = null;
    user.emailOtpExpiry = null;
    user.signupStep = 4;

    await user.save();

    res.json({ success: true });
  } catch (err) {
    console.error("EMAIL OTP VERIFY ERROR:", err);
    res.status(500).json({ message: "OTP verification failed" });
  }
};

/* =========================
   STEP 4: USERNAME + PASSWORD
========================= */
const createCredentials = async (req, res) => {
  try {
    const { mobile, username, password } = req.body;

    if (!mobile || !username || !password) {
      return res.status(400).json({
        message: "Mobile, username and password required",
      });
    }

    const user = await UserModel.findOne({ mobile }).select("+password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🔒 Prevent re-setting credentials
    if (user.signupStep >= 5) {
      return res.status(400).json({
        message: "Credentials already set",
      });
    }

    if (user.signupStep !== 4) {
      return res.status(403).json({
        message: "Complete previous steps first",
      });
    }

    const existing = await UserModel.findOne({ username });
    if (existing) {
      return res.status(400).json({
        message: "Username already taken",
      });
    }

    user.username = username;
    user.password = await bcrypt.hash(password, 10);
    user.signupStep = 5;

    await user.save();

    res.json({
      success: true,
      message: "Signup completed successfully",
      redirect: "/account/active",
    });
  } catch (err) {
    console.error("Create credentials error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * =========================
 * DASHBOARD LOGIN
 * =========================
 * Username + Password → JWT
 */

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password required",
      });
    }

    // password select:false hai
    const user = await UserModel.findOne({ username }).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    // signup completed check
    if (user.signupStep !== 5) {
      return res.status(403).json({
        success: false,
        message: "Account not active",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        name: user.name,
      },
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User with this email does not exist" });
    }

    // ⛔ Rate limit: 5 minutes
if (
  user.lastResetEmailAt &&
  Date.now() - user.lastResetEmailAt.getTime() < 5 * 60 * 1000
) {
  return res.status(429).json({
    message: "Please wait 5 minutes before requesting another reset email",
  });
}



    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiry = Date.now() + 15 * 60 * 1000;
    user.lastResetEmailAt = new Date();
    await user.save();

    const resetLink = `http://localhost:3001/reset-password/${resetToken}`;

    // ✅ correct util usage
    await sendEmail(user.email, resetLink);

    res.json({ message: "Password reset link sent to email" });
  } catch (error) {
    console.error("FORGOT PASSWORD ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};


const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await UserModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpiry: { $gt: Date.now() },
    }).select("+password");

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired reset link" });
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiry = undefined;

    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (error) {
    console.error("RESET PASSWORD ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = {
  sendMobileOtp,
  verifyMobileOtp,
  addEmailAndName,
  verifyEmailOtp,
  createCredentials,
  login,
  forgotPassword,
  resetPassword,
};
