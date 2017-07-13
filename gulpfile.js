var gulp = require('gulp'), 
    less = require('gulp-less'), //less
    rename = require('gulp-rename'),//重命名
    uglify = require('gulp-uglify'),
    livereload = require('gulp-livereload'),//监听文件变化
    del = require('del'),//删除文件
    cleanCss = require('gulp-clean-css');//压缩css文件

var destCSS = 'web/modules/css', destJS = 'web/modules/js';

//编译less文件
gulp.task('less',function(){
    return gulp.src('web/modules/less/*.less')
           .pipe(less())
           .pipe(gulp.dest(destCSS))
           .pipe(livereload());           
});

//压缩css文件
gulp.task('minCss',function(){
    return gulp.src('web/modules/css/*.css')
           .pipe(cleanCss({compatibility: 'ie8'}))
           .pipe(rename({ extname: '.min.css' }))
           .pipe(gulp.dest('web/dist/css'));
})

//删除js压缩文件
gulp.task('delete',function(){
    return del(['web/dist/js/*.min.js'])
})

//压缩js文件
gulp.task('uglify',['delete'],function(){
    return gulp.src('web/modules/js/*.js')
    .pipe(uglify())
    .pipe(rename({extname:'.min.js'}))
    .pipe(gulp.dest('web/dist/js'));
})

//监听less文件变化
gulp.task('style',function(){
    gulp.watch('web/modules/less/*.less',['less']);
})

//监听web目录下所有文件变化
gulp.task('watcher', function() {
    livereload.listen();
    gulp.watch('web/**/*.*', function(event) {  
        livereload.changed(event.path);  
    });
});

//用于开发，实施监听文件
gulp.task('test',['style','watcher'])

//用于生产环境，压缩文件
gulp.task('production',['minCss','uglify']);

