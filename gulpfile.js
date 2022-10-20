import gulp from 'gulp';
import pug from 'gulp-pug';
import browserSync from 'browser-sync';


const buildPug = async () => (
  gulp.src('./src/pug/pages/*.pug')
    .pipe(pug({}))
    .pipe(gulp.dest('./build'))
);


const startServer = async () => {
  browserSync.init({
    server: {
      baseDir: './build',
    },
    ui: false,
  });
};


const watch = async () => {
  gulp.watch('./src/pug/**/*.pug').on('change', gulp.series(buildPug, browserSync.reload));
};


export const development = gulp.series(buildPug, startServer, watch);
