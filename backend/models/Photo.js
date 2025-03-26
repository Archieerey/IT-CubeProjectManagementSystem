import mongoose from 'mongoose';

const PhotoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  gallery: { type: mongoose.Schema.Types.ObjectId, ref: 'Gallery' },
  createdAt: { type: Date, default: Date.now }
});

const Photo = mongoose.model('Photo', PhotoSchema);
export default Photo;