import express from "express";
import {
  forgotPassword,
  logIn,
  logOut,
  signUp,
  verifyEmail,
} from "../controllers/auth.js";
const router = express.Router();

router.post("/signup", signUp);
router.post("/verify-email", verifyEmail);
router.post("/signin", logIn);
router.post("/signout", logOut);
router.post("/forgot-password", forgotPassword);

export default router;
