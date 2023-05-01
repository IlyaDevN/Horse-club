import imagemin from "gulp-imagemin";

export function prepareImages(err) {
	if(app.isBuild){
		compress();
	} else {
		copyToDist();
		browsersync();
	}
	err();
}

function compress() {
	return app.gulp.src(app.path.src.images)
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "imagesCompress",
				message: "Error: <%= error.message %>"
			})
		))
		.pipe(app.plugins.newer(app.path.build.images))
		.pipe(imagemin({
				progressive: true,
				svgoPlugins: [{removeViewBox: false}],
				interlaced: true,
				optimizationLevel: 3 // 0 to 7
			})
		)
		.pipe(app.gulp.dest(app.path.build.images));
}

function copyToDist() {
	return(app.gulp.src(app.path.src.images))
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "copyImg",
				message: "Error: <%= error.message %>"
			})
		))
		.pipe(app.gulp.dest(app.path.build.images));
}

function browsersync() {
	return app.plugins.browsersync.stream();
}