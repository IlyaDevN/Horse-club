const TABLET_SCREEN_RESOLUTION = 768;
const ZOOM_LEVEL = 16;
const markerImageSrc = document.getElementById("contactsBgMap").dataset.markerImageSrc;

function initMap() {
	const viewportWidth = window.innerWidth;
	
	const markerOnTheMap = { lat: 50.4475, lng: 30.5369 };
	let centerOfTheMap = {};

	if(viewportWidth < TABLET_SCREEN_RESOLUTION){
		centerOfTheMap = { lat: 50.4445, lng: 30.537 };
	}
	else {
		centerOfTheMap = { lat: 50.447, lng: 30.531 };
	}

	const map = new google.maps.Map(document.getElementById("contactsBgMap"), {
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

let isScrollIgnored = false;
const SCROLL_DELAY = 250;
const loadPoint = document.querySelector(".contacts__container");
const mapSrc = document.getElementById("contactsBgMap").dataset.mapSrc;
const loadPointCoords = loadPoint.getBoundingClientRect().top + window.pageYOffset -1000;

window.addEventListener("load", function(){
	window.addEventListener("scroll", scrollHandler);
});

function scrollHandler(){

	if(isScrollIgnored) return;

	if(window.scrollY >= loadPointCoords){
		loadScript(mapSrc);
		window.removeEventListener("scroll", scrollHandler);
	}

	isScrollIgnored = true;

	setTimeout(()=>{
		isScrollIgnored = false;
	}, SCROLL_DELAY);
}

function loadScript(src){
	const script = document.createElement("script");
	script.src = src;
	document.body.append(script);
}