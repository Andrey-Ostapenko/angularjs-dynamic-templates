var config = require('./gulp.config')();
/**
 * Plugins
 */
var gulp = require('gulp');
var server = require('gulp-server-livereload');

var $ = require('gulp-load-plugins')({ lazy: true });

/**
 * Starts the server with livereload (will change to nodemon and browser-sync)
 */
gulp.task('serve', [
    'js-integrity',
    'bower-inject',
    'lib-inject',
    'lib-css-inject',
    'templateCache-inject'], function() {
        gulp.src('./')
            .pipe(server({
                livereload: true,
                directoryListing: false,
                open: true
            }));
    });

/**
 * Checks Javascript integrity
 */
gulp.task('js-integrity', function() {

    return gulp
        .src(config.allJs)
        .pipe($.print())
        .pipe($.jscs())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', { verbose: true }))
        .pipe($.jshint.reporter('fail'));
});

/**
 * Injects bower dependencies
 */
gulp.task('bower-inject', function() {
    var wiredep = require('wiredep').stream;

    return gulp
        .src(config.index)
        .pipe(wiredep(config.wiredepOptions))
        .pipe(gulp.dest(config.root));
});

/**
 * Injects app's dependencies
 */
gulp.task('app-inject', function() {
    return gulp
        .src(config.index)
        .pipe($.inject(gulp.src(config.appJs)))
        .pipe(gulp.dest(config.root));
});

/**
 * Injects lib's js dependencies
 */
gulp.task('lib-inject', ['build-lib'], function() {
    return gulp
        .src(config.index)
        .pipe($.inject(gulp.src(config.build + config.optimized.lib), { name: 'azurelib' }))
        .pipe(gulp.dest(config.root));
});

/**
 * Injects lib's css
 */
gulp.task('lib-css-inject', ['build-lib-css'], function() {
    return gulp
        .src(config.index)
        .pipe($.inject(gulp.src(config.build + config.optimized.libcss), { name: 'azurelibcss' }))
        .pipe(gulp.dest(config.root));
});

/**
 * Injects template-cache
 */
gulp.task('templateCache-inject', ['templatecache'], function() {
    return gulp
        .src(config.index)
        .pipe($.inject(gulp.src(config.build + config.templateCache.file), { name: 'azuretemplatecache' }))
        .pipe(gulp.dest(config.root));
});

/**
 * Build azure lib
 */
gulp.task('build-lib', function() {
    return gulp
        .src([
            './external-lib/**/*.js'
        ])
        .pipe($.angularFilesort())
        .pipe($.stripLine(['use strict']))
        .pipe($.concat('lib.js'))
        .pipe($.uglify())
        .pipe(gulp.dest(config.build));

});

gulp.task('build-lib-css', function() {
    return gulp
        .src([
            './external-lib/**/*.css'
        ])
        .pipe($.concat('lib.css'))
        .pipe(gulp.dest(config.build));
});

/**
 * Creates the template cache
 */
gulp.task('templatecache', function() {

    return gulp
        .src(config.htmlLibTemplates)
        .pipe($.minifyHtml({ empty: true }))
        .pipe($.angularTemplatecache(
            config.templateCache.file,
            config.templateCache.options
        ))
        .pipe(gulp.dest(config.build));
});

gulp.task('watch', function() {
    gulp.watch([config.allJs, config.htmlLibTemplates, config.libcss],
        ['js-integrity', 'build-lib', 'lib-css-inject', 'templatecache']);
});
