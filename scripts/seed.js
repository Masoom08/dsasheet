import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sequelize from "../lib/sequelize.js";
import DsaSheet from "../models/DsaSheet.js";

// Get correct file path for data.json
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, "data.json");

// Parse JSON manually
const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

(async () => {
  try {
    await sequelize.sync({ force: true });
    await DsaSheet.bulkCreate(data);
    console.log("✅ Seeded successfully!");
  } catch (err) {
    console.error("❌ Error seeding:", err);
  } finally {
    process.exit();
  }
})();
