import type { NextApiRequest, NextApiResponse } from "next";

import mongoose from "mongoose";
import "./models";

const SiteData = mongoose.model("next_stcms_data");

const get_site_data = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const connectionString =
    "mongodb+srv://next_stcms:xuv1NwPKb3ko7urJ@cluster0.vnbfdn6.mongodb.net/next_stcms?retryWrites=true&w=majority";
  if (!connectionString) {
    throw "No mongo connection could be found!";
  }
  try {
    await mongoose.connect(connectionString);

    console.log("Mongoose connected!");
  } catch (e) {
    console.log("Err: Mongoose connection failed");
  }

  const getData = await SiteData.find({}).lean().sort("_id");

  // Closing connection will save resources.

  try {
    await mongoose.connection.close();
    console.log("Mongoose connection closed!");
  } catch (e) {
    console.log("Err: Mongoose connection closing failed");
  }

  res.status(200).json({
    data: getData,
  });
};

export default get_site_data;
