import express from "express";
import {
  watch,
  getEdit,
  postEdit,
  getUpload,
  postUpload,
  deleteVideo,
} from "../controllers/video";

const video = express.Router();

video.route("/:id([0-9a-f]{24})").get(watch);
video.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit);
video.route("/:id([0-9a-f]{24})/delete").get(deleteVideo);
video.route("/upload").get(getUpload).post(postUpload);

export default video;
