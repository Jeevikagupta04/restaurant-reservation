import mongoose from "mongoose";
import { seedAdmin } from "./seedAdmin.js";

export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "RESERVATIONS",
    })
    .then(async () => {
      console.log("Connected to database!");
      await seedAdmin();
    })
    .catch((err) => {
      console.log(`Some error occured while connecing to database: ${err}`);
    });
};
