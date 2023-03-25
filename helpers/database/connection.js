import mongoose from "mongoose";

class Database {
  static async conntect() {
    mongoose
      .connect(process.env.MONGO_URI, {
        dbName: "KODEXECluster",
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("Connected to DB Successfully"))
      .catch((err) => console.log("DB Connection Error : " + err));
  }
}

export { Database };
