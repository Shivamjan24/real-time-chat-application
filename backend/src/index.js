import express from "express"
import dotenv from "dotenv"
import dbconnect from "./lib/connect.js"
import router from "./routes/auth.route.js"
import cookieparser from "cookie-parser"
import msgroute from "./routes/message.route.js"
import cors from "cors"
import { app,server } from "./lib/socket.js"
import path from "path"

dotenv.config()

const PORT=process.env.PORT
const dir_name=path.resolve()

app.use(express.json({ limit: '10mB'}));
app.use(cookieparser());


app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );

app.use("/api/auth",router)
app.use("/api/messages",msgroute)

if(process.env.NODE_ENV==="production"){
  app.use(express.static(path.join(dir_name,"../frontend/dist")));

  app.get("*",),(req,res)=>{
    res.sendFile(path.join(dir_name,"../frontend","dist","index.html"));
  }
}

server.listen(PORT,()=>{
  console.log(`server is running on port ${PORT}`);
  dbconnect()
})
