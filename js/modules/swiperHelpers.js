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
		swiper.update();
		swiper.on("slideChange", setSlidesState);
		setSlidesState(swiper);
	} else {
		swiper.update();
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
	
	let activeIndex = slider.realIndex;
	const activeIndexes = [activeIndex];
	const restIndexesCount = slider.params.slidesPerView - 1;

	for(let i = 0; i < restIndexesCount; i++){
		activeIndexes.push(++activeIndex);
	}
	
	return activeIndexes;
}