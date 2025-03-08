import express from "express"
import signup  from "../controllers/signup.controller.js"
import login from "../controllers/login.controller.js"
import logout from "../controllers/logout.controller.js"
import updateprofile from "../controllers/updateprofile.controller.js"
import checkauth from "../controllers/checkauth.controller.js"
import { protectroute } from "../middleware/protectroute.middleware.js"

const router=express.Router()

router.post("/signup",signup)

router.post("/login",login)

router.post("/logout",logout)

router.put("/update-profile",protectroute,updateprofile)

router.get("/check",protectroute,checkauth)


export default router