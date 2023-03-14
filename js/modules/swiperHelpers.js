export function updateSwiperOnMediaQuery(swiper, mql){
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

export function setSlidesState(swiper){
	const activeIndexes = getActiveIndexes(swiper);

	swiper.slides.forEach((elem, index) => {
		if(activeIndexes.includes(index)){
			elem.classList.remove("activeSlides");
		}
		else{
			elem.classList.add("activeSlides");
		}
	});
}

function cleanSlidesState(slider){
	slider.slides.forEach(slide => slide.classList.remove("activeSlides"));
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