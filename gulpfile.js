/* Plugin */

var gulp = require('gulp')
var postcss = require('gulp-postcss')
var cssNano = require('gulp-cssnano');
var sourceMaps = require('gulp-sourcemaps');
var cssBeautify = require('gulp-cssbeautify');
var rename = require('gulp-rename');
var htmlmin = require('gulp-htmlmin');
var htmlReplace = require('gulp-html-replace');
var runSequence = require("run-sequence")
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;


/* Path */

var baseDir = "./src/"

/* CSS Task */

/* Minify operation on Css, makes an ugly file! */


gulp.task('minify-css', function() {
    return gulp.src(baseDir + 'css/styles.css')
        .pipe(sourceMaps.init())
        .pipe(postcss([
            require("precss")(),
            require("postcss-import")(),
            require("postcss-cssnext")(),
        ]))
        .pipe(cssNano())
        .pipe(rename({
            basename: "styles",
            suffix: '.min'
        }))
        .pipe(sourceMaps.write('.'))
        .pipe(gulp.dest('dist/css/'));
});

/* Main operation on Css, makes an awesome file! */

gulp.task('css', function() {
    return gulp.src(baseDir + 'css/styles.css')
        .pipe(sourceMaps.init())
        .pipe(postcss([
            require("precss")(),
            require("postcss-import")(),
            require("postcss-cssnext")(),
        ]))
        .pipe(cssBeautify())
        .pipe(rename({
            basename: "styles",
        }))
        .pipe(sourceMaps.write('.'))
        .pipe(gulp.dest('dist/css/'));
});

/* Common operation on Css file */

function cssImport() {
    return gulp.src(baseDir + 'css/styles.css')
        .pipe(importCss())
}

/* Gulp Html task */

gulp.task('minify-html', function() {
    var htmlPattern = {
        'css': './css/styles.min.css',
        'js': './js/index.min.js'
    };
    return gulp.src(baseDir + 'html/*.html')
        .pipe(htmlReplace(htmlPattern))
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('dist/'));
});


/* Gulp watcher */

gulp.task('poster', function() {
    gulp.watch(baseDir+'css/**', ['css', 'minify-css']);
    gulp.watch(baseDir + "html/**", ["minify-html"])
    browserSync.reload();
});

/* Gulp js Task */

gulp.task("js", function() {
  return gulp
    .src(baseDir + "js/index.js")
    .pipe(sourceMaps.init())
    .pipe(
      rename({
        basename: "script"
      })
    )
    .pipe(sourceMaps.write("."))
    .pipe(gulp.dest("dist/js/"))
})

/* Gulp Default Task */

gulp.task('default', ['minify-css','css', 'minify-html','js']);

gulp.task('serve', function() {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "dist/",
            index: "index.html"
        }
    });

    gulp.watch(baseDir + "**").on("change", () => {
      runSequence("default", reload)
    })
});

