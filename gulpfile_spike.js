'use strict';

var ENV = process.env.NODE_ENV || 'local';

var gulp       = require('gulp');
var gutil      = require('gulp-util');
var bower      = require('bower');
var concat     = require('gulp-concat');
var gulpif     = require('gulp-if');
var less       = require('gulp-less');
var ngAnnotate = require('gulp-ng-annotate');
var ngConstant = require('gulp-ng-constant');
var nodemon    = require('gulp-nodemon');
var prefix     = require('gulp-autoprefixer');
var rename     = require('gulp-rename');
var watch      = require('gulp-watch');

// Watch paths
var paths = {
  less: ['www/less/**/*.less'],
  js:   ['www/js/**/*.js']
};

// Bundle manifest
var manifest = {

  styles: [
    './www/lib/ionic/css/ionic.css',
    './www/lib/fontawesome/css/font-awesome.css',
    './www/less/index.less'
  ],
  javascripts: [
    './www/lib/lodash/dist/lodash.js',
    './www/lib/moment/moment.js',
    './www/lib/firebase/firebase.js',
    './www/lib/ionic/js/ionic.bundle.js',
    './www/lib/raven-js/dist/raven.js',
    './www/lib/angular-resource/angular-resource.js',
    './www/lib/angular-marked/angular-marked.js',
    './www/lib/marked/lib/marked.js',
    './www/lib/angularfire/dist/angularfire.js',
    './www/lib/jquery-2.1.1.min.js',
    './www/build/js/config.js',
    './www/js/app.js',
    './www/js/controllers/**/*.js',
    './www/js/services/**/*.js'
  ]

};

gulp.task('default', ['install', 'js', 'less', 'assets', 'splash']);

gulp.task('js', [], function(done) {
  gulp.src(manifest.javascripts)
    .pipe(ngAnnotate())
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./www/build/js'))
    .on('end', done);
});

gulp.task('less', ['assets'], function(done) {
  gulp.src(manifest.styles)
    .pipe(gulpif(/\.less$/, less()))
    .pipe(less())
    .pipe(prefix('last 3 versions', 'ie 9'))
    .pipe(concat('app.css'))
    .pipe(gulp.dest('./www/build/css/'))
    .on('end', done);
});

gulp.task('assets', function() {
  gulp.src([
    './www/lib/fontawesome/fonts/**',
    './www/lib/ionic/fonts/**'
  ])
    .pipe(gulp.dest('./www/build/fonts'));
  gulp.src('./www/res/**/*')
    .pipe(gulp.dest('./www/build'));
});

gulp.task('watch', ['js', 'less'], function() {
  watch(paths.less, function(files, cb) {
    gulp.start('less', cb);
  });

  watch(paths.js, function(files, cb) {
    gulp.start('js', cb);
  });

  nodemon({
    script: 'server.js',
    watch: ['server.js'],
  }).on('restart', function() {
    gutil.log(gutil.colors.yellow('[express] server restarted'));
  });
});

gulp.task('install', function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});