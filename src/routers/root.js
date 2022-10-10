import express from "express";
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
  logout,
} from "../controllers/user";
import { home, search } from "../controllers/video";
import { protect, publicOnly } from "../middlewares";

const global = express.Router();

global.get("/", home);
global.route("/join").all(publicOnly).get(getJoin).post(postJoin);
global.route("/login").all(publicOnly).get(getLogin).post(postLogin);
global.route("/logout").all(protect).get(logout);
global.get("/search", search);

export default global;
