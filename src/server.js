import "./db.js";

import express from "express";
import { log } from "console";
import morgan from "morgan";
import { globalRouter, videoRouter, userRouter } from "./routers";

const app = express();
const PORT = 4000;

app.use(morgan("dev"));
// express에서 form을 사용하기 위해서는 아래와 같은 조건이 필요하다!
app.use(express.urlencoded({ extended: true }));

app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.listen(PORT, () => log("✅ Server listening to port 4000"));
