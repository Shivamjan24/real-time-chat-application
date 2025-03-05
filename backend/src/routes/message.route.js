import express from "express"
import { protectroute } from "../middleware/protectroute.middleware.js"
import { getmessages, getsideusers, sendmessage } from "../controllers/messages.controller.js"

const msgroute=express.Router()

msgroute.get("/users",protectroute,getsideusers)

msgroute.get("/:id",protectroute,getmessages)

msgroute.post("/send/:id",protectroute,sendmessage)

export default msgroute