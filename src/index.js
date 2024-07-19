// require("dotenv").config({path:'./env'});
import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
    path: "./env",
});

connectDB();
































// Another Approach for DB Connection
// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";
// import express from "express";
// const app = express()(

// IIFE
//   // ;( async () => {})()
//   async () => {
//     try {
//       await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
//       app.on("error", (error) => {
//         console.log(
//           "Express application is unable to connect with our database.",
//           error
//         );
//         throw error;
//       });

//       app.listen(process.env.PORT, () => {
//         console.log(`App is listening on post ${process.env.PORT}`);
//       })
//     } catch (error) {
//       console.error("Error", error);
//       throw error;
//     }
//   }
// )();
