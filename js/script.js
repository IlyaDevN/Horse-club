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

	const swiper = new Swiper(".swiper-container", {
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev"
		},
		scrollbar: {
			el: ".swiper-scrollbar",
			draggable: true,
		},
		navigation: {
			nextEl: '.swiper-next',
			prevEl: '.swiper-prev',
		},
		autoplay: {
			delay: 2500,
			disableOnInteraction: false,
			pauseOnMouseEnter: true,
			reverseDirection: false,
		},
		speed: 1000,
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
	});

	let viewportWidth = window.innerWidth;
	const screenResolution = 1920;
	const galaryRow = document.getElementById("galary_row");

	if(viewportWidth >= screenResolution){
		liftUpSlides(swiper, "extremeSlides");
		
		swiper.on("slideChange", function(){
			liftUpSlides(swiper, "extremeSlides");
		});
	}
	swiper.on("reachEnd", function(){
		swiper.params.autoplay.reverseDirection = !swiper.params.autoplay.reverseDirection;
	})
	swiper.on("reachBeginning", function(){
		swiper.params.autoplay.reverseDirection = !swiper.params.autoplay.reverseDirection;
	});

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

})();
