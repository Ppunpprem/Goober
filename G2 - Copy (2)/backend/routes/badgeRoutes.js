import express from "express";
import { assignBadge } from "../controller/badgeController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { User } from "../models/User.js";

const router = express.Router();

// Route to assign a badge
router.post("/assign-badge", assignBadge);

// Route to fetch user profile
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    // Ensure req.user exists
    if (!req.user) {
      return res.status(401).json({ msg: "Unauthorized. User not found." });
    }

    const user = await User.findById(req.user); // Access the user with the ID stored in `req.user`

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json({
      firstName: user.firstName,
      lastName: user.lastName,
      badges: user.badges, 
      binCount: user.binCount // Send badges array
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;
