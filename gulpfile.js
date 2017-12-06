const gulp = require('gulp');
const clean = require('gulp-clean');
const less = require('gulp-less');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const rename = require("gulp-rename");

const outputPath = 'lib';

gulp.task('clean', () => {
  return gulp.src(outputPath, { read: true })
             .pipe(clean({ force: true }))
});

gulp.task('build-less', () => {
  return gulp.src('src/less/rsuite.less')
             .pipe(sourcemaps.init())
             .pipe(less())
             .pipe(postcss([
               require('autoprefixer')
             ]))
             .pipe(sourcemaps.write('./'))
             .pipe(gulp.dest(`${outputPath}/css`));
});

gulp.task('postcss', ['build-less'], () => {
  return gulp.src(`${outputPath}/css/rsuite.css`)
             .pipe(sourcemaps.init())
             .pipe(postcss())
             .pipe(rename(path => {
               path.basename += '.min'
             }))
             .pipe(sourcemaps.write('./'))
             .pipe(gulp.dest(`${outputPath}/css`))
});

gulp.task('copy-fonts', () => {
  return gulp.src('src/less/fonts/**/*')
             .pipe(gulp.dest(`${outputPath}/css/fonts`))
             .pipe(gulp.dest(`${outputPath}/fonts`))
});

gulp.task('copy-source', () => {
  return gulp.src('src/less/**/*').pipe(gulp.dest(`${outputPath}/less`))
});

gulp.task('default', ['clean'], () => {
  gulp.start(['postcss', 'copy-fonts', 'copy-source']);
});
