import express, { application } from "express";
import { log } from "console";
import morgan from "morgan";
import { globalRouter, videoRouter, userRouter } from "./routers";

const app = express();
const PORT = 4000;

// middleware
// 웹 서버가 요청을 받고 브라우저로 응답을 전송하기 전까지 중간에 수행되는 sw
// 모든 mw는 req, res, next를 인자로 받는다.
// 하나의 request에 대해서 연속적으로 실행되는 콜백함수들(3번째 인자인 next를 실행하는)로도 이해할 수 있다.
// mw를 이용하면 요청에 대한 정보로 응답 전에 연결을 끊는 등에 제어로직을 작성할 수 있다.
const logger = (req, res, next) => {
  log(`${req.method} ${req.url}`);
  next();
};
const privateMiddleware = ({ url }, res, next) => {
  if (url === "/protected") {
    return res.send("<h1>NOT ALLOWED</h1>");
  } else {
    log("ALLOWED");
    next();
  }
};

// global middleware를 만들 때, .use 메서드를 사용한다.
// 호출한 줄 이후에 위치한 임의의 request들에 대해서 적용된다.
// mw를 직접 만들 수도 있지만 morgan과 같은 external mw를 다운받아서 사용할 수도 있다~
app.use(morgan("dev"));
// express에서 form을 사용하기 위해서는 아래와 같은 조건이 필요하다!
app.use(express.urlencoded());

// 라우터 => url들을 prefix(root)별로 그룹화하여 독립적으로 관리할 수 있다.
// 클라이언트가 root로 시작하는 url을 요청하면 root에 대응되는 router에 controller와 mw가 존재한다.
// => 즉, router는 특정 패턴의 url만 처리하는 하위 app으로 볼 수 있다.
// router 안에는 하위 router를 만들 수도 있다.
app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

// 보통 mw와 별도로 request에 대한 응답을 전송하는 등의 마지막 콜백함수(관련된 로직들)를 controller라고 부른다.
// 하지만 controller는 요청 단위가 어떤 관련성에 따라 그룹화가 된다는 점을 유의하자.
// mw와 다르게 보통 next 메서드를 사용하지 않는다.
// 첫 번째 인자인 path도 route라고도 부른다.
// controller 이전까지 일련의 mw들을 나열하면 해당 mw들은 그 route를 처리할 때만 사용된다.
// app.get("/", (req, res) => {
//   return res.end();
// });
// app.get("/protected", (req, res) => {
//   return res.send("Welcome to private lounge");
// });

// template engine은 다음과 같이 지정할 수 있다.
// express에서는 default로 "process.cwd() + /views"에 위치한 .pug 파일들을 탐색한다.
// 여기서 process.cwd()는 node를 실행하는 파일 즉, package.json이 위치한 폴더(/)를 가리킨다.
// pug의 장점들을 나열하면 다음과 같다.
// 1. template으로 html 코드를 간결하게 작성할 수 있다.
// 2. #{...} 안에 js 코드를 작성할 수 있다.
// 3. partial을 include하여 다른 template을 재사용할 수 있다.
// 4. extends 키워드와 block 키워드로 다른 template을 상속받아(.h처럼 복사하여) 확장할 수 있다. => block은 일종의 Vue의 slot 역할을 한다.
// 5. .pug에서 사용할 js 변수를 controller에서 전달할 수 있다.
// 6. conditionals로 conditional rendering이 가능하다.
// 7. iteration으로 list rendering이 가능하고 빈 iterable(배열이나 객체)에 대해서 분기처리가 가능하다.
// 8. mixin => 외부 데이터로 binding할 수 있는 partial => UI Component~~!!!
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.listen(PORT, () => log("✅ Server listening to port 4000"));

// 적절한 partial과 block을 만드는 것은 재사용 가능한 vue 컴포넌트를 만드는 것과 같다.
