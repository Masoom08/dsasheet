import DsaSheet from "../../../models/DsaSheet";
import sequelize from "../../../lib/sequelize";

export default async function handler(req, res) {
  await sequelize.sync();
  const { id } = req.query;

  if (req.method === "PATCH") {
    const { status } = req.body;

    await DsaSheet.update({ status }, { where: { id } });

    // Return the updated record (optional, helps debugging)
    const updated = await DsaSheet.findByPk(id);

    return res.json(updated);
  }

  res.status(405).json({ message: "Method not allowed" });
}
