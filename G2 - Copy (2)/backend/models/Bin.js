import mongoose from "mongoose";

// Comment Schema
const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User
  bin: { type: mongoose.Schema.Types.ObjectId, ref: "Bin", required: true }, // Reference to Bin
  text: { type: String, required: true }, // Comment text
  createdAt: { type: Date, default: Date.now }, // Timestamp
});

// Bin Schema
const binSchema = new mongoose.Schema({
  bin_location: { type: Object, required: true }, // Changed 'location' to 'Object' to avoid errors
  bin_name_location: { type: String, required: true },
  bin_info_correction: { type: Number, default: 0 },
  bin_floor_number: { type: Number, required: true },
  bin_features_general_waste: { type: Boolean, required: true },
  bin_features_recycle_waste: { type: Boolean, required: true },
  bin_features_organic_waste: { type: Boolean, required: true },
  bin_features_hazardous_waste: { type: Boolean, required: true },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }], // Array of comments
});

// Models
const Bin = mongoose.model("Bin", binSchema);
const Comment = mongoose.model("Comment", commentSchema);

export { Bin, Comment };
