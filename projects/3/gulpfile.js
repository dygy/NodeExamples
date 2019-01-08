/* eslint-disable node/no-unpublished-require */
const gulp = require("gulp"),
  browserSync = require("browser-sync").create(),
  nodemon = require("gulp-nodemon"),
  plumber = require("gulp-plumber"),
  concat = require("gulp-concat"),
  uglify = require("gulp-uglifyjs"),
  sass = require("gulp-sass");
gulp.task("scss", function() {
  return gulp
    .src("./dev/scss/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest("./dist/css"));
});

gulp.task("watch", function() {
  gulp
    .watch("./dev/scss//**/*.scss", ["scss"])
    .on("change", browserSync.reload);
  gulp.watch("./views/**/*.ejs").on("change", browserSync.reload);
  gulp.watch("./dist/**/*.css").on("change", browserSync.reload);
  gulp.watch("./dev/js/**/*.js", ["scripts"]).on("change", browserSync.reload);
});

gulp.task("browser-sync", ["nodemon"], function() {
  browserSync.init(null, {
    proxy: "http://localhost:3000",
    files: ["public/**/*.*"],
    browser: "chrome",
    port: 7000
  });
});
gulp.task("scripts", () =>
  gulp
    .src([
      "./dev/script/auth.js"
      //
    ])
    .pipe(concat("script.js"))
    .pipe(uglify())
    .pipe(gulp.dest("./dist/script"))
);
gulp.task("nodemon", function(cb) {
  let started = false;
  return nodemon({
    script: "./app.js"
  }).on("start", function() {
    if (!started) {
      cb();
      started = true;
    }
  });
});

gulp.task("default", ["scss", "scripts", "watch", "browser-sync"]);
