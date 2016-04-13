var args = require('yargs').argv;
var browserSync = require('browser-sync');
var config = require('./gulp.config')();
/**
 * Plugins
 */
var gulp = require('gulp');

var $ = require('gulp-load-plugins')({ lazy: true });
var port = process.env.PORT || config.defaultPort;

var injectTasks = ['bower-inject', 'lib-inject', 'lib-css-inject', 'templateCache-inject'];

/**
 * Starts the server with nodemon and browser-sync
 */

gulp.task('serve', [].concat('js-integrity', injectTasks),
    function() {
        var nodeOptions = {
            script: config.nodeServer,
            delayTime: 1,
            env: {
                'PORT': port,
                'NODE_ENV': 'dev'
            },
            watch: [config.server]
        };

        return $.nodemon(nodeOptions)
            .on('restart', function(ev) {
                log('*** nodemon restarted');
                log('files changed on restart:/n' + ev);
                setTimeout(function() {
                    browserSync.notify('reloading now ...');
                    browserSync.reload({ stream: false });
                }, config.browserReloadDelay);
            })
            .on('start', function() {
                log('*** nodemon started');
                startBrowserSync();
                log('*** after');
            })
            .on('crash', function() {
                log('*** nodemon crashed: script crashed for some reason');
            })
            .on('exit', function() {
                log('*** nodemon exited cleanly');
            });
    });

function startBrowserSync() {
    log('returning..');
    if (args.nosync || browserSync.active) {
        return;
    }

    log('Starting browser-sync on port ' + port);

    var options = {
        proxy: 'localhost:' + port,
        port: 3000,
        files: [
            config.app + '**/*.*',
            config.build + '**/*.*',
            config.index,
            config.css
        ],
        ghostMode: {
            clicks: true,
            location: false,
            forms: true,
            scroll: true
        },
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'debug',
        logPrefix: 'dynamic-templates',
        notify: true,
        reloadDelay: 1000
    };

    browserSync(options);
}

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
 * Injects app's js dependencies
 */
gulp.task('app-inject', function() {
    return gulp
        .src(config.index)
        .pipe($.inject(gulp.src(config.appJs)))
        .pipe(gulp.dest(config.root));
});

/**
 * Injects app's css dependencies
 */
gulp.task('app-css-inject', function() {
    return gulp
        .src(config.index)
        .pipe($.inject(gulp.src(config.css)))
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

function log(msg) {
    if (typeof (msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    }
    else {
        $.util.log($.util.colors.blue(msg));
    }
}
