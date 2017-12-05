var gulp = require('gulp');
var uglify = require('gulp-uglify');
var useref = require('gulp-useref');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var htmlmin = require('gulp-htmlmin');
var runSequence = require('run-sequence');
var del = require('del');
var cache = require('gulp-cache');
var workbox = require('workbox-build');

gulp.task('clean:dist', function() {
    return del.sync('dist');
});

/* Run this to clear cache. Currently not included in 'default' task since I won't be
* running this every time !!! */
gulp.task('cache:clear', function (callback) {
    return cache.clearAll(callback);
});

gulp.task('useref', function() {
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        // Minifies only if it's a CSS file
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('dist'));
});

gulp.task('copyManifest', function () {
  gulp.src('./app/manifest.json')
    .pipe(gulp.dest('./dist/'));
});

gulp.task('minifyHtml', function() {
    return gulp.src('dist/*.html')
        .pipe(gulpIf('*.html', htmlmin({collapseWhitespace: true})))
        .pipe(gulp.dest('dist'))
});

gulp.task('images', function(){
    return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
        .pipe(cache(imagemin({
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
});

var dist = './dist';
gulp.task('generate-service-worker', () => {
    return workbox.generateSW({
    globDirectory: dist,
    globPatterns: [
      '**\/*.{html,js,jpg,css}'
    ],
    swDest: `${dist}/sw.js`,
    clientsClaim: true,
    skipWaiting: true
  }).then(() => {
    console.info('Service worker generation completed.');
  }).catch((error) => {
    console.warn('Service worker generation failed: ' + error);
  });
});

gulp.task('default', function (callback) {
    runSequence('clean:dist', ['images', 'useref'], 'minifyHtml', 'copyManifest', 'generate-service-worker',
        callback
    );
});