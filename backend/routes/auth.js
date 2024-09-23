import express from "express";
import {
  forgotPassword,
  logIn,
  logOut,
  resetPassword,
  signUp,
  verifyEmail,
} from "../controllers/auth.js";
const router = express.Router();

router.post("/signup", signUp);
router.post("/verify-email", verifyEmail);
router.post("/signin", logIn);
router.post("/signout", logOut);                          
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword)
export default router;
