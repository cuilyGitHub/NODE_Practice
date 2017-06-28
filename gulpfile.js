var gulp = require('gulp'), 
    less = require('gulp-less'), //less
    rename = require('gulp-rename'),//重命名
    uglify = require('gulp-uglify'),
    livereload = require('gulp-livereload'),//监听文件变化
    del = require('del'),//删除文件
    cleanCss = require('gulp-clean-css');//压缩css文件

var destCSS = '.web/modules/css',
    destJS = '.web/modules/js'


gulp.task('less',function(){
    return gulp.src('.web/modules/less/*.less')
           .pipe(less())
           .pipe(gulp.dest(destCSS))
           .pipe(cleanCss({compatibility: 'ie8'}))
           .pipe(rename({ extname: '.min.css' }))
           .pipe(livereload())
           .pipe(gulp.dest(destCSS));
});

gulp.task('delete',function(){
    return del(['.web/modules/js/*.min.js'])
})

gulp.task('uglify',['delete'],function(){
    return gulp.src('.web/modules/js/*.js')
    .pipe(uglify())
    .pipe(rename({extname:'.min.js'}))
    .pipe(gulp.dest(destJS))
    .pipe(livereload());
})

gulp.task('production',['less','uglify']);

