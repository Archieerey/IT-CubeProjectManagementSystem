import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.model("Role", RoleSchema);