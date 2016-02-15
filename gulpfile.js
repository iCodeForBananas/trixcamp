var gulp = require('gulp'),
    rename = require('gulp-rename'),
    watch = require('gulp-watch'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify')

gulp.task('styles', function() {
    return sass('src/browser/sass/app.scss', { style: 'expanded' })
        .pipe(autoprefixer('last 2 versions'))
        .pipe(gulp.dest('src/browser/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(cssnano())
        .pipe(gulp.dest('src/browser/css'))
        .pipe(notify({ message: 'Styles task complete' }))
})

gulp.task('watch', ['styles'], function (cb) {
    watch('src/browser/sass/**/*.scss', function () {
        gulp.run('styles')
    })
})

gulp.task('default', ['styles'])
