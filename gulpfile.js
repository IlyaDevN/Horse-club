import gulp from "gulp";

import { path } from "./gulp/config/path.js";

import { plugins } from "./gulp/config/plugins.js";

global.app = {
	isBuild: process.argv.includes("--build"),
	isDev: !process.argv.includes("--build"),
	path: path,
	gulp: gulp,
	plugins: plugins
}

import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { prepareImages } from "./gulp/tasks/images.js";
import { copyFonts } from "./gulp/tasks/fonts.js";

function watcher() {
	gulp.watch(path.watch.html, html);
	gulp.watch(path.watch.scss, scss);
	gulp.watch(path.watch.js, js);
	gulp.watch(path.watch.images, prepareImages);
}

const mainTasks = gulp.parallel(copyFonts, html, scss, js, prepareImages);

const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);

export { dev }
export { build }

gulp.task("default", dev);