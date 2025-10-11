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

const FRONTEND_ORIGINS =  'https://url-shortner-f-vwjq.onrender.com'
  .split(',')
  .map(s => s.trim())
  .filter(Boolean)

app.use(cors({
  origin: (origin, cb) => {
    // allow requests with no origin like mobile apps or curl
    if (!origin) return cb(null, true)
    if (FRONTEND_ORIGINS.indexOf(origin) !== -1) return cb(null, true)
    return cb(new Error('CORS policy does not allow access from the specified Origin.'), false)
  },
  credentials: true, // This is crucial for cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
}));

// Trust proxy (important for Render deployment)
app.set('trust proxy', 1);

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use(attachUser)

app.use("/api/user",user_routes)
app.use("/api/auth",auth_routes)
app.use("/api",createShortUrl)
app.get("/:id",redirectFromShortUrl)

app.use(errorHandler)

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
  connectDB()
  console.log(`Server is running on http://localhost:${PORT}`);
})


// 'https://url-shortner-f-vwjq.onrender.com'