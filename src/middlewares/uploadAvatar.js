import multer from "multer";

export default multer({
  dest: "uploads/avatars",
  limits: {
    fileSize: 3000_000,
  },
});
