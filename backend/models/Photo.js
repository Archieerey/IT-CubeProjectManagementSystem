import mongoose from "mongoose";

const PhotoSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  gallery: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Gallery",
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Photo", PhotoSchema);