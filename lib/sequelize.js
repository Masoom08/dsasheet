import { Sequelize } from "sequelize";

const sequelize = new Sequelize("dsadb", "root", "#Masoom08", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
  logging: console.log,
});

export default sequelize;
