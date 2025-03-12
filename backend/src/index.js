import express from "express"
import dotenv from "dotenv"
import dbconnect from "./lib/connect.js"
import router from "./routes/auth.route.js"
import cookieparser from "cookie-parser"
import msgroute from "./routes/message.route.js"
import cors from "cors"
import { app,server } from "./lib/socket.js"

dotenv.config()

const PORT=process.env.PORT
app.use(express.json());
app.use(cookieparser());


app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );

app.use("/api/auth",router)
app.use("/api/messages",msgroute)

server.listen(PORT,()=>{
  console.log(`server is running on port ${PORT}`);
  dbconnect()
})
