// import DsaSheet from "../../../models/DsaSheet";
// import sequelize from "../../../lib/sequelize";

import connectDB from "../../../lib/mongodb";
import DsaSheet from "../../../models/DsaSheet";

export default async function handler(req, res) {
  //await sequelize.sync();
  await connectDB();
  const { id } = req.query;

  if (req.method === "PATCH") {
    const updated = await DsaSheet.findByIdAndUpdate(
      id,
      { status: req.body.status },
      { new: true }
    );
    // const { status } = req.body;

    // await DsaSheet.update({ status }, { where: { id } });

    // // Return the updated record (optional, helps debugging)
    // const updated = await DsaSheet.findByPk(id);

    return res.status(200).json(updated);
  }

  res.status(405).json({ message: "Method not allowed" });
}
