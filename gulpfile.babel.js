import gulp from "gulp";
import babel from "gulp-babel";

gulp.task("default", () =>{
    return gulp.src(["**/*.js","!app.js","!dist/**/*.js","!gulpfile.babel.js","!public/**/*.js","!node_modules/**/*.js"])
    .pipe(babel())
    .pipe(gulp.dest("dist"));
});