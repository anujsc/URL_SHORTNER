import express from "express";
import dotenv from "dotenv"
import connectDB from "./src/config/monogo.config.js"


import { createShortUrl, redirectFromShortUrl } from "./src/controller/short_url.controller.js";
import { errorHandler } from "./src/utils/errorHandler.js";
import cors from "cors"


dotenv.config("./.env")

const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // your React app
    credentials: true // 👈 this allows cookies to be sent
}));

app.use(express.json())
app.use(express.urlencoded({extended:true}))
// app.use(cookieParser())

// app.use(attachUser)

// app.use("/api/user",user_routes)
// app.use("/api/auth",auth_routes)
app.use("/api",createShortUrl)
app.get("/:id",redirectFromShortUrl)

app.use(errorHandler)

app.listen(3000,()=>{
    connectDB()
    console.log("Server is running on http://localhost:3000");
})

// GET - Redirection 