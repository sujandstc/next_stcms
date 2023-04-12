import { MongoClient } from "mongodb";

export const mongoConnect = async () => {
  try {
    let client = new MongoClient(
      process.env.MONGO_URI ? process.env.MONGO_URI : "",
      {}
    );

    client = await client.connect();
    return client;
  } catch (e) {
    console.log("ERROR connecting to mongo!");
    return undefined;
  }
};
