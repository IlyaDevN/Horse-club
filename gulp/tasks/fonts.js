export const copyFonts = () => {
			//Ищем файлы шрифтов .woff
			return app.gulp.src(`${app.path.srcFolder}/fonts/*.woff`)
			//Выгружаем в папку с результатом
			.pipe(app.gulp.dest(`${app.path.build.fonts}`))
			//Ищем файлы шрифтов .woff2
			.pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.woff2`))
			//Выгружаем в папку с результатом
			.pipe(app.gulp.dest(`${app.path.build.fonts}`))
}