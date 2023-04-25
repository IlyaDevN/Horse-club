import ghPages from 'gulp-gh-pages';

export const git = () => {
	return app.gulp.src(`${app.path.buildFolder}/**/*`)
		.pipe(ghPages({
			remoteUrl: "https://github.com/IlyaDevN/test-horse",
			branch: "gulp-gh-pages"
		}))
}

