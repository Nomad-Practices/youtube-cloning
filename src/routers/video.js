import express from "express";
import {
  watch,
  getEdit,
  postEdit,
  getUpload,
  postUpload,
} from "../controllers/video";

const video = express.Router();

// 아래와 같은 :id 부분을 parameter라고 하고 string이다.
// url에 변수를 삽입할 수 있다~
// route match 여부는 위에서 아래로 차례대로 확인하므로 route의 순서도 유의해야 한다.
// express에서 route에 정규식을 삽입하여 유연한 matching을 구현할 수 있다. => 정규식에 익숙해지면 굉장히 편리해진다.
video.route("/:id(\\d+)").get(watch);
video.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);
video.route("/upload").get(getUpload).post(postUpload);
export default video;
