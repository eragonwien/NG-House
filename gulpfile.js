let gulp = require('gulp');
let userref = require('gulp-useref');

gulp.task('js', function () {
    return gulp.src('public/views/index.html')
        .pipe(userref())
        .pipe(gulp.dest('dist'));
});

gulp.task('css', function () {
    
});

gulp.task('img', function () {
    
});