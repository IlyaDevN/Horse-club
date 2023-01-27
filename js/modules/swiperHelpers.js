export function setSlidesState(slider, className){
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

export function getActiveIndexes(slider, realIndex){
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

export function navigationButtonAppearance(slider){

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