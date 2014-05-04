'use strict';

var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    argv = require('minimist')(process.argv.slice(2)),
    sync = require('browser-sync');

gulp.task('sass', function() {

    var getOpts = function(isProd) {

        var opts = {};

        if (isProd) {

            opts = {
                style: 'compressed',
                sourcemap: true
            };

        } else {

            opts = {
                lineNumbers: true,
                style: 'expanded'
            };

        }

        opts.loadPath = [
            './bower_components/foundation/scss'
        ];

        return opts;

    };

    gulp
        .src('./scss/main.scss')
        .pipe(sass(getOpts(argv.prod)))
        .pipe(gulp.dest('./css'))
        .pipe(sync.reload({stream: true}));

});

gulp.task('sync', function() {

    sync.init(null, {
        server: {
            baseDir: './'
        }
    });

});

// Reload all Browsers
gulp.task('reloadSync', function () {

    sync.reload();

});

gulp.task('default', ['sass', 'sync'], function() {

    gulp.watch('./scss/main.scss', ['sass']);
    gulp.watch('./index.html', ['reloadSync']);

});
