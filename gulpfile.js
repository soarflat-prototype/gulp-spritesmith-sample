'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var spritesmith = require('gulp.spritesmith');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('sprite', function () {
  var spriteData =  gulp.src('./dev/sprite/sample/*.png')
    .pipe(spritesmith({
      imgName: 'sample.png',                      // 生成されるスプライト画像名
      cssName: '_sample.scss',                    // 生成されるscssファイル名
      imgPath: '/image/sprite/sample.png',        // 生成されるscssファイルに記載されているスプライト画像のパス
      cssFormat: 'scss',                          // 生成するファイルの拡張子
      cssVarMap: (sprite) => {
        sprite.name = "sprite-sample-" + sprite.name; // 生成されるscssファイルの変数
      }
    }));

  spriteData.img.pipe(gulp.dest('./pub/image/sprite/'));  // 生成したスプライト画像の保存先
  spriteData.css.pipe(gulp.dest('./dev/scss/sprite/'));   // 生成したscssファイルの保存先
});

gulp.task('sass', function () {
  return gulp.src('./dev/scss/**/*.scss')
    .pipe(sass({
      outputStyle: 'expanded',
    }))
    .pipe(gulp.dest('./pub/css'));
});

gulp.task('watch', function () {
  browserSync({
    notify: false,
    server: {
      baseDir: "./pub"
    },
    port: 8080
  });
  gulp.watch(['./dev/scss/**/*.scss'], ['sass', reload]);
});

gulp.task('default',['watch']);