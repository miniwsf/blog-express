import gulp from "gulp";
import babel from "gulp-babel";
import cleanCSS from "gulp-clean-css";
import webpack from "webpack";
const gutil = require("gulp-util"),
    imagemin = require("gulp-imagemin"),
    webpackConfig = require("./webpack.config.js"),
    myDevConfig = Object.create(webpackConfig),
    devCompiler = webpack(myDevConfig);
let path=process.env.NODE_ENV.trim() == "production"?"dist":"dev";

gulp.task("default", ["babel","public","sass","image","buildJs"]);

gulp.task("babel", () =>{
    return gulp.src(["**/*.js","!app.js","!dist/**/*.js","!gulpfile.babel.js","!public/**/*.js","!node_modules/**/*.js","!src/**/*.js","!dev/**/*.js"])
        .pipe(babel())
        .pipe(gulp.dest(path));
});

gulp.task("sass",()=>{
    return gulp.src(["src/css/*.css"])
        .pipe(cleanCSS({compatibility: "ie8"}))
        .pipe(gulp.dest(path+"/app/css"));
});

//用gulp执行webpack.config.js
gulp.task("buildJs", function (callback) {
    devCompiler.run(function(err, stats) {
        if(err) throw new gutil.PluginError("webpack:buildJs", err);
        gutil.log("[webpack:buildJs]", stats.toString({
            colors: true
        }));
        callback();
    });
});

gulp.task("image",()=>{
    return gulp.src(["src/images/*.{png,jpg,gif,ico}"])
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest(path+"/app/images"));
});

gulp.task("public",()=>{
    return gulp.src(["public/**"])
        .pipe(gulp.dest(path+"/app"));
});

gulp.task("help",()=>{
    console.log("以下显示该项目常用命令:");
    console.log("1. npm run start:dev(发布dev本地）或npm run start:build（发布dist线上）");
    console.log("2. npm run clean:dev,删除本地编译文件");
    console.log("3. npm run clean:dist,删除生产环境项目");
    console.log("4. npm run build,编译正式发布文件");
    console.log("5. npm run dev,编译本地测试环境文件");
});