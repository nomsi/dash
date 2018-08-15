const gulp = require('gulp');
const ts = require('gulp-typescript');
const tslint = require('tslint');
const lint = require('gulp-tslint');
const del = require('del');

const project = ts.createProject('tsconfig.json');
const linter = tslint.Linter.createProgram('tsconfig.json');

gulp.task('lint', async (complete) => {
    gulp.src('./src/**/*.ts').pipe(lint({
        configuration: 'tslint.json',
        formatter: 'prose',
        program: linter
    })).pipe(lint.report());
    await complete();
});

gulp.task('build', async (complete) => {
    del.sync(['dist/**/*.*']);
    const tsc = gulp.src('src/**/*.ts')
        .pipe(project());

    tsc.pipe(gulp.dest('dist/'));

    gulp.src('src/**/*.json').pipe(gulp.dest('dist/'));
    gulp.src('src/**/*.lang').pipe(gulp.dest('dist/'));

    await tsc.js.pipe(gulp.dest('dist/'));
    await complete();
});

gulp.task('default', gulp.series(['build', 'lint']));