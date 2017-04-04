var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var jshint = require('gulp-jshint');
var Server = require('karma').Server;
var gulpProtractorAngular = require('gulp-angular-protractor');

gulp.task('clean', function() {
  return del(['dist']);
});

gulp.task('build', ['clean'], function() {
    return gulp.start([
        'externalCSS',
        'appCSS',
        'externalJS',
        'appJS',
        'images',
        'fonts',
        'html',
        'connect'
    ]);
});


gulp.task('default', ['build'], function() {
    gulp.start([
        'test',
        'watch'
    ]);
});


gulp.task('externalCSS', function() {
    return gulp.src(['src/bower_components/bootstrap/dist/css/bootstrap.min.css', 'src/bower_components/font-awesome/css/font-awesome.min.css'])
    .pipe(concat('libs.css'))
    .pipe(gulp.dest('dist/styles'));
});

gulp.task('appCSS', function() {
    return gulp.src('src/styles/layout.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/styles'))
    .pipe(connect.reload());
});

gulp.task('externalJS', function() {
    return gulp.src(['src/bower_components/jquery/dist/jquery.min.js',
    'src/bower_components/angular/angular.min.js',
    'src/bower_components/angular-route/angular-route.min.js',
    'src/bower_components/bootstrap/dist/js/bootstrap.min.js'])
    //.pipe(jshint())
    //.pipe(jshint.reporter('default'))
    .pipe(concat('libs.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('appJS', function() {
    return gulp.src('src/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(connect.reload());
});

gulp.task('html', function() {
    return gulp.src('src/**/*.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('images', function() {
    return gulp.src(['src/**/*.jpg','src/**/*.png'])
    .pipe(gulp.dest('dist'));
});

gulp.task('fonts', function() {
    return gulp.src('src/bower_components/font-awesome/fonts/*.*')
    .pipe(gulp.dest('dist/fonts/'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch('src/js/**/*.js', ['appJS']);
  gulp.watch('src/styles/*.scss', ['appCSS']);
  gulp.watch('src/img/*.*', ['images']);
  gulp.watch('src/**/*.html', ['html']);
});

gulp.task('connect', function() {
  connect.server({
    root: './',
    livereload: true
  });
});

gulp.task('test', function (done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});

gulp.task('protractor', function(callback) {
    gulp
        .src(['tests/e2e_tests/specs/*.js'])
        .pipe(gulpProtractorAngular({
            'configFile': 'tests/e2e_tests/conf.js',
            'debug': false,
            'autoStartStopServer': true
        }))
        .on('error', function(e) {
            console.log(e);
        })
        .on('end', callback);
});