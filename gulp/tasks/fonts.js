export const copyFonts = () => {
			//Searching for fonts .woff
			return app.gulp.src(`${app.path.srcFolder}/fonts/*.woff`)
			//Move to folder with results
			.pipe(app.gulp.dest(`${app.path.build.fonts}`))
			//Searching for fonts .woff2
			.pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.woff2`))
			//Move to folder with results
			.pipe(app.gulp.dest(`${app.path.build.fonts}`))
}