import { DataTypes } from "sequelize";
import sequelize from "../lib/sequelize.js";

const DsaSheet = sequelize.define("DsaSheet", {
  week: DataTypes.STRING,
  topic: DataTypes.STRING,
  question_title: DataTypes.STRING,
  question_link: DataTypes.TEXT,
  difficulty: {
    type: DataTypes.ENUM("Easy", "Medium", "Hard"),
    defaultValue: "Medium",
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

export default DsaSheet;
