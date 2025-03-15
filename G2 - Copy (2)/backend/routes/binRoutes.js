import express from "express";
import { Bin, Comment } from "../models/Bin.js"; // Adjust the import path as needed
import { User } from "../models/User.js"; // Adjust path if necessary
import { assignBadgeToUser } from "../services/userService.js"; // Import the function to assign badges

const router = express.Router();

// Get all bins
router.get("/", async (req, res) => {
  try {
    const bins = await Bin.find().populate("comments");
    res.json(bins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific bin by ID
router.get("/:id", async (req, res) => {
  try {
    const bin = await Bin.findById(req.params.id)
      .populate({
        path: 'comments',
        populate: {
          path: 'user',
          select: 'profilePhoto username'
        }
      });

    if (!bin) return res.status(404).json({ message: "Bin not found" });
    res.json(bin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new bin
router.post("/", async (req, res) => {
  try {
    const { user_id, ...binData } = req.body;  
    if (!user_id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const newBin = new Bin({ ...binData, user_id });  
    await newBin.save();

    const userFound = await User.findById(user_id);
    if (!userFound) {
      return res.status(404).json({ message: "User not found" });
    }

    userFound.binCount += 1;
    await userFound.save();

    if (userFound.binCount >= 4 && !userFound.badges.includes("Bin Explorer")) {
      await assignBadgeToUser(userFound._id, "Bin Explorer");  
    }

    res.status(201).json(newBin);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});


router.put("/:id/increase", async (req, res) => {
  try {
    const updatedBin = await Bin.findByIdAndUpdate(
      req.params.id,
      { $inc: { bin_info_correction: 1 } }, // Increase by 1
      { new: true }
    );

    if (!updatedBin) return res.status(404).json({ message: "Bin not found" });

    const userId = req.body.userId;  

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $inc: { trackCount: 1 } }, 
      { new: true }
    );

    if (updatedUser.trackCount >= 10 && !updatedUser.badges.includes("Trash Tracker")) {
      await assignBadgeToUser(updatedUser._id, "Trash Tracker");  
    }

    res.json({ updatedBin, updatedUser });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.put("/:id/decrease", async (req, res) => {
  try {
    // Find the bin first
    const bin = await Bin.findById(req.params.id);
    if (!bin) return res.status(404).json({ message: "Bin not found" });

    // Check if bin_info_correction is already at -5 or lower
    if (bin.bin_info_correction <= -5) {
      await Bin.findByIdAndDelete(req.params.id);
      return res.json({
        message: "Bin deleted due to correction value reaching below -5",
      });
    }

    // Otherwise, decrease bin_info_correction by 1
    const updatedBin = await Bin.findByIdAndUpdate(
      req.params.id,
      { $inc: { bin_info_correction: -1 } },
      { new: true }
    );

    res.json(updatedBin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a bin and its related comments
router.delete("/:id", async (req, res) => {
  try {
    const deletedBin = await Bin.findByIdAndDelete(req.params.id);
    if (!deletedBin) return res.status(404).json({ message: "Bin not found" });

    // Delete all comments associated with this bin
    await Comment.deleteMany({ bin: req.params.id });

    res.json({ message: "Bin and associated comments deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

// import express from "express";
// import { response } from "express";
// // const express = require("express")
// // const mongoose = require("mongoose")
// // const app =express

// const router = express.Router();
// // const __dirname = path.dirname(new URL(import.meta.url).pathname);

// // Auth route to check if the server is working
// router.get("/", (req, res) => {
//   // res.json({ message: "Auth route is working!" });
//   res.send("hi from api  k");
// });

// router.post("/", (req, res) => {
//   try {
//   } catch (error) {
//     response.status(500).json({ message: error.message });
//   }
//   // console.log(req.body);
//   // res.send(req.body);
//   // res.send("data received");
// });

// export default router;

// import express from "express";
// import { Bin } from "../models/Bin.js"; // Adjust the import path as needed

// const router = express.Router();

// // Get all bins
// router.get("/", async (req, res) => {
//   try {
//     const bins = await Bin.find().populate("comments");
//     res.json(bins);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Get a specific bin by ID
// router.get("/:id", async (req, res) => {
//   try {
//     const bin = await Bin.findById(req.params.id).populate("comments");
//     if (!bin) return res.status(404).json({ message: "Bin not found" });
//     res.json(bin);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Create a new bin
// router.post("/", async (req, res) => {
//   try {
//     const newBin = new Bin(req.body);
//     await newBin.save();
//     res.status(201).json(newBin);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // Update bin information
// router.put("/:id", async (req, res) => {
//   try {
//     const updatedBin = await Bin.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     if (!updatedBin) return res.status(404).json({ message: "Bin not found" });
//     res.json(updatedBin);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Delete a bin
// router.delete("/:id", async (req, res) => {
//   try {
//     const deletedBin = await Bin.findByIdAndDelete(req.params.id);
//     if (!deletedBin) return res.status(404).json({ message: "Bin not found" });
//     res.json({ message: "Bin deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// export default router;
