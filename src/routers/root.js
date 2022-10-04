import express from "express";
import { getJoin, login, postJoin } from "../controllers/user";
import { home, search } from "../controllers/video";

const global = express.Router();

global.get("/", home);
global.route("/join").get(getJoin).post(postJoin);
global.get("/login", login);
global.get("/search", search);

export default global;
