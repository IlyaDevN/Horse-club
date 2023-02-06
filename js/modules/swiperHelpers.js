export function setSlidesState(swiper){
	const activeIndexes = getActiveIndexes(swiper);
	const slideCollection = swiper.slides;
	const mqlOver1920 = window.matchMedia("(min-width: 1920px)");

	if(mqlOver1920.matches){
		slideCollection.forEach(function(elem, index) {
			if(activeIndexes.includes(index)){
				elem.classList.remove("activeSlides");
			}
			else{
				elem.classList.add("activeSlides");
			}
		});
	}
}

export function switchSlidesStateHandlerOn1920px(swiper){
	const mqlOver1920 = window.matchMedia("(min-width: 1920px)");
	mqlOver1920.addEventListener("change", () => slidesStateHandlerOn1920px(swiper, mqlOver1920));
}

function slidesStateHandlerOn1920px(swiper, mql){

	if(mql.matches){
		swiper.on("slideChange", setSlidesState);
	} else {
		swiper.off("slideChange", setSlidesState);
		cleanSlidesState(swiper);
	}
}

function cleanSlidesState(slider){
	slider.slides.forEach(slide => {
		slide.classList.remove("activeSlides");
	});
}

function getActiveIndexes(slider){
	let activeIndexes = [];
	let activeIndex = slider.realIndex;
	if(slider.realIndex == 0){
		for(let i = 0; i < slider.params.slidesPerView; i++){
			activeIndexes.push(i);
		}
	}
	if(slider.realIndex == slider.slides.length - slider.params.slidesPerView){
		for(let i = slider.realIndex; i < slider.slides.length; i++){
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