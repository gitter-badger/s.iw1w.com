var gulp = require('gulp');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var path = require('path');

var IMG_DIR_NAME = 'img';
var CSS_DIR_NAME = 'css';
var JS_DIR_NAME = 'js';

var proj_config = {
    img: 'asset/img/**/*',
    css: ['semantic/dist/semantic.css'],
    font: ['semantic/dist/themes/**/*'],
    js: ['semantic/dist/semantic.js', 'node_modules/jquery/dist/jquery.min.js'],
    page: 'page/**/*',
    dist: 'dist'
};

function image_task(conf) {
  return gulp
    .src(conf.img)
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest(path.join(conf.dist, IMG_DIR_NAME)));
}

function font_task(conf) {
  return gulp
    .src(conf.font, { base: 'semantic/dist' })
    .pipe(gulp.dest(path.join(conf.dist, CSS_DIR_NAME)));
}

function css_task(conf) {
  return gulp
    .src(conf.css)
    .pipe(less({
      paths: [ path.join(__dirname, 'semantic', 'dist') ]
    }))
    .pipe(minifyCSS())
    .pipe(gulp.dest(path.join(conf.dist, CSS_DIR_NAME)));
}

function js_task(conf) {
  return gulp
    .src(conf.js)
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.join(conf.dist, JS_DIR_NAME)));
}

function page_task(conf) {
  return gulp
    .src(conf.page)
    .pipe(gulp.dest(conf.dist))
}

gulp.task('image', function() {
  return image_task(proj_config);
});
gulp.task('css', function () {
  return css_task(proj_config);
});
gulp.task('font', function () {
  return font_task(proj_config);
});
gulp.task('js', function () {
  return js_task(proj_config);
});
gulp.task('page', function () {
  return page_task(proj_config);
});

gulp.task('default', ['image', 'css', 'js', 'page', 'font']);

gulp.task('watch', ['default'], function() {
  gulp.watch([proj_config.img], ['image']);
  gulp.watch([proj_config.css], ['css']);
  gulp.watch([proj_config.js], ['js']);
  gulp.watch([proj_config.page], ['page']);
});
