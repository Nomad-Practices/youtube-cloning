import express from "express";
import { getJoin, postJoin, getLogin, postLogin } from "../controllers/user";
import { home, search } from "../controllers/video";

const global = express.Router();

global.get("/", home);
global.route("/join").get(getJoin).post(postJoin);
global.route("/login").get(getLogin).post(postLogin);
global.get("/search", search);

export default global;
