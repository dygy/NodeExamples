const gulp = require("gulp"),
  browserSync = require("browser-sync").create(),
  nodemon = require("gulp-nodemon"),
  plumber = require('gulp-plumber'),
  sass = require('gulp-sass');
gulp.task('scss', function () {
  return gulp.src('./dev/scss/style.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('watch', function () {
  gulp.watch('./dev/scss//**/*.scss', ['scss']);
  gulp.watch(".views/**/*.ejs").on('change', browserSync.reload);
  gulp.watch(".dist/**/*.css").on('change', browserSync.reload);
});


gulp.task('browser-sync', ['nodemon'], function() {
  browserSync.init(null, {
    proxy: "http://localhost:3000",
    files: ["public/**/*.*"],
    browser: "chrome",
    port: 7000,
  });
});

gulp.task('nodemon', function (cb) {
  let started = false;
  return nodemon({
    //  script: './index.js'
  }).on('start', function () {
    if (!started) {
      cb();
      started = true;
    }
  });
});


gulp.task('default', ['scss','watch','browser-sync']);