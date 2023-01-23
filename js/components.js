// 'use strict'

function setSlidesState(slider, className){
	const activeIndexes = getActiveIndexes(slider, slider.realIndex);
	const slideCollection = slider.slides;
	
	slideCollection.forEach(function(elem, index) {
		if(activeIndexes.includes(index)){
			elem.classList.remove(className);
		}
		else{
			elem.classList.add(className);
		}
	});
}

function getActiveIndexes(slider, realIndex){
	let activeIndexes = [];
	let activeIndex = realIndex;
	if(realIndex == 0){
		for(let i = 0; i < slider.params.slidesPerView; i++){
			activeIndexes.push(i);
		}
	}
	if(realIndex == slider.slides.length - slider.params.slidesPerView){
		for(let i = realIndex; i < slider.slides.length; i++){
			activeIndexes.push(i);
		}
	}
	else {
		const quantityOfActiveIndexes = slider.params.slidesPerView - 2;
		for(let i = 0; i < quantityOfActiveIndexes; i++){
			activeIndexes.push(++activeIndex);
		}
	}
	return activeIndexes;
}

function navigationButtonAppearance(slider){

	const btnPrev = slider.navigation.prevEl;
	const btnNext = slider.navigation.nextEl;

	if(btnPrev.classList.contains("swiper-button-disabled")){
		btnPrev.classList.add("slider_button_disabled");
	}
	if(!btnPrev.classList.contains("swiper-button-disabled")){
		btnPrev.classList.remove("slider_button_disabled");
	}
	if(btnNext.classList.contains("swiper-button-disabled")){
		btnNext.classList.add("slider_button_disabled");
	}
	if(!btnNext.classList.contains("swiper-button-disabled")){
		btnNext.classList.remove("slider_button_disabled");
	}
}

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

(function modalValidation(){
	const elemsToCheck = document.querySelectorAll(".validate");
	const errorTimeout = 3000;
	

	if(elemsToCheck.length > 0){
		for(let elem of elemsToCheck){
			if(elem.tagName === "INPUT"){
				elem.addEventListener("invalid", function(event){
					event.preventDefault();
					if(event.target.getAttribute("errorLock") === "true") {
						return;
					}
					showError(event.target);
					setTimeout(hideError, errorTimeout, event.target);
				})


				
			}
		}
	}
	function showError(invalidElem){

		showTooltips();
		lightUpBorder();

		invalidElem.setAttribute("errorLock", true);

		function showTooltips(){
			invalidElem.previousElementSibling.classList.add("active");
		}
		function lightUpBorder(){
			if(invalidElem.type === "checkbox"){
				document.documentElement.style.setProperty('--checkboxReg-color', '#FF5C00');
			} else{
				invalidElem.classList.add("active");
			}
		}
	}
	function hideError(invalidElem){

		hideTooltips();
		lightDownBorder();

		invalidElem.setAttribute("errorLock", false);

		function hideTooltips(){
			invalidElem.previousElementSibling.classList.remove("active");
		}
		function lightDownBorder (){
			if(invalidElem.type === "checkbox"){
				document.documentElement.style.setProperty('--checkboxReg-color', '#FFC700');
			} else{
				invalidElem.classList.remove("active");
			}
		}
	}
})();

(function loadMap(){

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
})()


	