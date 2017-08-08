import gulp from 'gulp';
import babel from 'gulp-babel';

gulp.task('default', () => {
  return gulp.src('**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});
