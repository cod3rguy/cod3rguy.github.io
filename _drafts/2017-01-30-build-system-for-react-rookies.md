---
title: Build System for React Rookies
---

I had been meaning to use build systems for my Javascript projects for a while but never really got around to it until I dived into React. Writing JSX in ES2015 made me realize that developing in React without a build system would be crazy. However, setting up a build system was tougher that I imagined. I had to learn so many different tools and commands that they almost overwhelmed me. Eventually, I set up my build system using [Gulp] which I will be sharing in this post.<read-more>

To start off, let me quickly explain what a build system is and why we need one. Modern web development comprises of several layers of abstraction for markup, styling and scripting. These layers of abstraction need to be boiled down to regular HTML, CSS and Javascript that browsers can understand. Also, while developing modular code is great, serving a multitude of assets files to the browser is ill-advised. Due to the nature of HTTP request-response cycle, it is always recommended to bundle up assets into single files. All this and more requires using numerous tools and commands in an order, which can quickly become tedious during project development. To make the process easier, we have several build tools available which can automate this process. One of them is [Gulp].

To get started, here is my build system using Gulp for projects using React, ES2015 and Less :-

```javascript
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import less from 'gulp-less';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import uglify from 'gulp-uglify';
import exorcist from 'exorcist';
import ifElse from 'gulp-if-else';
import browserSync from 'browser-sync';

process.env.NODE_ENV = "development"; //options: [development, production]

let bs = browserSync.create();

let errorHandler = function(msgSource) {
    return function({message, plugin = msgSource}){
        console.error( `\n${plugin}: ${message}\n`);
        this.emit('end');
    };
};

gulp.task('makeStyle',() => {
    return gulp.src('./styles/src/style.less')
    .pipe(plumber(errorHandler('makeStyle')))
    .pipe(less({
        compress: true
    }))
    .pipe(gulp.dest('./styles/'))
    .pipe(bs.stream());
});

gulp.task('makeScript',() => {
    return browserify('./scripts/src/app.jsx',{ debug: true })
    .transform('babelify')
    .bundle()
    .on('error', errorHandler('browserify'))
    .pipe(exorcist('./scripts/app.js.map'))
    .pipe(source('app.js'))
    .pipe(plumber(errorHandler('makeScript')))
    .pipe(buffer())
    .pipe(ifElse(process.env.NODE_ENV === 'production', uglify))
    .pipe(gulp.dest('./scripts/'));
});

gulp.task('jsx-watch',['makeScript'], function(done) {
    bs.reload();
    done();
});

gulp.task('watch', ['makeStyle','makeScript'], () => {

    bs.init({
        server: "./",
        port: 1337,
        browser: 'google chrome'
    });

    gulp.watch(['./*.html'], () => { bs.reload(); });
    gulp.watch(['./styles/src/*','./styles/src/includes/*'], ['makeStyle']);
    gulp.watch(['./scripts/src/*','./scripts/src/includes/*','./scripts/src/includes/*/*'], ['jsx-watch']);
});

gulp.task('default', ['watch']);
```


[Gulp]: http://gulpjs.com/