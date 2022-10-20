import gulp from 'gulp';

const helloWorld = async() => {
  console.log('Hello, World');
}

export const development = gulp.series([ helloWorld, ]);
