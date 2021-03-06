const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const gulpif = require('gulp-if');
const gcmq = require('gulp-group-css-media-queries');
const less = require('gulp-less');
const smartgrid = require('smart-grid');
const imagemin = require('gulp-imagemin');

const isDev = (process.argv.indexOf('--dev') !== -1);
const isProd = !isDev;
const isSync = (process.argv.indexOf('--sync') !== -1);


function clear() {
  return del('build/*');
}

function styles() {
  return gulp.src('./src/less/main.less')
    .pipe(gulpif(isDev, sourcemaps.init()))
    .pipe(less())
    //.pipe(concat('./assets/css/owl.carousel/owl.carousel.min.css'))
    .pipe(gcmq())
    .pipe(autoprefixer({
      browsers: ['> 0.01%'],
      cascade: false
    }))
    .on('error', console.error.bind(console))
    .pipe(gulpif(isProd, cleanCSS({
      level: 2
    })))
    .pipe(gulpif(isDev, sourcemaps.write()))
    .pipe(gulp.dest('./build/css'))
    .pipe(gulpif(isSync, browserSync.stream()));
}
//.src(['./src/less/main.less','./assets/css/owl.carousel/owl.carousel.min.css'])
function img() {
  return gulp.src('./src/img/**/*')
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.mozjpeg({quality: 75, progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: false}
        ]
      })
    ]))
    .pipe(gulp.dest('./build/img'))
    .pipe(gulpif(isSync, browserSync.stream()))
}



function fonts() {
  return gulp.src('./src/fonts/**/*')
    .pipe(gulp.dest('./build/fonts'))
    .pipe(gulpif(isSync, browserSync.stream()))
}



// function scriptsDev() {
//   return gulp.src([
//     "./src/assets/js/jquery.min.js",
//     "./src/assets/js/jquery.maskedinput/jquery.maskedinput.min.js",
//     "./src/assets/js/owl.carousel/owl.carousel.min.js",
//     "./src/assets/js/jquery.fancybox/jquery.fancybox.min.js",
//     "./src/assets/js/bootstrap/bootstrap.min.js",
//     "./src/assets/js/slick/slick.min.js",
//     "./src/assets/js/main.js",
//   ])
//     .pipe(concat("main.js"))
//     .pipe(gulp.dest("./build/js"))
//     .pipe(gulpif(isSync, browserSync.stream()))
// }
function scriptsDev() {
  return gulp.src([
    "./src/assets/js/jquery.min.js",
    "./src/assets/js/jquery.maskedinput/jquery.maskedinput.min.js",
    "./src/assets/js/owl.carousel/owl.carousel.min.js",
    "./src/assets/js/jquery.fancybox/jquery.fancybox.min.js",
    "./src/assets/js/slick/slick.min.js",
    "./src/assets/js/main.js",
  ])
    .pipe(concat("main.js"))
    .pipe(gulp.dest("./build/js"))
    .pipe(gulpif(isSync, browserSync.stream()))
}

function html() {
  return gulp.src('./src/*.html')
    .pipe(gulp.dest('./build'))
    .pipe(gulpif(isSync, browserSync.stream()));
}

function watch() {
  if (isSync) {
    browserSync.init({
      server: {
        baseDir: "./build/"
      }
    });
  }
  gulp.watch('./src/less/**/*.less', styles);
  gulp.watch('./src/**/*.html', html);
  gulp.watch('./smartgrid.js', grid);
  gulp.watch('./src/assets/js/**/*.js', scriptsDev);
  gulp.watch('./src/img/**/*.js', img);
  gulp.watch('./src/fonts/**/*.js', fonts);
}

function grid(done) {
  delete require.cache[require.resolve('./smartgrid.js')];

  let settings = require('./smartgrid.js');
  smartgrid('./src/css', settings);

  settings.offset = '3.1%';
  settings.filename = 'smart-grid-per';
  smartgrid('./src/css', settings);
  done();
}

// let build = gulp.series(clear,
//     gulp.parallel(styles, img, html, scriptsDev)
// );
let build = gulp.series(clear,
  gulp.parallel(styles, img, fonts, html, scriptsDev)
);

gulp.task('build', build);
gulp.task('watch', gulp.series(build, watch));
gulp.task('grid', grid);