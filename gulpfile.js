let gulp = require('gulp');
let cssnano = require('gulp-cssnano');
let imagemin = require('gulp-imagemin');
let concat = require('gulp-concat');
let gulpIf = require('gulp-if');
let runSequence = require('run-sequence');
let del = require('del');

gulp.task('bundle', function () {
    return gulp.src('public/javascripts/**/*.js')
        .pipe(concat('bundle.js'))  
        .pipe(gulp.dest('public/javascripts'));
});

gulp.task('img', function () {
    return gulp.src('public/stylesheets/images/**/*.+(png|jpg|jpeg|gif|svg)')
        .pipe(imagemin())
        .pipe(gulp.dest('public/images/min'));
});

gulp.task('clean:bundle', function () {
    return del.sync('public/javascripts/bundle.js')
});

gulp.task('build', function (done) {
    runSequence('clean:bundle', 'bundle', 'img', done);
});