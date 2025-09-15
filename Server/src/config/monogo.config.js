
import mongoose from "mongoose";
console.log(process.env.MONGO_URI);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1); // Exit the process with failure
  }
}


export default connectDB;


export const cookieOptions = {
 httpOnly: true,
  secure: true,     // required on https
  sameSite: "None", // allow cross-site (frontend + backend different subdomains)
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: '/',
  domain:undefined
}

