import mongoose, { ConnectOptions } from "mongoose";
let cachedDb: mongoose.Connection;

export const connect = async () => {
  if (cachedDb) {
    return cachedDb;
  }

  const db = await mongoose.connect(
    process.env.MONGODB_URI as string,
    {
      dbName: "InsightSql",
    } as ConnectOptions
  );

  cachedDb = db.connection;
  return cachedDb;
};
export default connect;
