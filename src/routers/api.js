import express from "express";
import registerView from "../controllers/video/registerView";

const api = express.Router();

api.post("/videos/:id([0-9a-f]{24})/views", registerView);

export default api;
