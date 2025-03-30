import mongoose from "mongoose";
import User from "../models/userModel.js";

const dbConn = async () => {
  try {
    const connect = await mongoose.connect(process.env.DB_URI);
    console.log(`MongoDB Successfully Connected: ${connect.connection.host}`);
    makeAdmin();
  } catch (error) {
    console.log("Something went wrong", error.message);
    process.exit(1);
  }
};

const makeAdmin = async () => {
  try {
    // Check if an admin user already exists
    const existingAdmin = await User.findOne({ isAdmin: true });
    if (!existingAdmin) {
      // Create a new admin user
      const newAdmin = new User({
        name: "Admin",
        email: "admin@example.com",
        password: "password123",
        isAdmin: true,
      });
      const createAdmin = await newAdmin.save();
      console.log("Admin User Created Successfully: ", createAdmin);
    }
  } catch (error) {
    console.log("Something went wrong", error.message);
  }
};

export default dbConn;
