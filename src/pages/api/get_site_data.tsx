import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
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

  const db = mongoConnection.db("next_stcms");
  const collection = db.collection("next_stcms_datas");

  const getData = await collection.find().toArray();

  // const getData = await SiteData.find({}).lean().sort("_id");

  // Closing connection will save resources.

  try {
    // await mongoConnection.close();
    // await mongoose.connection.close();
    console.log("Mongoose connection closed!");
  } catch (e) {
    console.log("Err: Mongoose connection closing failed");
  }

  res.status(200).json({
    data: getData,
  });
};

export default get_site_data;
