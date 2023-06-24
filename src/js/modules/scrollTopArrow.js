import { throttle } from "throttle-debounce";

const SCROLL_DELAY = 250;
const PAGE_TOP = 0;
let button = document.getElementById("buttonScrollTop");
let viewportHeight = document.documentElement.clientHeight;

button.addEventListener("click", ()=> window.scrollTo({
	top: PAGE_TOP,
	behavior: "smooth"
}));

const throttledMoveToTop = throttle(SCROLL_DELAY, moveToTop);

function moveToTop() {
	const scrollHeight = window.pageYOffset;

	if(scrollHeight > viewportHeight) {
		button.style.opacity = "0.7";
		button.disabled = false;
	} else {
		button.style.opacity = "0";
		button.disabled = true;
	}
}

window.addEventListener("scroll", throttledMoveToTop);
