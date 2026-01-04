const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    mobile: { type: String, unique: true, required: true },
    isMobileVerified: { type: Boolean, default: false },

    name: String,

    email: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
      trim: true,
    },

    isEmailVerified: { type: Boolean, default: false },
    emailOtp: String,
    emailOtpExpiry: Date,

    personalDetails: {
      dob: Date,
      gender: String,
      parentName: String,
    },

    identityDetails: {
      pan: {
        type: String,
        uppercase: true,
        match: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
      },
      aadhaar: {
        type: String,
        match: /^\d{12}$/,
      },
    },

    address: {
      addressLine: String,
      city: String,
      state: String,
      pincode: String,
    },

    bankAccount: String,
    ifsc: String,

    profileImage: String,

    username: { type: String, unique: true, sparse: true },

    password: {
      type: String,
      select: false,
    },

    signupStep: { type: Number, default: 1 },

    // 🔐 DASHBOARD RELATED
    status: {
      type: String,
      enum: ["ACTIVE", "BLOCKED"],
      default: "ACTIVE",
    },

    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },

    lastLoginAt: Date,

    // 🔑 FORGOT PASSWORD (NEW)
    resetPasswordToken: String,
    resetPasswordExpiry: Date,
  },
  { timestamps: true }
);

// 🔥 Indexes for performance
UserSchema.index({ username: 1 });
UserSchema.index({ mobile: 1 });
UserSchema.index({ email: 1 });

module.exports = mongoose.model("User", UserSchema);
