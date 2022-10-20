import gulp from 'gulp';
import pug from 'gulp-pug';


const buildPug = async () => (
  gulp.src('./src/pug/pages/*.pug')
    .pipe(pug({}))
    .pipe(gulp.dest('./build'))
);


export const development = gulp.series([ buildPug, ]);
