const gulp = require('gulp')
const sass = require('gulp-sass')
const gulpif = require('gulp-if')
const sourcemaps = require('gulp-sourcemaps')
const autoprefixer = require('gulp-autoprefixer')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const del = require('del')

const env = process.env.NODE_ENV
const src_dir = 'src/'

// HTML
gulp.task('html', () => {
  return gulp
    .src([
      src_dir + '*.html',
      src_dir + '**/*.html'
    ])
    .pipe(gulp.dest('public'))
})

// Javascript
gulp.task('scripts', () => {
  return gulp
    .src([
      'node_modules/babel-polyfill/dist/polyfill.js',
      src_dir + 'js/*.js',
      src_dir + 'js/**/*.js'
    ])
    .pipe(babel({ presets: ['babel-preset-env'] }))
    .pipe(gulpif(env === 'production', uglify(), false))
    .pipe(gulp.dest('public/static/js'))
})

// Stylesheet
gulp.task('styles', () => {
  return gulp
    .src([src_dir + 'scss/*.scss', src_dir + 'scss/**/*.scss'])
    .pipe(sourcemaps.init())
    .pipe(gulpif(env === 'production', sass({
        outputStyle: 'compressed'
      }), sass({ outputStyle: 'expanded' })))
    .pipe(autoprefixer({ browsers: ['last 3 versions'], cascade: false }))
    .pipe(gulpif(env === 'development', sourcemaps.write('../maps')))
    .pipe(gulp.dest('public/static/css'))
})

// static
gulp.task('image', () => {
  return gulp
    .src(src_dir + 'img/*')
    .pipe(gulp.dest('public/static/img'))
})

// Clean
gulp.task('clean:maps', (env === 'production', deleteMapsFolder))

function deleteMapsFolder() {
  return del([
    'public//maps/**',
  ])
}

// Watch
gulp.task('watch', () => {
  gulp.watch(src_dir + 'img/*', ['image'])
  gulp.watch([src_dir + '*.html', src_dir + '**/*.html'], ['html'])
  gulp.watch([src_dir + 'scss/*.scss', src_dir + 'scss/**/*.scss'], ['styles'])
  gulp.watch([src_dir + 'js/*.js', src_dir + 'js/**/*.js'], ['scripts'])
})

// Default tasks
gulp.task('default', [
    'html',
    'styles',
    'scripts',
    'image',
    'clean:maps',
    'watch'
])
