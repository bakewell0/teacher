 'use strict';
  var gulp = require('gulp');
 
 //压缩html
 var htmlmin = require('gulp-htmlmin');
 gulp.task('html', function(){
     gulp.src('./*.html')
         .pipe(htmlmin({
         	collapseWhitespace: true,
           	removeComments: true
         }))
         .pipe(gulp.dest('dist'));
 });
 
 //压缩css
 var cssnano = require('gulp-cssnano');
 gulp.task('style', function(){
     gulp.src(['./css/*.css'])
         .pipe(cssnano())
         .pipe(gulp.dest('dist/css'));
 });
 
 //压缩js
 var uglify = require('gulp-uglify');
 gulp.task('script', function(){
     gulp.src(['./js/*.js'])
         .pipe(uglify())
         .pipe(gulp.dest('dist/js'));
 });

gulp.task('default', ['html','style','script']);