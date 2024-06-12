import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const app = express();

mongoose
    .connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("Connected to  mongo db successfully")})
    .catch((error)=>{
        console.log("Error while connecting to mongodb,", error)
    })

app.listen(3000, () => {
  console.log("App is listening to port");
});
