import express from "express";
import {
  watch,
  getEdit,
  postEdit,
  getUpload,
  postUpload,
} from "../controllers/video";

const video = express.Router();

video.route("/:id(\\d+)").get(watch);
video.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);
video.route("/upload").get(getUpload).post(postUpload);
export default video;
