
function initMap() {
	const viewportWidth = window.innerWidth;
	const screenResolutionTab = 768;

	const markerOnTheMap = { lat: 50.4475, lng: 30.5369 };
	let centerOfTheMap = {};

	const markerImage = "img/contacts/icons/x768/pinGreen_x768.svg";

	if(viewportWidth < screenResolutionTab){
		centerOfTheMap = { lat: 50.4445, lng: 30.537 };
	}
	else {
		centerOfTheMap = { lat: 50.447, lng: 30.531 };
	}

	const map = new google.maps.Map(document.getElementById("contactsBgMap"), {
		zoom: 16,
		center: centerOfTheMap,
		disableDefaultUI: true,
	});

	const marker = new google.maps.Marker({
		position: markerOnTheMap,
		map: map,
		icon: markerImage,
	});
}

window.initMap = initMap;

export default function loadMap(){

	let isScrollIgnored = false;
	const delay = 250;
	const loadPoint = document.querySelector(".contacts__container");
	const mapSrc = document.getElementById("contactsBgMap").dataset.mapSrc;
	
	window.addEventListener("load", function(){
		const loadPointCoords = loadPoint.getBoundingClientRect().top + window.pageYOffset -1000;
		
		window.addEventListener("scroll", function scrollHandler(){
		
			if(isScrollIgnored) return;
			
			if(window.scrollY >= loadPointCoords){
				loadScript(mapSrc);
				window.removeEventListener("scroll", scrollHandler);
			}
			
			isScrollIgnored = true;
	
			setTimeout(()=>{
				isScrollIgnored = false;
			}, delay);
			
		});
	}, {once: true});

	function loadScript(src){
		const script = document.createElement("script");
		script.src = src;
		document.body.append(script);
	}
}