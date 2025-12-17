import "dotenv/config";
import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import DsaSheet from "../models/DsaSheet.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, "data.json");
const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await DsaSheet.deleteMany();
    await DsaSheet.insertMany(data);
    console.log("✅ MongoDB Seeded Successfully");
  } catch (err) {
    console.error("❌ Seeding failed:", err);
  } finally {
    process.exit();
  }
})();
