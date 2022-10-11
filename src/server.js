import express from "express";
import session from "express-session";
import morgan from "morgan";
import { rootRouter, videoRouter, userRouter } from "./routers";
import { locals } from "./middlewares";
import MongoStore from "connect-mongo";

const app = express();

app.use(morgan("dev"));
// express에서 form을 사용하기 위해서는 아래와 같은 조건이 필요하다!
app.use(express.urlencoded({ extended: true }));
// 서버 구동할 때마다 아래 mw 실행으로 세션정보를 저장하는 memoryStore가 생성된다.
// => 서버 구동여부와 별개로 세션을 보존하려면 session Storage가 필요하다.
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false, // 초기화된(req.session에 새로운 key/value가 추가된) 세션들만 sessionStore에 저장 즉, 쿠키를 전달한다.
    store: MongoStore.create({
      mongoUrl: process.env.DB_URL,
    }),
  })
);
app.use(locals);

app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);
app.use("/uploads", express.static("uploads"));

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

export default app;
