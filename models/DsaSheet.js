// import { DataTypes } from "sequelize";
// import sequelize from "../lib/sequelize.js";

// const DsaSheet = sequelize.define("DsaSheet", {
//   week: DataTypes.STRING,
//   topic: DataTypes.STRING,
//   question_title: DataTypes.STRING,
//   question_link: DataTypes.TEXT,
//   difficulty: {
//     type: DataTypes.ENUM("Easy", "Medium", "Hard"),
//     defaultValue: "Medium",
//   },
//   status: {
//     type: DataTypes.BOOLEAN,
//     defaultValue: false,
//   },
// });

// export default DsaSheet;
import mongoose from "mongoose";

const DsaSheetSchema = new mongoose.Schema(
  {
    week: String,
    topic: String,
    question_title: String,
    question_link: String,
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Medium",
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.DsaSheet ||
  mongoose.model("DsaSheet", DsaSheetSchema);
