import express from "express";
import {
  remove,
  getEdit,
  postEdit,
  see,
  startGithubLogin,
  finishGithubLogin,
  getChangePw,
  postChangePw,
} from "../controllers/user";
import { protect, publicOnly } from "../middlewares";

const user = express.Router();

user.route("/edit").all(protect).get(getEdit).post(postEdit);
user.get("/remove", remove);
user.get("/:id([0-9a-f]{24})", see);
user.route("/github/start").all(publicOnly).get(startGithubLogin);
user.route("/github/finish").all(publicOnly).get(finishGithubLogin);
user.route("/change-password").all(protect).get(getChangePw).post(postChangePw);

export default user;
