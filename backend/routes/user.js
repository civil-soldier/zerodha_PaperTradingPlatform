const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const User = require("../model/UserModel");


// 🔥 GET LOGGED IN USER
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("name");

    if (!user) {
      return res.status(404).json({ success: false });
    }

    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

module.exports = router;
