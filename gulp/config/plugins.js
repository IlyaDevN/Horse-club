import replace from "gulp-replace"; // search and replace
import plumber from "gulp-plumber"; // handling of errors
import notify from "gulp-notify"; // tooltip messages
import browsersync from "browser-sync"; //local server
import newer from "gulp-newer"; //checking of update
import ifPlugin from "gulp-if"; //conditional branching

export const plugins = {
	replace: replace,
	plumber: plumber,
	notify: notify,
	browsersync: browsersync,
	newer: newer,
	if: ifPlugin
}

