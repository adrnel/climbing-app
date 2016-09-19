var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');

gulp.task('clean', function() {
  return del(['dist']);
});

gulp.task('build', ['clean'], function() {
    gulp.start([
        'externalCSS',
        'appCSS',
        'externalJS',
        'appJS',
        'html'
    ]);
});


gulp.task('default', ['build'], function() {

});


gulp.task('externalCSS', function() {
    return gulp.src(['src/bower_components/bootstrap/dist/css/bootstrap.min.css'])
    .pipe(concat('libs.css'))
    .pipe(gulp.dest('dist/styles'));
});

gulp.task('appCSS', function() {
    return gulp.src('src/styles/*.scss')
    .pipe(concat('layout.css'))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/styles'));
});

gulp.task('externalJS', function() {
    return gulp.src(['src/bower_components/jquery/dist/jquery.min.js',
    'src/bower_components/angular/angular.min.js',
    'src/bower_components/bootstrap/dist/js/bootstrap.min.js'])
    .pipe(concat('libs.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('appJS', function() {
    return gulp.src('src/js/*.js')
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('html', function() {
    return gulp.src('src/**/*.html')
    .pipe(gulp.dest('dist'));
});