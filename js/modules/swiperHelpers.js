export function setSlidesState(){
	const swiper = this;
	const activeIndexes = getActiveIndexes.call(swiper);
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

	mqlOver1920.addEventListener("change", on1920changeStateHandler);

	function on1920changeStateHandler(){
		if(mqlOver1920.matches){
			swiper.on("slideChange", setSlidesState);
		} else {
			swiper.off("slideChange", setSlidesState);
			cleanSlidesState.call(swiper);
		}
	}
}

function cleanSlidesState(){
	const swiper = this;
	swiper.slides.forEach(slide => {
		slide.classList.remove("activeSlides");
	});
}

function getActiveIndexes(){
	const swiper = this;
	let activeIndexes = [];
	let activeIndex = swiper.realIndex;
	if(swiper.realIndex == 0){
		for(let i = 0; i < swiper.params.slidesPerView; i++){
			activeIndexes.push(i);
		}
	}
	if(swiper.realIndex == swiper.slides.length - swiper.params.slidesPerView){
		for(let i = swiper.realIndex; i < swiper.slides.length; i++){
			activeIndexes.push(i);
		}
	}
	else {
		const quantityOfActiveIndexes = swiper.params.slidesPerView - 2;
		for(let i = 0; i < quantityOfActiveIndexes; i++){
			activeIndexes.push(++activeIndex);
		}
	}
	return activeIndexes;
}