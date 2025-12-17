// import DsaSheet from "../../../models/DsaSheet";
// import sequelize from "../../../lib/sequelize";

import DsaSheet from "../../../models/DsaSheet";
import dbConnect from "../../../lib/mongodb";

export default async function handler(req, res) {
  //await sequelize.sync();
  await dbConnect();

  if (req.method === "GET") {
    const data = await DsaSheet.find();
    return res.status(200).json(data);
  }

  if (req.method === "POST") {
    const question = await DsaSheet.create(req.body);
    return res.status(201).json(question);
  }
  res.status(405).json({ message: "Method not allowed" });
}
