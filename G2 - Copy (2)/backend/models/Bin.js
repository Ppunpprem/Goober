import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence";

// Bin Schema
const binSchema = new mongoose.Schema({
  // bin_id: { type: Number, unique: true }, // Auto-incrementing bin_id
  bin_location: { type: Object, required: true },
  bin_name_location: { type: String, required: true },
  bin_info_correction: { type: Number, default: 0 },
  bin_floor_number: { type: String, required: true },
  bin_features_general_waste: { type: Boolean, required: true },
  bin_features_recycle_waste: { type: Boolean, required: true },
  bin_features_organic_waste: { type: Boolean, required: true },
  bin_features_hazardous_waste: { type: Boolean, required: true },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }], // Array of comments
});

const Bin = mongoose.model("Bin", binSchema);

export { Bin };
