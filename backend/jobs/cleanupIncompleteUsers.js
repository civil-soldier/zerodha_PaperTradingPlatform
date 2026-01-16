const User = require("../model/UserModel");

const cleanupIncompleteUsers = async () => {
  try {
    const ONE_HOUR_AGO = new Date(Date.now() - 60 * 60 * 1000);

    const result = await User.deleteMany({
      signupStep: { $lt: 5 },
      createdAt: { $lt: ONE_HOUR_AGO },
    });

    if (result.deletedCount > 0) {
      console.log(
        `🧹 Cleanup: Deleted ${result.deletedCount} incomplete users`
      );
    }
  } catch (err) {
    console.error("❌ Cleanup failed:", err.message);
  }
};

module.exports = cleanupIncompleteUsers;
