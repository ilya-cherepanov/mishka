import gulp from 'gulp';
import pug from 'gulp-pug';
import browserSync from 'browser-sync';
import { deleteAsync } from 'del';
import path from 'path';
import { fileURLToPath } from 'url';
import plumber from 'gulp-plumber';
import { readFileSync } from 'fs';


const DIR_NAME = path.dirname(fileURLToPath(import.meta.url));

const BUILD_DIR = path.resolve(DIR_NAME, 'build');
const SOURCE_DIR = path.resolve(DIR_NAME, 'src')


const buildPug = async () => (
  gulp.src(`${SOURCE_DIR}/pug/pages/*.pug`)
    .pipe(plumber())
    .pipe(pug({
      locals: JSON.parse(readFileSync(`${SOURCE_DIR}/pug/data.json`), { encoding: 'utf-8' }),
    }))
    .pipe(gulp.dest(BUILD_DIR))
);


const startServer = async () => {
  browserSync.init({
    server: {
      baseDir: BUILD_DIR,
    },
    ui: false,
  });
};


const watch = async () => {
  gulp.watch([`${SOURCE_DIR}/pug/**/*.pug`, `${SOURCE_DIR}/pug/data.json`]).on('change', gulp.series(buildPug, browserSync.reload));
};


const clear = async () => deleteAsync(BUILD_DIR);


export const development = gulp.series(
  clear,
  buildPug,
  startServer,
  watch
);
