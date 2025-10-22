import DsaSheet from "../../../models/DsaSheet";
import sequelize from "../../../lib/sequelize";

export default async function handler(req, res) {
  await sequelize.sync();

  if (req.method === "GET") {
    const data = await DsaSheet.findAll();
    return res.json(data);
  }

  if (req.method === "POST") {
    const question = await DsaSheet.create(req.body);
    return res.json(question);
  }
}
