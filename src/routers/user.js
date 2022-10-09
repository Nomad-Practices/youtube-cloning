import express from "express";
import {
  remove,
  edit,
  see,
  startGithubLogin,
  finishGithubLogin,
} from "../controllers/user";

const user = express.Router();

user.get("/edit", edit);
user.get("/remove", remove);
user.get("/:id", see);
user.get("/github/start", startGithubLogin);
user.get("/github/finish", finishGithubLogin);

export default user;
