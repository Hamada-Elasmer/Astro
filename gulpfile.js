const gulp = require("gulp");
const pug = require('gulp-pug');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const sourcemaps = require("gulp-sourcemaps");
const { src, series, parallel, dest, watch } = require("gulp");


// Path To Our Files
const pugPath = 'src/pug/*.pug';
const sassPath = 'src/scss/**/*.scss';
const jsPath = 'src/js/**/*.js';


// Pug Function
function pugTask () {
    return src(pugPath)
        .pipe(pug({pretty: true}))
        .pipe(dest('./build'));
}
// Sass Function
function sassTask () {
    return src(sassPath)
        .pipe(sourcemaps.init())
        .pipe(concat('astro-theme.css'))
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('./build/css'))
}
// JavaScript Function
function jsTask () {
    return src(jsPath)
        .pipe(sourcemaps.init())
        .pipe(concat('default.bundle.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('./build/js'));
}
// Bootsrtap Js Move To build File Function
function jsbootstarp () {
    return src([
        "./node_modules/bootstrap/dist/js/bootstrap.bundle.min.js",
        "./node_modules/bootstrap/dist/js/bootstrap.bundle.min.js.map"
      ])
        .pipe(dest('./build/js'))
}
// imageMin Function
function imageTask () {
    return src('src/images/**/*')
        .pipe(imagemin())
        .pipe(dest('./build/images'));
}
// Move Font-Awesome Function
function fontTask () {
    return src([
        './node_modules/@fortawesome/fontawesome-free/webfonts/*'
    ])
    .pipe(dest('./build/fonts'))
}

//  Watch Function
function watchTask () {
    watch([pugPath, sassPath, jsPath] , parallel(pugTask, sassTask, jsTask))
}

exports.pugTask = pugTask;
exports.sassTask = sassTask;
exports.imageTask = imageTask;
exports.jsTask = jsTask;
exports.jsbootstarp = jsbootstarp;
exports.fontTask = fontTask;
exports.default = series(parallel(pugTask, sassTask, jsTask), watchTask);
