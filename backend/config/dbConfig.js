import mongoose from "mongoose";
import User from "../models/userModel.js";

const dbConn = async () => {
  try {
    const connect = await mongoose.connect(process.env.DB_URI);
    console.log(`MongoDB Successfully Connected: ${connect.connection.host}`);
  } catch (error) {
    console.log("Something went wrong", error.message);
    process.exit(1);
  }
};

export default dbConn;
