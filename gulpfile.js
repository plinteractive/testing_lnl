var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	connect = require('gulp-connect'),
	Server = require('karma').Server;

gulp.task('connect', function(){
	connect.server({
		root:'src',
		livereload: true
	});
});

gulp.task('watch', function(){
	gulp.watch(paths.html, ['html']);
	gulp.watch(paths.css, ['sass']);
});

gulp.task('tdd', function(done){
	new Server({
		configFile: __dirname + '/karma.conf.js'
	}, done).start();
});

gulp.task('sass', function(){
	return sass('src/stylesheets/scss', {sourcemap: true, compass: true, style: 'compressed'}).on('error', function(err){
	console.error('Error', err.message);
	}).pipe(sourcemaps.write('maps', {
		includeContent: true,
		sourceRoot: '/css'
	})).pipe(gulp.dest('src/stylesheets/css'))
	.pipe(connect.reload());
});

gulp.task('html', function(){
	gulp.src('./src/*.html')
		.pipe(connect.reload());
});

gulp.task('default', ['sass', 'connect', 'watch']);

