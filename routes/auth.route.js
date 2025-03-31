import express from 'express'
import { registerUser, loginUser } from '../controllers/auth.controller.js'
import { forgetUsername, forgetPassword, resetPassword } from '../controllers/auth.controller.js'

const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/forgot-username", forgetUsername)
router.post("/forgot-password", forgetPassword);
router.post("/reset-password", resetPassword);

export default router