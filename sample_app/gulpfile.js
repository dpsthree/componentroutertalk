var gulp = require('gulp'),
    connect = require('gulp-connect');

gulp.task('default', ['connect']);

gulp.task('connect', function(){
    connect.server({
        root: 'www'
    })
});
