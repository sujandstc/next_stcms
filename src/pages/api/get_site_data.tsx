import type { NextApiRequest, NextApiResponse } from "next";
import { mongoConnect } from "./mongoConnect";

const get_site_data = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const connectionString = process.env.MONGO_URI;
  if (!connectionString) {
    throw "No mongo connection could be found!";
  }

  const mongoConnection = await mongoConnect();

  if (!mongoConnection) throw "ERROR CONNECTING!";

  const collection = mongoConnection
    .db("next_stcms")
    .collection("next_stcms_datas");

  const getData = await collection.find().toArray();

  // Closing connection will save resources.

  try {
    await mongoConnection.close();
  } catch (e) {}

  res.status(200).json({
    data: getData,
  });
};

export default get_site_data;
