import express from "express";
import { join, login } from "../controllers/user";
import { home, search } from "../controllers/video";

const global = express.Router();

global.get("/", home);
global.get("/join", join);
global.get("/login", login);
global.get("/search", search);

export default global;
