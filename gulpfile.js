var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var useref = require('gulp-useref');
var cleanCss = require('gulp-clean-css');
var browserSync = require('browser-sync').create();

gulp.task('useref', function(){
    return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulp.dest('dist'))
});

gulp.task('sass', function()
{
    return gulp.src('./app/css/*.scss')
    .pipe(sass({outputStyle:'compressed'}))
    .pipe(gulp.dest('dist/assets/css/'))
});

gulp.task('start', function(){
    browserSync.init({
        server:{
            baseDir: './dist/'
        }
    });
    gulp.watch('./app/css/*.scss', gulp.series('sass'));
    gulp.watch('./app/*.html', gulp.series('useref')).on('change', browserSync.reload);
});

gulp.task('default', gulp.series('start'));