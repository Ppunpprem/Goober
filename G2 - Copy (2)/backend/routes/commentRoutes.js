import express from "express";
import { Comment } from "../models/Comment.js"; // Adjust the import path as needed
import { Bin } from "../models/Bin.js"; // Import the Bin model

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

// Get comments for a specific bin
router.get("/comment/:binId", async (req, res) => {
  try {
    const comments = await Comment.find({ bin: req.params.binId }).populate(
      "user"
    );
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a comment to a bin
router.post("/", async (req, res) => {
  try {
    const { user, bin, text } = req.body;
    const newComment = new Comment({ user, bin, text });
    await newComment.save();

    // Add comment reference to the bin
    await Bin.findByIdAndUpdate(bin, { $push: { comments: newComment._id } });

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
