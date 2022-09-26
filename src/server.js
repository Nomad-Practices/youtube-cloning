import express from "express";
import { log } from "console";

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
app.use(logger, privateMiddleware);

// 보통 mw와 별도로 request에 대한 응답을 전송하는 마지막 콜백함수를 controller라고 부른다.
// mw와 다르게 보통 next 메서드를 사용하지 않는다.
// 첫 번째 인자인 path도 route라고도 부른다.
// controller 이전까지 일련의 mw들을 나열하면 해당 mw들은 그 route를 처리할 때만 사용된다.
app.get("/", (req, res) => {
  return res.end();
});
app.get("/protected", (req, res) => {
  return res.send("Welcome to private lounge");
});

app.listen(PORT, () => log("✅ Server listening to port 4000"));
