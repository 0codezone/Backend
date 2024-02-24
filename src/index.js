// require("dotenv").config({ path: "./" });

import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({ path: "./env" });

//database connection
connectDB()
  .then(() => {
    app.on("error", (err) => {
      console.log("ERROR: ", err);
      throw err;
    });

    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("ERROR: ", err);
  });
// ------------------ METHOD 1------------------->
/*
import mongoose from "mongoose";
import { DB_NAME } from "./constants";

import express from "express";
const app = express();
(async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);

    app.on("error", (err) => {
      console.log("ERROR: ", err);
      throw err;
    });

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  } catch (error) {
    console.log("ERROR: ", error);
    throw error;
  }
})();
*/
