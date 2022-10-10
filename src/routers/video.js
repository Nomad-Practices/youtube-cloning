import express from "express";
import {
  watch,
  getEdit,
  postEdit,
  getUpload,
  postUpload,
  deleteVideo,
} from "../controllers/video";
import { protect } from "../middlewares";

const video = express.Router();

video.route("/:id([0-9a-f]{24})").get(watch);
video.route("/:id([0-9a-f]{24})/edit").all(protect).get(getEdit).post(postEdit);
video.route("/:id([0-9a-f]{24})/delete").all(protect).get(deleteVideo);
video.route("/upload").get(getUpload).all(protect).post(postUpload);

export default video;
