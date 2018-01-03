import gulp from "gulp";
import babel from "gulp-babel";
import cleanCSS from "gulp-clean-css";
import jsmin from "gulp-jsmin";

gulp.task("default", ["babel","public","sass","js","image"]);

gulp.task("babel", () =>{
    return gulp.src(["**/*.js","!app.js","!dist/**/*.js","!gulpfile.babel.js","!public/**/*.js","!node_modules/**/*.js","!src/**/*.js"])
        .pipe(babel())
        .pipe(gulp.dest("dist"));
});

gulp.task("sass",()=>{
    return gulp.src(["src/css/*.css"])
        .pipe(cleanCSS({compatibility: "ie8"}))
        .pipe(gulp.dest("dist/public/css"));
});

gulp.task("js",()=>{
    return gulp.src(["src/js/**/*.js"])
        .pipe(babel())
        .pipe(jsmin())
        .pipe(gulp.dest("dist/public/js"));
});

gulp.task("image",()=>{
    return gulp.src(["src/images/**"])
        .pipe(gulp.dest("dist/public/images"));
});

gulp.task("public",()=>{
    return gulp.src(["public/**"])
        .pipe(gulp.dest("dist/public"));
});

