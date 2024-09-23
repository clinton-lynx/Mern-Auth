import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateJWT } from "../utils/generateToken.js";
import { sendOtp, sendResetPasswordLink } from "../nodemailer/emails.js";

// handles sign up logic
export const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!email || !password || !name) {
      throw new Error("all fields are required");
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "user already exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    generateJWT(res, user._id);
    await sendOtp(user.email, verificationToken);
    res
      .status(201)
      .json({ success: true, message: "user created", user: { ...user._doc } });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// handles verify email logic
export const verifyEmail = async (req, res) => {
  const { otp } = req.body;
  console.log(otp);

  try {
    const user = await User.findOne({
      verificationToken: otp,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "couldn't verifry user",
      });
    }
    user.isVerified = true;
    await user.save();
    return res.status(200).json({
      success: true,
      message: "verified user",
    });
  } catch (error) {
    console.log(error);
  }
};

// handles login logic
export const logIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "This account Does not exist",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }
    generateJWT(res, user._id);
    user.lastLogin = new Date();
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Login Successfully",
    });
  } catch (error) {
    console.log("errror", error);
  }
};
// handles logout logic
export const logOut = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "logged out successfully",
  });
};

// handles forgot password
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "This account Does not exist",
      });
    }
    await sendResetPasswordLink(user.email);
    res.status(200).json({
      success: true,
      message: " Check Your Email For Reset Link"
    })
  } catch (error) {}
};
