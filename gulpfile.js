// 实现这个项目的构建任务

const { src, dest, parallel } = require('gulp')
const sass = require('gulp-sass')
const babel = require('gulp-babel')
const swig = require('gulp-swig')
const imagemin = require('gulp-imagemin')

//scss转css任务
const style = () => {
    return src('src/assets/styles/*.scss', { base: 'src' })
        .pipe(sass({ outputStyle: 'expanded' }))  //设置编译成功的css样式展开
        .pipe(dest('dist'))
}
//es6转es5任务
const script = () => {
    return src('src/assets/scripts/*.js', { base: 'src' })
        .pipe(babel({ presets: ['@babel/preset-env'] }))
        .pipe(dest('dist'))
}
//swig模板转换任务
const page = () => {
    return src('src/partials/*.html', { base: 'src' })
        .pipe(swig())
        .pipe(dest('dist'))
}
//图片压缩任务
const image = () => {
    return src('src/assets/images/**', { base: 'src' })
        .pipe(imagemin())
        .pipe(dest('dist'))
}
//字体压缩任务
const font = () => {
    return src('src/assets/fonts/**', { base: 'src' })
        .pipe(imagemin())
        .pipe(dest('dist'))
}

//异步任务执行
const compile = parallel(style, script, page, image, font)
module.exports = {
    compile
}
