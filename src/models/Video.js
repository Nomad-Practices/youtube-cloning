import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxLength: 100,
  },
  videoUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxLength: 100,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  hashtags: [
    {
      type: String,
    },
  ],
  meta: {
    views: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
  },
});

videoSchema.static("formatHashtags", (h) => {
  return h.split(",").map((h) => (h.startsWith("#") ? h : "#" + h));
});

export default mongoose.model("Video", videoSchema);
