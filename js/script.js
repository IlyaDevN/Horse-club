// 'use strict'

(function initializeOurVisitorsSlider(){

	const slidesContainer = document.getElementById("ourVisitors__photo_container");
	const slidesQuantity = slidesContainer.querySelectorAll(".ourVisitors__photo").length;
	const slideWidth = slidesContainer.querySelector(".ourVisitors__photo").offsetWidth;
	const sliderMinPossiblePosition = -(slidesQuantity - 1)*slideWidth;
	const sliderMaxPossiblePosition = 0;
	let sliderCurrentPosition = 0;

	const sliderRangeWidth = document.getElementById("slider_range").offsetWidth;
	const sliderThumb = document.getElementById("slider_thumb");
	const sliderThumbWidth = sliderRangeWidth/slidesQuantity;
	const sliderThumbMinPossiblePosition = 0;
	const sliderThumbMaxPossiblePosition = (slidesQuantity - 1)*sliderThumbWidth;
	let sliderThumbCurrentPosition = 0;

	const btnPrevOurVisitors = document.getElementById("btn_prev_ourVisitors");
	const btnNextOurVisitors = document.getElementById("btn_next_ourVisitors");

	sliderThumb.style.width = sliderThumbWidth + "px"; 

	btnPrevOurVisitors.addEventListener("click", function(){

		sliderCurrentPosition += slideWidth;
		if(sliderCurrentPosition >= sliderMaxPossiblePosition){
			sliderCurrentPosition = sliderMaxPossiblePosition;
		}
		slidesContainer.style.marginLeft = sliderCurrentPosition + "px";

		sliderThumbCurrentPosition -= sliderThumbWidth;
		if(sliderThumbCurrentPosition <= sliderThumbMinPossiblePosition){
			sliderThumbCurrentPosition = sliderThumbMinPossiblePosition;
		}
		sliderThumb.style.marginLeft = sliderThumbCurrentPosition + "px";	
	});

	btnNextOurVisitors.addEventListener("click", function(){

		sliderCurrentPosition -= slideWidth;
		if(sliderCurrentPosition <= sliderMinPossiblePosition){
			sliderCurrentPosition = sliderMinPossiblePosition;
		}
		slidesContainer.style.marginLeft = sliderCurrentPosition + "px";

		sliderThumbCurrentPosition += sliderThumbWidth;
		if(sliderThumbCurrentPosition >= sliderThumbMaxPossiblePosition){
			sliderThumbCurrentPosition = sliderThumbMaxPossiblePosition;
		}
		sliderThumb.style.marginLeft = sliderThumbCurrentPosition + "px";
	});
})();

(function initializeOurHorsesSlider(){

	const swiper = new Swiper(".swiper-container-1", {
		navigation: {
			nextEl: '.swiper_btn_next_1',
			prevEl: '.swiper_btn_prev_1',
		},
		scrollbar: {
			el: ".swiper_scrollbar_1",
			draggable: true,
		},
		autoplay: {
			delay: 2500,
			disableOnInteraction: false,
			pauseOnMouseEnter: true,
			reverseDirection: false,
		},
		breakpoints: {
			320: {
				slidesPerView: 1,
				slidesPerGroup: 1,
				spaceBetween: 10,
			},
			480: {
				slidesPerView: 2,
				spaceBetween: 10,
				slidesPerGroup: 2,
			}, 
			768: {
				slidesPerView: 3,
				spaceBetween: 20,
				slidesPerGroup: 1,
			},
			1920: {
				slidesPerView: 5,
				spaceBetween: 30,
				slidesPerGroup: 1
			}
		},
		speed: 1000,
	});

	let viewportWidth = window.innerWidth;
	const screenResolution = 1920;

	if(viewportWidth >= screenResolution){
		for(let slide of swiper.slides){
			slide.classList.add("activeSlides");
		}
		setSlidesState(swiper, "activeSlides");
		
		swiper.on("slideChange", function(){
			setSlidesState(swiper, "activeSlides");
		});
	}
	swiper.on("reachBeginning", function(){
		swiper.params.autoplay.reverseDirection = !swiper.params.autoplay.reverseDirection;
	});
	swiper.on("reachEnd", function(){
		swiper.params.autoplay.reverseDirection = !swiper.params.autoplay.reverseDirection;
	})

})();

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

(function initializeClientsSpeakAboutUsSlider(){

	const swiperComments = new Swiper(".swiper-container-2", {
	
		navigation: {
			nextEl: '.swiper_btn_next_2',
			prevEl: '.swiper_btn_prev_2',
		},
		scrollbar: {
			el: ".swiper_scrollbar_2",
			draggable: true,
		},
		autoplay: {
			delay: 2500,
			disableOnInteraction: false,
			pauseOnMouseEnter: true,
			reverseDirection: false,
		},
		breakpoints: {
			320: {
				slidesPerView: 1,
				slidesPerGroup: 1,
				spaceBetween: 10,
			},
			480: {
				slidesPerView: 1,
				slidesPerGroup: 1,
				spaceBetween: 10,
			}, 
			768: {
				slidesPerView: 2,
				slidesPerGroup: 1,
				spaceBetween: 10,
			},
			1920: {
				slidesPerView: 4,
				spaceBetween: 15,
				slidesPerGroup: 1
			}
		},
		speed: 1000,
	})
	swiperComments.on("reachBeginning", function(){
		swiperComments.params.autoplay.reverseDirection = !swiperComments.params.autoplay.reverseDirection;
	});
	swiperComments.on("reachEnd", function(){
		swiperComments.params.autoplay.reverseDirection = !swiperComments.params.autoplay.reverseDirection;
	})
	let viewportWidth = window.innerWidth;
	const screenResolution = 1920;
	
	if(viewportWidth >= screenResolution){
		for(let slide of swiperComments.slides){
			slide.classList.add("activeSlides");
		}
		setSlidesState(swiperComments, "activeSlides");
		
		swiperComments.on("slideChange", function(){
			setSlidesState(swiperComments, "activeSlides");
		});
	}
	
})();

(function changeContactsMapSize(){

	let screenResolution = document.documentElement.clientWidth;
	let fullScreenResolution = window.innerWidth;
	let map = document.querySelector(".contacts__bg_map");
	map.width = screenResolution;
	if(fullScreenResolution < 480) {
		map.height = 748;
	}
	if(fullScreenResolution >= 480 && fullScreenResolution < 768) {
		map.height = 786;
	}
	if(fullScreenResolution >= 768 && fullScreenResolution < 1000) {
		map.height = 510;
	}
	if(fullScreenResolution >= 1000) {
		map.height = 650;
	}

	window.addEventListener("resize", function(){
	
		screenResolution = document.documentElement.clientWidth;
		fullScreenResolution = window.innerWidth;
		map.width = screenResolution;
		if(fullScreenResolution < 480) {
			map.height = 748;
		}
		if(fullScreenResolution >= 480 && fullScreenResolution < 768) {
			map.height = 786;
		}
		if(fullScreenResolution >= 768 && fullScreenResolution < 1000) {
			map.height = 510;
		}
		if(fullScreenResolution >= 1000) {
			map.height = 650;
		}
	})

})();

