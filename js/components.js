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

function changeButtonAppearance(slider){

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

(function register(){

	const body = document.querySelector("body");
	const popupLinks = document.querySelectorAll(".popup-link");
	const registerModalOverlay = document.querySelector(".register__modal_overlay");
	const registerModalContent = document.querySelector(".register__modal_content");

	if(popupLinks.length > 0){
		for(let index = 0; index <popupLinks.length; index++){
			const popupLink = popupLinks[index];
			popupLink.addEventListener("click", function(){
				
				popupOpen(registerModalOverlay, registerModalContent);
			})
			
		}
	}
	
	function popupOpen(currentPopup, popupContent){
		currentPopup.classList.add("open");
		popupContent.classList.add("open");
		body.style.overflowY = "hidden";
		
		currentPopup.addEventListener("click", function(e){
			if(!e.target.closest(".register__modal_content")){
				popupClose(currentPopup, popupContent);
			}
		})
	}
	function popupClose(currentPopup, popupContent){
		currentPopup.classList.remove("open");
		popupContent.classList.remove("open");
		body.style.overflowY = "";
	}

})()

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