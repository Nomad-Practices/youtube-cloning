import express from "express";
import session from "express-session";
import morgan from "morgan";
import { rootRouter, videoRouter, userRouter } from "./routers";
import locals from "./middlewares/locals";

const app = express();

app.use(morgan("dev"));
// express에서 form을 사용하기 위해서는 아래와 같은 조건이 필요하다!
app.use(express.urlencoded({ extended: true }));
// 서버 구동할 때마다 아래 mw 실행으로 express session Store(서버 단 특정 메모리 영역에서 동작하는 프로세스)가 생성된다.
// 세션 스토어 내의 세션은 쿠키를 key값으로 가지는 객체로 저장된다.
// 특정 클라이언트의 첫 요청에 session id가 담긴 쿠키를 전달한다.
app.use(
  session({
    secret: "hello!",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(locals);

app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

export default app;
