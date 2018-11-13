"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var normalize = require("node-normalize-scss");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
const mqpacker = require("css-mqpacker");
var server = require("browser-sync").create();
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var uglify = require("gulp-uglify");
var htmlmin = require("gulp-htmlmin");
var del = require("del");

gulp.task("style", function(done) {
  gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass({
      includePaths: normalize.includePaths
    }))
    .pipe(postcss([
      autoprefixer(),
      mqpacker()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());

done();
});

gulp.task("serve", function() {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("style"));
  gulp.watch("source/js/*.js", gulp.series("js")).on("change", server.reload);
  gulp.watch("source/*.html", gulp.series("html")).on("change", server.reload);
});

gulp.task("js", function (done) {
  gulp.src("source/js/**/*.js")
  .pipe(plumber())
  .pipe(gulp.dest("build/js"))
  .pipe(uglify())
  .pipe(rename({suffix: ".min", prefix: ""}))
  .pipe(gulp.dest("build/js"))
  done();
});

gulp.task("webp", function() {
  return gulp.src("source/img/content/**/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("source/img/content"));
});

gulp.task("images", function() {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("source/img"));
});

gulp.task("sprite", function () {
  return gulp.src("source/img/icon-*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("source/img"));
});

gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/css/**",
    "source/img/**",
    "source/data/**"
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"));
});


gulp.task("build", gulp.series("clean", "copy", gulp.parallel("html", "style", "js")));

// GitHub Pages

gulp.task("gp_clean", function () {
  return del("docs");
});

gulp.task("gp_copy", function(){
  return gulp.src([
    "build/**/*"
  ], {
    base: "build"
  })
  .pipe(gulp.dest("docs"));
});

gulp.task("gp_build", gulp.series("build", "gp_clean", "gp_copy"));
