import express from "express";
import { join } from "../controllers/user";
import { home } from "../controllers/video";
import { login } from "../controllers/user";

const global = express.Router();

global.get("/", home);
global.get("/join", join);
global.get("/login", login);

export default global;
