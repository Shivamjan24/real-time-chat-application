import express from "express"
import dotenv from "dotenv"
import dbconnect from "./lib/connect.js"
import router from "./routes/auth.route.js"
import cookieparser from "cookie-parser"
import msgroute from "./routes/message.route.js"

dotenv.config()

const app=express()
const PORT=process.env.PORT
app.use(express.json());
app.use(cookieparser());

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
    dbconnect()
})

app.use("/api/auth",router)
app.use("/api/messages",msgroute)