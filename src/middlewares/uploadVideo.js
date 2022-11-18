import multer from "multer";

export default multer({
  dest: "uploads/videos",
  limits: {
    fileSize: 50_000_000,
  },
});
