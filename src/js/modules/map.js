const TABLET_SCREEN_RESOLUTION = 768;
const ZOOM_LEVEL = 16;
const markerImageSrc = document.getElementById("contacts__background-map").dataset.markerImageSrc;
const mapSrc = document.getElementById("contacts__background-map").dataset.mapSrc;

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

function loadScript() {
	const script = document.createElement("script");
	script.src = mapSrc;
	document.body.append(script);
}

const mapObserver = new IntersectionObserver(([entry], observer) => {
	if(entry.isIntersecting) {
		loadScript();
		observer.unobserve(entry.target);
	}
});

mapObserver.observe(document.querySelector(".comments"));