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
			nextEl: '.btn_next',
			prevEl: '.btn_prev',
		},
		scrollbar: {
			el: ".swiper-scrollbar-1",
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
		liftUpSlides(swiper, "extremeSlides");
		
		swiper.on("slideChange", function(){
			liftUpSlides(swiper, "extremeSlides");
		});
	}
	swiper.on("reachBeginning", function(){
		swiper.params.autoplay.reverseDirection = !swiper.params.autoplay.reverseDirection;
	});
	swiper.on("reachEnd", function(){
		swiper.params.autoplay.reverseDirection = !swiper.params.autoplay.reverseDirection;
	})
	
	

})();

function liftUpSlides(slider, className){
	const slidesToLiftUpIndexes = defineSlidesToLiftUpIndexes(slider);
	const slideCollection = slider.slides;
	
	slideCollection.forEach(function(elem, index) {
		if(slidesToLiftUpIndexes.includes(index)){
			elem.classList.add(className);
		} else {
			elem.classList.remove(className);
		}
	});
}

function defineSlidesToLiftUpIndexes(slider){
	const slideCollection = slider.slides;
	const slideBeforeFirst = slideCollection[slider.realIndex - 1];
	const firstSlide = slideCollection[slider.realIndex];
	const lastSlide = slideCollection[slider.realIndex + slider.params.slidesPerView-1];
	const slideAfterLast = slideCollection[slider.realIndex + slider.params.slidesPerView];

	const slideBeforeFirstIndex = slideCollection.indexOf(slideBeforeFirst);
	const firstSlideIndex = slideCollection.indexOf(firstSlide);
	const lastSlideIndex = slideCollection.indexOf(lastSlide);
	const slideAfterLastIndex = slideCollection.indexOf(slideAfterLast);

	const slidesToLiftUpIndexes = [slideBeforeFirstIndex, firstSlideIndex, lastSlideIndex, slideAfterLastIndex];
	
	return slidesToLiftUpIndexes;
}

(function initializeClientsSpeakAboutUsSlider(){

	const swiperComments = new Swiper(".swiper-container-2", {
	
		navigation: {
			nextEl: '.btn_next',
			prevEl: '.btn_prev',
		},
		scrollbar: {
			el: ".swiper-scrollbar-2",
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
		liftUpSlides(swiperComments, "extremeSlides");
		
		swiperComments.on("slideChange", function(){
			liftUpSlides(swiperComments, "extremeSlides");
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

})()