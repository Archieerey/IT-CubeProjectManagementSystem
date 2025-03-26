import mongoose from 'mongoose';

const GallerySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  photos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Photo' }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Gallery', GallerySchema);