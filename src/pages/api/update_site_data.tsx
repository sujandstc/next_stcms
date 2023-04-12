import type { NextApiRequest, NextApiResponse } from "next";

import { mongoConnect } from "./mongoConnect";

const update_site_data = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  // We only accept post request here!

  if (req.method === "POST") {
    const { dynamic_id, dynamic_data } = req.body;

    const connectionString = process.env.MONGO_URI;

    if (!connectionString) {
      throw "No mongo connection could be found!";
    }

    const mongoConnection = await mongoConnect();

    if (!mongoConnection) throw "ERROR CONNECTING!";

    const db = mongoConnection.db("next_stcms");
    const collection = db.collection("next_stcms_datas");

    await collection.updateOne(
      {
        dynamic_id,
      },
      { $set: { data: dynamic_data } },
      {
        upsert: true,
      }
    );

    try {
      // await mongoConnection.close();
    } catch (e) {}
  }

  res.status(200).json({
    message: "Updated",
  });
};

export default update_site_data;
