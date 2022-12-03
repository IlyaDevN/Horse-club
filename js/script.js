// 'use strict'

function setSlidesState(slider, className){
	const activeIndexes = getActiveIndexes(slider, slider.realIndex);
	const slideCollection = slider.slides;
	changeButtonAppearance(slider);
	
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

	if(slider.navigation.prevEl.classList.contains("swiper-button-disabled")){
		slider.navigation.prevEl.style.opacity = "0.4";
		slider.navigation.prevEl.style.cursor = "auto";
	}
	if(!slider.navigation.prevEl.classList.contains("swiper-button-disabled")){
		slider.navigation.prevEl.style.opacity = "1";
		slider.navigation.prevEl.style.cursor = "pointer";
	}
	if(slider.navigation.nextEl.classList.contains("swiper-button-disabled")){
		slider.navigation.nextEl.style.opacity = "0.4";
		slider.navigation.nextEl.style.cursor = "auto";
	}
	if(!slider.navigation.nextEl.classList.contains("swiper-button-disabled")){
		slider.navigation.nextEl.style.opacity = "1";
		slider.navigation.nextEl.style.cursor = "pointer";
	}
}