import { throttle } from "throttle-debounce";

const TABLET_SCREEN_RESOLUTION = 768;
const ZOOM_LEVEL = 16;
const markerImageSrc = document.getElementById("contacts__background-map").dataset.markerImageSrc;

function initMap() {
	const viewportWidth = window.innerWidth;

	const markerOnTheMap = { lat: 50.4456, lng: 30.5410 };
	let centerOfTheMap = {};

	if (viewportWidth < TABLET_SCREEN_RESOLUTION) {
		centerOfTheMap = { lat: 50.4445, lng: 30.537 };
	}
	else {
		centerOfTheMap = { lat: 50.447, lng: 30.531 };
	}

	const map = new google.maps.Map(document.getElementById("contacts__background-map"), {
		zoom: ZOOM_LEVEL,
		center: centerOfTheMap,
		disableDefaultUI: true,
	});

	new google.maps.Marker({
		position: markerOnTheMap,
		map: map,
		icon: markerImageSrc,
	});
}

window.initMap = initMap;

const SCROLL_DELAY = 250;
const loadPoint = document.querySelector(".contacts__container");
const mapSrc = document.getElementById("contacts__background-map").dataset.mapSrc;
const SCROLL_BEFORE_LOAD = 1000;
const loadPointCoords = loadPoint.getBoundingClientRect().top + window.scrollY - SCROLL_BEFORE_LOAD;

const throttledScrollHandler = throttle(SCROLL_DELAY, scrollHandler);
window.addEventListener("scroll", throttledScrollHandler);
scrollHandler();

function scrollHandler() {
	if (window.scrollY >= loadPointCoords) {
		loadScript(mapSrc);
		window.removeEventListener("scroll", throttledScrollHandler);
	}
}

function loadScript(src) {
	const script = document.createElement("script");
	script.src = src;
	document.body.append(script);
}