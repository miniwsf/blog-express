"use strict";

let mongoose = require("mongoose");
//设置mongo存储路径
let DB_URL = "mongodb://localhost:27017/myBlog";

//连接数据库
mongoose.connect(DB_URL,{ useMongoClient: true });

//连接成功后输出语句
mongoose.connection.on("connected",function () {
    console.info("Mongoose connect" + DB_URL + " success");
});

//连接异常现实错误原因
mongoose.connection.on("error",function (err) {
    console.error("Mongoose connect Error:" + err);
});

//连接断开后输出语句
mongoose.connection.on("disconnected",function () {
    console.info("Mongoose connect disconnected");
});

//导出mongoose对象
module.exports = mongoose;
