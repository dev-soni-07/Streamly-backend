// require("dotenv").config({path:'./env'});
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

const PORT = process.env.PORT || 8000;

dotenv.config({
    path: "./env",
});

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        })
    })
    .catch((error) => {
        console.log("MONGODB Connection Failed !!! ", error)
    })
































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
