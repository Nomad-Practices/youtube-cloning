import express from "express";
import { join } from "../controllers/user";
import { trending } from "../controllers/video";
import { login } from "../controllers/user";
import { search } from "../controllers/video";

const global = express.Router();

global.get("/", trending);
global.get("/join", join);
global.get("/login", login);

export default global;
