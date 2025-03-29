import express from "express";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { io } from "../index.js";
import Joi from "joi";
import jwt from "jsonwebtoken";
import checkUserAuth from "../middlewares/checkUserAuth.js";

const userRouter = express.Router();
// TODO: secure the cookies in all routes with proper steps (currently just basic setuped)
// Signup Route
userRouter.post("/api/signup", async (req, res) => {
  try {
    // Request data validation check
    const schema = Joi.object().keys({
      username: Joi.string().alphanum().min(3).max(50).required(),
      email: Joi.string().email().required(),
      password: Joi.string().pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[\\S]{8,}$")).required(),
    });
    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json({ error: "Something went wrong!" });

    // Destructure the request data
    const { username, email, password } = value; // TODO: bcrypt leaks memory find fix later
    // Check if user(email) already exists
    const existingUserByEmail = await User.findOne({ email: email });
    if (existingUserByEmail) {
      return res.status(409).json({ error: "Email already exists!" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND) || 10);
    const userData = new User({
      username: username,
      email: email,
      password: hashedPassword,
    });

    // Save the data to db
    await userData.save();
    res.status(201).json({ message: "User created successfully!" });
    console.log("User created successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
});

// Login route
userRouter.post("/api/login", async (req, res) => {
  try {
    // Request data validation
    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[\\S]{8,}$")).required(),
    });
    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json({ error: "Something went wrong!" });

    // Destructure the request data
    const { email, password } = value; // TODO: bcrypt leaks memory find fix later
    // Search the user by email
    const existingUserByEmail = await User.findOne({ email: email });
    if (!existingUserByEmail) return res.status(401).json({ error: "Invalid email or password!" }); // TODO: maybe problem in logic check out later

    // Compare the hashed password with request password
    const isPasswordCorrect = await bcrypt.compare(password, existingUserByEmail.password);
    if (!isPasswordCorrect) return res.status(401).json({ error: "Invalid email or password!" });

    // Setup JWT auth access token and refresh token
    const payload = {
      id: existingUserByEmail._id,
    };
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXP_TIME,
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET, {
      // TODO: save refresh token in db
      expiresIn: process.env.REFRESH_TOKEN_EXP_TIME,
    });

    io.emit("logged_in");
    res
      .cookie("refresh_token", refreshToken, {
        // TODO: Add additional security booleans later
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({ message: "Login Successful", user_id: existingUserByEmail._id, username: existingUserByEmail.username, email: existingUserByEmail.email, access_token: accessToken });
  } catch (err) {
    res.json({ error: err });
  }
});

userRouter.get("/api/refresh", async (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken) {
      return res.status(401).json({ error: "Refresh Token not found!" });
    }
    // Check and validate the refresh token from frontend
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET);
    const userId = decoded.id;
    const user = await User.findById(userId);
    if (!user) return res.status(403).json({ error: "User not found!" });
    const newAccessToken = jwt.sign({ id: userId }, process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXP_TIME });
    return res.json({
      user_id: userId,
      username: user.username,
      email: user.email,
      access_token: newAccessToken,
    });
  } catch (err) {
    return res.status(403).json({ error: "Invalid Refresh Token!" });
  }
});

userRouter.get("/api/me", checkUserAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ id: user._id, username: user.username, email: user.email }); // Send user data to frontend
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Logout route
userRouter.post("/api/logout", (req, res) => {
  try {
    res.clearCookie("refresh_token", {
      httpOnly: true,
      sameSite: "strict", // Prevent CSRF attacks
      path: "/", // Ensure it's cleared across the entire site
    });

    res.status(200).json({ message: "Logout successful!" });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

userRouter.post("/api/user/edit", checkUserAuth, (req, res) => {
  res.json({ message: "Secure route accessed!" });
});

export default userRouter;
