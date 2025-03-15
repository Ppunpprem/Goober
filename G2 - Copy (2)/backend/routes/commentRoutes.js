import express from "express";
import { Comment, Bin } from "../models/Bin.js"; // Adjust the import path as needed
import { User } from "../models/User.js"; // Import the User model
import { assignBadgeToUser } from "../services/userService.js"; 

const router = express.Router();

// Get all comments
router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find().populate("user").populate("bin");
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id).populate("user");
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    res.json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { user, bin, text } = req.body;

    const newComment = new Comment({ user, bin, text });
    await newComment.save();

    await Bin.findByIdAndUpdate(bin, { $push: { comments: newComment._id } });

    const userData = await User.findByIdAndUpdate(
      user,
      { $inc: { commentCount: 1 } },  
      { new: true, upsert: true }     
    );

    if (!userData) return res.status(404).json({ message: "User not found" });

    if (userData.commentCount >= 5 && !userData.badges.includes("Earth Guardian")) {
      await assignBadgeToUser(userData._id, "Earth Guardian");
    }

    res.status(201).json(newComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// Update a comment
router.put("/:id", async (req, res) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedComment)
      return res.status(404).json({ message: "Comment not found" });
    res.json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a comment and update the bin's comment list
router.delete("/:id", async (req, res) => {
  try {
    const deletedComment = await Comment.findByIdAndDelete(req.params.id);
    if (!deletedComment)
      return res.status(404).json({ message: "Comment not found" });

    // Remove the comment from the associated bin
    await Bin.findByIdAndUpdate(deletedComment.bin, {
      $pull: { comments: deletedComment._id },
    });

    res.json({ message: "Comment deleted and bin updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

// import express from "express";
// // import bcrypt from "bcryptjs";
// // import jwt from "jsonwebtoken";
// // import { body, validationResult } from "express-validator";
// // import { Comment } from "../models/User.js";
// // import authMiddleware from "../middleware/authMiddleware.js";
// // import authenticateToken from "../middleware/authenticateToken.js";
// // import multer from "multer";
// // import path from "path";
// // import fs from "fs";

// const router = express.Router();
// const __dirname = path.dirname(new URL(import.meta.url).pathname);
// import express from "express";
// import { Comment, Bin } from "../models/Bin.js"; // Adjust the import path as needed

// const router = express.Router();

// // Get all comments
// router.get("/", async (req, res) => {
//   try {
//     const comments = await Comment.find().populate("user").populate("bin");
//     res.json(comments);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Get comments for a specific bin
// router.get("/:commentId", async (req, res) => {
//   try {
//     const comments = await Comment.find({ bin: req.params.commentId }).populate(
//       "user"
//     );
//     res.json(comments);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Add a comment to a bin
// router.post("/", async (req, res) => {
//   try {
//     const { user, bin, text } = req.body;
//     const newComment = new Comment({ user, bin, text });
//     await newComment.save();

//     // Add comment reference to the bin
//     await Bin.findByIdAndUpdate(bin, { $push: { comments: newComment._id } });

//     res.status(201).json(newComment);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // Delete a comment
// router.delete("/:id", async (req, res) => {
//   try {
//     const deletedComment = await Comment.findByIdAndDelete(req.params.id);
//     if (!deletedComment)
//       return res.status(404).json({ message: "Comment not found" });

//     // Remove the comment from the associated bin
//     await Bin.findByIdAndUpdate(deletedComment.bin, {
//       $pull: { comments: deletedComment._id },
//     });

//     res.json({ message: "Comment deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// export default router;
