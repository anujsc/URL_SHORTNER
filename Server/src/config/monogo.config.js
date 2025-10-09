
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

// Cookie options used when setting auth cookies. Make values environment-aware so
// local development (http://localhost) does not require secure cookies.
export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'None', // allow cross-site (frontend + backend different origins)
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: '/',
  // domain: undefined // leave undefined by default; set via env if needed for a custom domain
}

export const getCookieOptionsForDomain = (domain) => ({
  ...cookieOptions,
  domain,
});

