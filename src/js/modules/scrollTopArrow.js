import { throttle } from "throttle-debounce";

const SCROLL_DELAY = 250;
const PAGE_TOP = 0;
const button = document.getElementById("buttonScrollTop");

button.addEventListener("click", ()=> window.scrollTo({
	top: PAGE_TOP,
	behavior: "smooth"
}));

const throttledMoveToTop = throttle(SCROLL_DELAY, moveToTop);

function moveToTop() {
	const scrollHeight = window.scrollY;
	const viewportHeight = document.documentElement.clientHeight;

	if(scrollHeight > viewportHeight) {
		button.disabled = false;
	} else {
		button.disabled = true;
	}
}

window.addEventListener("scroll", throttledMoveToTop);
window.addEventListener("resize", throttledMoveToTop);