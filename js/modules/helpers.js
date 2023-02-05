export function throttle(func, ms){

	let isThrottled = false,
	savedArgs,
	savedThis;

	function wrapper() {

		if (isThrottled) {
			savedArgs = arguments;
			savedThis = this;
			return;
		}

		func.apply(this, arguments);

		isThrottled = true;

		setTimeout(function() {
			isThrottled = false;
			if (savedArgs) {
				wrapper.apply(savedThis, savedArgs);
				savedArgs = savedThis = null;
			}
		}, ms);
	}

	return wrapper;
}

const mql320 = window.matchMedia("(min-width: 320px)");
const mql480 = window.matchMedia("(min-width: 480px)");
const mql768 = window.matchMedia("(min-width: 768px)");
const mql1000 = window.matchMedia("(min-width: 1000px)");
const mql1920 = window.matchMedia("(min-width: 1920px)");

export const mqlArray = [mql320, mql480, mql768, mql1000, mql1920];