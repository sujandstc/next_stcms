import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";

const SiteData = mongoose.model("next_stcms_data");

const update_site_data = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  // We only accept post request here!

  if (req.method === "POST") {
    const { dynamic_id, dynamic_data } = req.body;

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

    await SiteData.updateOne(
      {
        dynamic_id,
      },
      {
        data: dynamic_data,
      },
      {
        upsert: true,
      }
    );

    try {
      await mongoose.connection.close();
      console.log("Mongoose connection closed!");
    } catch (e) {
      console.log("Err: Mongoose connection closing failed");
    }
  }

  res.status(200).json({
    message: "Updated",
  });
};

export default update_site_data;
