import multer from "multer";

export default multer({
  dest: "uploads/videos",
  limits: {
    fileSize: 30_000_000,
  },
});
