const gulp = require('gulp');
const watch = require('gulp-watch');

const pug = require('gulp-pug');
const htmlreplace = require('gulp-html-replace');

const stylus = require('gulp-stylus');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');

const uglify = require('gulp-uglify');
const react = require('gulp-react');
const concat = require('gulp-concat');

const fs = require('fs');
const request = require('request');
/***************************
  For a staging environment
 ***************************/
gulp.task('distMarkup', () => {
    convertDistMarkup();

    return watch('src/*.pug', () => {
        convertDistMarkup();
    });

    function convertDistMarkup() {
        console.log("compiled pugs");

        return gulp.src('src/*.pug')
            .pipe(pug({
                doctype: "html",
                pretty: true
            }))
            .pipe(gulp.dest('dist'));
    }
});

gulp.task('distStyles', () => {
    convertDistStyles();

    return watch('src/styles/style.styl', () => {
        convertDistStyles();
    });

    function convertDistStyles() {
        console.log("Stylus styles are go");

        return gulp.src('src/styles/style.styl')
            .pipe(sourcemaps.init())
            .pipe(stylus({
                'include css': true
            }))
            .pipe(autoprefixer())
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('dist/styles'));
    }
});

gulp.task('distFonts', () => {
  moveDistFonts();

  return watch('fonts/*.*', () => {
    moveDistFonts();
  });

  function moveDistFonts() {
    console.log("Moving fonts");

    return gulp.src(['src/fonts/*.woff', 'src/fonts/*.woff2'])
      .pipe(gulp.dest('dist/fonts'));
  }
});

gulp.task('distVendorScripts', () => {
    moveDistVendorScripts();

    return watch('src/scripts/vendor/*.js', () => {
        moveDistVendorScripts();
    });

    function moveDistVendorScripts() {
        console.log("Vendor scripts moved");

        return gulp.src('src/scripts/vendor/*.js')
            .pipe(gulp.dest('dist/scripts/vendor'));
    }
});

gulp.task('distReactScripts', () => {
    moveDistReactScripts();

    return watch('src/scripts/*.js', () => {
        moveDistReactScripts();
    });

    function moveDistReactScripts() {
        console.log("React Scripts Moved");

        return gulp.src('src/scripts/*.js')
            .pipe(react())
            .pipe(gulp.dest('dist/scripts'));        
    }
});

gulp.task('distCopyData', () => {
    gulp.src(['src/data/sprites/*.png'])
        .pipe(gulp.dest('dist/data/sprites'));

    return gulp.src(['src/data/*'])
        .pipe(gulp.dest('dist/data'));
});

gulp.task('getImages', () => {
    let numPokemon = 151;

    for(var i = 1; i <= numPokemon; i++) {
        let path = 'src/data/sprites/' + i + '.png';
        let remoteImage = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + i + '.png';

        fs.stat(path, function(err, stat) {
            if (err === null) {
                // we're good
            }
            else {
                console.log("getting " + remoteImage);
                request
                    .get(remoteImage)
                    .on('response', (response) => {
                        response.pipe(fs.createWriteStream(path));
                    });
            }
        });
    }
});

/******************************
 For a production environment
 ******************************/
// TODO: Add production script

/**************
 Initializing
 **************/
gulp.task('default', ['getImages', 'distMarkup', 'distStyles', 'distFonts', 'distVendorScripts', 'distReactScripts', 'distCopyData']);

gulp.task('production');