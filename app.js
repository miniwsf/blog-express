var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

var index = require("./dist/routes/index");
var login = require("./dist/routes/login");
var file = require("./dist/routes/file");
var article=require("./dist/routes/article");
var user=require("./dist/routes/user");
var articleType=require("./dist/routes/articleType");
var demo = require("./dist/routes/demo");
// handlebars module
var handlebars=require("express3-handlebars");
var express_handlebars_sections = require("express-handlebars-sections");
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "dist/views"));
app.engine("hbs", handlebars({
    layoutsDir: "views",
    defaultLayout: "layout",
    extname: ".hbs",
    partialsDir:__dirname + "/views/template/",
    helpers:{
        section: express_handlebars_sections()
    }
}));
app.set("jwtTokenSecret", "SECRET_TOKEN");
app.set("view engine", "hbs");

app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/login", login);
app.use("/article", article);
app.use("/articleAdd", article);
app.use("/articleType", articleType);
app.use("/uploadFile", file);
app.use("/", index);
app.use("/blog", index);
app.use("/blogMore", index);
app.use("/home", index);
app.use("/demo", demo);
app.use("/aboutMe", index);
app.use("/blogDeatil", index);
app.use("/file", file);
app.use("/user", user);

/*检查路由是否存在*/
app.use(function(req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    res.render("404",{layout:null});
});

/*检测是否出错*/
app.use(function(err, req, res, next) {
    "use strict";
    var status=err.status;
    if(status=="401"){ /*没有认证*/
        res.status(status);
        res.render("login",{layout:null});
    }
    else{
        res.locals.message = err.message;
        res.locals.error = req.app.get("env") === "development" ? err : {};

        res.status(status || 500);
        res.render("error",{layout:null,msg:err.message});
    }
});
/*app.listen(80);*/

process.on("uncaughtException", function (err) {
    //打印出错误
    console.log(err);
    //打印出错误的调用栈方便调试
    console.log(err.stack);
});

module.exports = app;
