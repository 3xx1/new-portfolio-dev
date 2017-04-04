// dependencies
var browserify = require('browserify');
var envify = require('envify');
var ngHtml2Js = require('browserify-ng-html2js');
var del = require('del');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var watchify = require('watchify');

// gulp dependencies
var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var connect = require('gulp-connect');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');
var cleancss = require('gulp-clean-css');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');

// location maps
var copyLocations = [
  {
    src: './src/assets/**/*.*',
    dest: './public' + (process.env.NODE_ENV == 'local' ? '_local' : '') + '/assets'
  },
  {
    src: './src/image/**/*.*',
    dest: './public' + (process.env.NODE_ENV == 'local' ? '_local' : '') + '/image'
  },
  {
    src: ['./src/index.html', './src/login.html'],
    dest: './public' + (process.env.NODE_ENV == 'local' ? '_local' : '')
  },
  {
    src: './node_modules/bootstrap/dist/css/bootstrap.css',
    dest: './public' + (process.env.NODE_ENV == 'local' ? '_local' : '') + '/css'
  }
];

var watchLocations = {
  sass: './src/sass/**/*.scss'
};

var destLocations = {
  sass: './public' + (process.env.NODE_ENV == 'local' ? '_local' : '') + '/css',
  js: './public' + (process.env.NODE_ENV == 'local' ? '_local' : '') + '/js'
};

/* ERROR HANDLER */
var onError = function(err) {
  gutil.log(gutil.colors.red('ERROR', err.plugin), err.message);
  gutil.beep();
  new gutil.PluginError(err.plugin, err, {showStack: true});
};

/* CLEAN */
gulp.task('clean', function(cb) {
  var glob = 'public' + (process.env.NODE_ENV == 'local' ? '_local' : '') + '/**/*';
  return del([glob], cb);
});

/* COPY */
gulp.task('copy', function(cb) {
  var task;
  for (var i = 0; i < copyLocations.length; i++) {
    task = gulp.src(copyLocations[i].src)
    .pipe(plumber())
    .pipe(watch(copyLocations[i].src))
    .pipe(gulp.dest(copyLocations[i].dest))
    .pipe(connect.reload());
  }
  cb();
});

/* BROWSERIFY+WATCHIFY */
var bundler = browserify({
  basedir: './src/js/',
  entries: ['main.js'],
  debug: true
}).transform('envify', {
  global: true,
  _: 'purge'
}, {
  global: true
}).transform(ngHtml2Js({
  module: 'templates',
  extension: 'html'
})).transform("babelify", {
  presets: ["es2015"]
});

gulp.task('prod-js', function() {
  return bundler.bundle()
  .pipe(source('bundle.js'))
  .pipe(buffer())
  .pipe(uglify({mangle: false}))
  .pipe(gulp.dest(destLocations.js));
});

gulp.task('prod-sass', function() {
  gulp.src('src/sass/**/*.scss')
      .pipe(plumber())
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(cleancss())
      .pipe(gulp.dest(destLocations.sass));
});

gulp.task('watchify', function() {
  var watcher = watchify(bundler);
  return watcher
  .on('error', gutil.log.bind(gutil, 'Browserify Error'))
  .on('update', function() {
    watcher.bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(destLocations.js))
    .pipe(connect.reload());

    gutil.log('Updated Javascript sources');
  })
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest(destLocations.js));
});

/* SASS */
gulp.task('sass', function() {
  gulp.src('src/sass/**/*.scss')
      .pipe(plumber())
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(gulp.dest(destLocations.sass))
      .pipe(connect.reload());
});

gulp.task('sass:watch', function() {
  watch(watchLocations.sass, function() {
    gulp.start('sass');
  });
});

/* SERVER */
gulp.task('server', function() {
  connect.server({
    root: 'public',
    port: 5000,
    livereload: true
  });
});


/* MAIN TASKS */
gulp.task('dev', ['clean'], function() {
  gulp.start('copy');
  gulp.start('sass');
  gulp.start('sass:watch');
  gulp.start('watchify');
  gulp.start('server');
});

