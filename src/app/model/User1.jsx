// models/Image.js

import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  filePath: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Image = mongoose.models.Image || mongoose.model("Image", imageSchema);
export default Image;
