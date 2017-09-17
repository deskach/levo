var gulp = require('gulp');
var sass = require('gulp-sass');
var flatten = require('gulp-flatten');
var autoprefixer = require('gulp-autoprefixer');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var webserver = require('gulp-webserver');
var jsValidate = require('gulp-jsvalidate');
var concat = require('gulp-concat');


gulp.task('sass', function () {
    return gulp.src('./app/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(flatten())
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('copy-assets', function () {
    return gulp.src('./app/global/assets/**/*')
        .pipe(gulp.dest('dist/assets'));
});

gulp.task('watch', function () {
    gulp.watch('./app/global/assets/**/*.*', ['copy-assets']);
    gulp.watch('./app/**/*.scss', ['sass']);
    gulp.watch('./app/**/*.handlebars', ['hbs']);
    gulp.watch(JS_SOURCES, ['js']);
});


gulp.task('default', ['lint', 'sass', 'hbs'], function () {
    // Add tests here
});

gulp.task('lint', function () {
    return gulp.src(['./app/**/*.js', 'gulpfile.js'])
        .pipe(jshint({}))
        .pipe(jshint.reporter(stylish));
});

gulp.task('hbs', function () {
    var templateData = {},
        options = {
            batch: ['./app/topnav/hbs/']
        };

    return gulp.src('./app/global/hbs/index.handlebars')
        .pipe(handlebars(templateData, options))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('dist'));
});

gulp.task('webserver', function () {
    gulp.src('dist')
        .pipe(webserver({
            livereload: true,
            // directoryListing: {
            //     enable: true,
            //     path: "dist"
            // },
            open: true,
            port: 4000
        }));
});

var JS_SOURCES = [
    "./node_modules/verge/verge.js",
    "./node_modules/underscore/underscore.js",
    "./libs/**/*.js",
    "./app/**/*.js"
];

gulp.task('js', function () {
    return gulp.src(JS_SOURCES)
        .pipe(jsValidate())
        // .pipe(uglify())
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist'));
});
