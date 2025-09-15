import express from "express";
import dotenv from "dotenv"
import connectDB from "./src/config/monogo.config.js"
import auth_routes from "./src/routes/auth.route.js"
import cookieParser from "cookie-parser";
import {attachUser} from "./src/utils/attachUser.js"
import user_routes from "./src/routes/user.routes.js"
import { createShortUrl, redirectFromShortUrl } from "./src/controller/short_url.controller.js";
import { errorHandler } from "./src/utils/errorHandler.js";
import cors from "cors"


dotenv.config("./.env")

const app = express();

const allowedOrigins = [                 // dev
  "https://url-shortner-f-vwjq.onrender.com", // your deployed frontend
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // allow cookies
}));

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use(attachUser)

app.use("/api/user",user_routes)
app.use("/api/auth",auth_routes)
app.use("/api",createShortUrl)
app.get("/:id",redirectFromShortUrl)

app.use(errorHandler)

app.listen(3000,()=>{
    connectDB()
    console.log("Server is running on http://localhost:3000");
})


// 'https://url-shortner-f-vwjq.onrender.com'