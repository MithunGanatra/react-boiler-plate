"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect'); // This is to run web server
var browserify = require('browserify'); // This is to bundle Javascripts
var reactify = require('reactify'); // This is to transform React component to JS
var source = require('vinyl-source-stream'); // This is to Use conventional Text streams with Gulp
var concat = require('gulp-concat'); // concates files

var config = {
	port: 8000,
	devBaseUrl: 'http://localhost',
	paths: {
		css: [ './src/**/*.css',
			'./node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
			'./node_modules/bootstrap/dist/css/bootstrap.min.css'
		],
		dist: './dist',
		html: './src/**/*.html',
		components: ['./src/**/*.js', './src/**/*.jsx'],
		mainJS: './src/main.js'		
	}
};

// Gulp Task to run a web server with the custom configurations
gulp.task('connect', ['html', 'css', 'scripts'],function(){
	connect.server({
		root: ['dist'],
		port: config.port,
		base: config.devBaseUrl + '/views/index.html',
		livereload: true
	});
});

// Gulp task to copy html files from source to destination folder and reload if any changes
gulp.task('html',function(){
	gulp.src(config.paths.html)
	.pipe(gulp.dest(config.paths.dist))
	.pipe(connect.reload());
});

// Gulp task to copy stylesheets from source to destination folder and reload if any changes
gulp.task('css',function(){
	gulp.src(config.paths.css)
		.pipe(concat('styles.css'))
		.pipe(gulp.dest(config.paths.dist + '/css'))
		.pipe(connect.reload());
});

// Gulp task to Transform, Bundle & Create a Copy javascripts source in Destination
gulp.task('scripts',function(){
	browserify(config.paths.mainJS)
	.transform(reactify)
	.bundle()
	.on('error',console.error.bind(console))
	.pipe(source('bundle.js'))
	.pipe(gulp.dest(config.paths.dist + '/scripts'))
	.pipe(connect.reload());
});

gulp.task('lint', function(){
	return gulp.src(config.paths.components)
		.pipe(eslint({config: 'eslint.config.json'}))
		.pipe(eslint.format());
});

//Gulp task to watch changes in HTML files
gulp.task('watch', function(){
	gulp.watch(config.paths.html, ['html']);
	gulp.watch(config.paths.components, ['scripts']);
	gulp.watch(config.paths.css, ['css']);
});

// Gulp's default task
gulp.task('default', ['connect', 'watch']);
