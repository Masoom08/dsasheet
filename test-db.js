import sequelize from "./lib/sequelize.js";

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL connected successfully!");
  } catch (error) {
    console.error("❌ Connection failed:", error);
  } finally {
    process.exit();
  }
})();
