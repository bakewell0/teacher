var gulp = require('gulp'),  
    runSequence = require('run-sequence'),  
    rev = require('gulp-rev'),  
    revCollector = require('gulp-rev-collector');  
    clean = require('gulp-clean');
  
//定义css、js源文件路径  
var cssSrc = 'css/*.css',  
    jsSrc = 'js/*.js';  

//CSS生成文件hash编码并生成 rev-manifest.json文件名对照映射  
gulp.task('revCss', function(){  
    return gulp.src(cssSrc)  
        .pipe(rev())  
        .pipe(gulp.dest('./dist/css'))  
        .pipe(rev.manifest())  
        .pipe(gulp.dest('./dist/css'));  
});  
  
  
//js生成文件hash编码并生成 rev-manifest.json文件名对照映射  
gulp.task('revJs', function(){  
    return gulp.src(jsSrc)  
        .pipe(rev())                                //给文件添加hash编码  
        .pipe(gulp.dest('./dist/js'))  
        .pipe(rev.manifest())                       //生成rev-mainfest.json文件作为记录  
        .pipe(gulp.dest('./dist/js'));  
});  
  
  
//Html替换css、js文件版本  
gulp.task('revHtmlCss', function () {  
    return gulp.src(['./dist/css/*.json', '*.html'])  
        .pipe(revCollector())                         //替换html中对应的记录  
        .pipe(gulp.dest('./dist'));                     //输出到该文件夹中  
});  

gulp.task('revHtmlJs', function () {  
    return gulp.src(['./dist/js/*.json', './dist/*.html'])  
        .pipe(revCollector())  
        .pipe(gulp.dest('./dist'));  
});  

//开发构建  
gulp.task('dev', function (done) {  
    condition = false;  
    //依次顺序执行  
    runSequence(  
        ['revCss'],  
        ['revHtmlCss'],  
        ['revJs'],  
        ['revHtmlJs'],  
        done);  
});