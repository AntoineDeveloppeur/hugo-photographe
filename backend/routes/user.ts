import express from "express"
import userCtrl from "@/backend/controllers/user.js"

const router = express.Router()

router.put("/modifyPassword", userCtrl.modifyPassword)
router.post("/signIn", userCtrl.signIn)

export default router
