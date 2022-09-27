import express from "express";
import { remove, edit, logout, see } from "../controllers/user";

const user = express.Router();

user.get("/edit", edit);
user.get("/remove", remove);
user.get("/:id", see);
user.get("/logout", logout);

export default user;
