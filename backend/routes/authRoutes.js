const express = require("express");
const router = express.Router();


const {
  sendMobileOtp,
  verifyMobileOtp,
  addEmailAndName,
  verifyEmailOtp,
  createCredentials,
  login,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

router.post("/mobile", sendMobileOtp);
router.post("/verify-mobile-otp", verifyMobileOtp);
router.post("/email", addEmailAndName);
router.post("/verify-email-otp", verifyEmailOtp);
router.post("/credentials", createCredentials);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

module.exports = router;
