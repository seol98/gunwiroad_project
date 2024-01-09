import "dotenv/config"
// async, await을 사용하기 위함
import "regenerator-runtime"

// common js 방식
// const express = required("express")

// build를 통해서 common js로 바꿔줘야 함 -> 라이브러리가 필요
import express from "express";
import viewRouter from "./router/viewRouter";
import apiRouter from "./router/apiRouter";

const app = express();
const cors = require('cors');

/* 
    node는 middleware 시스템으로 이루어져있음
*/

/* 
    ejs 탬플릿 엔진
    구멍이 있는 페이지 -> 구멍에 데이터를 넣을 수 있음
    node pug, ejs, ...
    npm install ejs
*/

// express야 나 ejs 쓸 거야
app.set("view engine", "ejs");
// ejs의 파일의 위치는 이 프로젝트의 src 폴더에 client 폴더에 html 폴더 안에 있어
app.set("views", process.cwd() + "/src/client/html");

// json 데이터 파싱 미들웨어
app.use(express.json());

// 미들웨어
/* app.use((request, response, next) => {
    console.log("지나갑니다");
    next();
}); */
app.use(cors());
app.use("/css", express.static("src/client/css"));
app.use("/js", express.static("src/client/js"));
app.use("/file", express.static("src/client/file"));

/* 
    주소: /**  view만 전달해주는 router viewRouter -> ejs 파일만 전달해주는 router
    주소: /api/** api만 전달해주는 router apiRouter -> 데이터만 전달해주는 router
*/

app.use("/", viewRouter);

app.use("/api", apiRouter);

/* 
    port 
    192.168.0.69:8080
*/

app.listen(8080, () => {
    console.info("8080 포트 서버 열림 http://localhost:8080");
});
