var gulp = require('gulp'),
    jade = require('gulp-jade'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    watch = require('gulp-watch');

gulp.task('html', function() {
    return gulp.src('Jade/*.jade')
        .pipe(plumber())
        .pipe(watch())
        .pipe(jade())
        .pipe(gulp.dest('www'))
});

gulp.task('css', function() {
    return gulp.src('css/**/*.scss')
        .pipe(plumber())
        .pipe(watch())
        .pipe(sass({errLogToConsole: true}))
        .pipe(gulp.dest('www/css'))
});

gulp.task('js', function() {
    return gulp.src('JS/**/*.js')
        .pipe(watch())
        .pipe(gulp.dest('www/JS'))
});

gulp.task('images', function() {
    return gulp.src('images/**/*.png')
        .pipe(watch())
        .pipe(gulp.dest('www/images'))
})


gulp.task('default', ['html', 'css', 'js', 'images'], function() {});
