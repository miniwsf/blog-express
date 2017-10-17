import gulp from 'gulp';
import babel from 'gulp-babel';

gulp.task('default',() => {
  return gulp.src(['**/*.js','!app.js','!dist/**/*.js','!gulpfile.babel.js','!public/**/*.js','!node_modules/**/*.js'])
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});

/*babel*/
gulp.task('babel',() => {
    return gulp.src(['**/*.js','!app.js','!dist/**/*.js','!gulpfile.babel.js','!public/**/*.min.js','!node_modules/**/*.js'])
        .pipe(babel())
        .pipe(gulp.dest('dist'));
});

/*压缩*/
gulp.task('uglify',() => {
    return gulp.src(['dist/**/*.js'])
        .pipe(babel())
        .pipe(gulp.dest('dist'));
});

/*测试*/
gulp.task('dev',['babel'],() => {
    return gulp.src(['**/*.js','!app.js','!dist/**/*.js','!gulpfile.babel.js','!public/**/*.js','!node_modules/**/*.js'])
        .pipe(babel())
        .pipe(gulp.dest('dist'));
});

/*上线*/
gulp.task('dist',() => {
    return gulp.src(['**/*.js','!app.js','!dist/**/*.js','!gulpfile.babel.js','!public/**/*.js','!node_modules/**/*.js'])
        .pipe(babel())
        .pipe(gulp.dest('dist'));
});
