import gulp from "gulp";
import babel from "gulp-babel";
import cleanCSS from "gulp-clean-css";
import jsmin from "gulp-jsmin";
import webpack from "webpack";
const gutil = require("gulp-util"),
    webpackConfig = require("./webpack.config.js"),
    myDevConfig = Object.create(webpackConfig),
    devCompiler = webpack(myDevConfig);

gulp.task("default", ["babel","public","sass","image","buildJs"]);

gulp.task("babel", () =>{
    return gulp.src(["**/*.js","!app.js","!dist/**/*.js","!gulpfile.babel.js","!public/**/*.js","!node_modules/**/*.js","!src/**/*.js"])
        .pipe(babel())
        .pipe(gulp.dest("dist"));
});

gulp.task("sass",()=>{
    return gulp.src(["src/css/*.css"])
        .pipe(cleanCSS({compatibility: "ie8"}))
        .pipe(gulp.dest("dist/app/css"));
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

gulp.task("js",()=>{
    return gulp.src(["src/js/**/*.js"])
        .pipe(babel({presets:["env"]}))
        .pipe(jsmin())
        .pipe(gulp.dest("dist/app/js"));
});

gulp.task("image",()=>{
    return gulp.src(["src/images/**"])
        .pipe(gulp.dest("dist/app/images"));
});

gulp.task("public",()=>{
    return gulp.src(["public/**"])
        .pipe(gulp.dest("dist/app"));
});

