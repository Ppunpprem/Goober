import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import { User } from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";
import authenticateToken from "../middleware/authenticateToken.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join("public/uploads/profile_photos");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Auth route to check if the server is working
router.get("/", (req, res) => {
  res.json({ message: "Auth route is working!" });
});

// Register Route with Validation
router.post(
  "/register",
  upload.single("profilePhoto"), // This will handle the 'profilePhoto' field in the request
  [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("firstName").notEmpty().withMessage("First name is required"),
    body("lastName").notEmpty().withMessage("Last name is required"),
    body("age").notEmpty().withMessage("Age is required"),
    body("gender").notEmpty().withMessage("Gender is required"),
    body("phone")
      .isLength({ min: 10, max: 10 })
      .withMessage("Phone number must be 10 digits"),
    body("username").notEmpty().withMessage("Username is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const {
        firstName,
        middleName,
        lastName,
        age,
        gender,
        phone,
        email,
        homeAddress,
        username,
        password,
      } = req.body;
      let user = await User.findOne({ email });
      if (user) return res.status(400).json({ msg: "User already exists" });

      const hashedPassword = await bcrypt.hash(password, 10);
      // If a profile photo is uploaded, get the file path
      const profilePhoto = req.file ? req.file.path.replace(/\\/g, "/") : null;

      user = new User({
        firstName,
        middleName,
        lastName,
        age,
        gender,
        phone,
        email,
        homeAddress,
        username,
        password: hashedPassword,
        profilePhoto,
      });

      await user.save();

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.json({ msg: "User registered successfully!", token });
    } catch (error) {
      console.error("Error during registration:", error);
      res.status(500).json({ msg: "Server error" });
    }
  }
);

// Login Route with Validation
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;
      console.log("Login attempt with email:", email); // Debugging line
      const user = await User.findOne({ email });
      if (!user) {
        console.log("User not found"); // Debugging line
        return res.status(400).json({ msg: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log("Invalid credentials"); // Debugging line
        return res.status(400).json({ msg: "Invalid credentials" });
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.json({ token });
    } catch (error) {
      console.log("Error during login:", error); // Debugging line
      res.status(500).json({ msg: "Server error" });
    }
  }
);

// Protected Route

router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user); 
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      age: user.age,
      gender: user.gender,
      homeAddress: user.homeAddress,
      username: user.username,
      profilePhoto: user.profilePhoto
        ? `http://localhost:5001/${user.profilePhoto.replace(/\\/g, "/")}`
        : null,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

router.put(
  "/profile",
  authMiddleware,
  upload.single("profilePhoto"),
  async (req, res) => {
    try {
      // Destructure the request body
      const {
        firstName,
        lastName,
        username,
        email,
        phone,
        age,
        gender,
        homeAddress,
        password,
      } = req.body;

      // Find the user by ID from the token
      const user = await User.findById(req.user);
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }

      // Update user data if fields are provided
      if (firstName) user.firstName = firstName;
      if (lastName) user.lastName = lastName;
      if (username) user.username = username;
      if (email) user.email = email;
      if (phone) user.phone = phone;
      if (age) user.age = age;
      if (gender) user.gender = gender;
      if (homeAddress) user.homeAddress = homeAddress;

      // Handle password change if provided
      if (password) {
        if (password.length < 6) {
          return res
            .status(400)
            .json({ msg: "Password must be at least 6 characters long" });
        }
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
      }

      // Handle profile photo update
      if (req.file) {
        // Delete the old profile photo if it exists
        if (user.profilePhoto) {
          const oldPath = user.profilePhoto.replace(
            "http://localhost:5001/",
            ""
          );
          fs.unlink(oldPath, (err) => {
            if (err) console.error("Failed to delete old profile photo:", err);
          });
        }
        // Save the new photo path
        user.profilePhoto = `public/uploads/profile_photos/${req.file.filename}`;
      }

      // Save the updated user
      await user.save();

      // Respond with a success message and the updated user data
      res.json({
        msg: "Profile updated successfully!",
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          email: user.email,
          phone: user.phone,
          age: user.age,
          gender: user.gender,
          homeAddress: user.homeAddress,
          profilePhoto: user.profilePhoto
            ? `http://localhost:5001/${user.profilePhoto.replace(/\\/g, "/")}`
            : null,
        },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Server error" });
    }
  }
);

export default router;
