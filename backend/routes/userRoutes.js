const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadMiddleware");
const { saveDetails } = require("../controllers/userController");

// ✅ Save user details (after email + mobile verification)
router.post(
  "/details",
  upload.single("profileImage"), // MUST match frontend
  saveDetails
);

module.exports = router;
