const cron = require("node-cron");
const cleanupIncompleteUsers = require("./jobs/cleanupIncompleteUsers");

console.log("🕒 Cron jobs initialized");

// Runs every 30 minutes
cron.schedule("*/30 * * * *", async () => {
  console.log("⏰ Running cleanup job...");
  await cleanupIncompleteUsers();
});
