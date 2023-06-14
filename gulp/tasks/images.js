import imagemin from "gulp-imagemin";
import newer from "gulp-newer";

export function prepareImages() {
	return app.gulp.src(app.path.src.images)
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "prepareImages",
				message: "Error: <%= error.message %>"
			})
		))
		.pipe(
			app.plugins.if(
				app.isBuild,
				newer(app.path.build.images)
			)
		)
		.pipe(
			app.plugins.if(
				app.isBuild,
				imagemin({
					progressive: true,
					svgoPlugins: [{removeViewBox: false}],
					interlaced: true,
					optimizationLevel: 3 // 0 to 7
				})
			)
		)
		.pipe(app.gulp.dest(app.path.build.images))
		.pipe(
			app.plugins.if(
				app.isDev,
				app.plugins.browsersync.stream())
		);
}