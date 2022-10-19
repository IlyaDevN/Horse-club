'use strict'

/* ============================================================================
				ourVisitors slider
=============================================================================*/

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

	(function sliderMove(){
		sliderCurrentPosition += slideWidth;
		if(sliderCurrentPosition >= sliderMaxPossiblePosition){
			sliderCurrentPosition = sliderMaxPossiblePosition;
		}
		ourVisitors__photo_container.style.marginLeft = sliderCurrentPosition + "px";
	})();
	
	(function thumbMove(){
		sliderThumbCurrentPosition -= sliderThumbWidth;
		if(sliderThumbCurrentPosition <= sliderThumbMinPossiblePosition){
			sliderThumbCurrentPosition = sliderThumbMinPossiblePosition;
		}
		sliderThumb.style.marginLeft = sliderThumbCurrentPosition + "px";
	})();
	
});

btnNextOurVisitors.addEventListener("click", function(){

	(function sliderMove(){
		sliderCurrentPosition -= slideWidth;
		if(sliderCurrentPosition <= sliderMinPossiblePosition){
			sliderCurrentPosition = sliderMinPossiblePosition;
		}
		ourVisitors__photo_container.style.marginLeft = sliderCurrentPosition + "px";
	})();
	
	(function thumbMove(){
		sliderThumbCurrentPosition += sliderThumbWidth;
		if(sliderThumbCurrentPosition >= sliderThumbMaxPossiblePosition){
			sliderThumbCurrentPosition = sliderThumbMaxPossiblePosition;
		}
		sliderThumb.style.marginLeft = sliderThumbCurrentPosition + "px";
	})();

});

/* ============================================================================
				ourHorses slider SWIPER
=============================================================================*/

let swiper = new Swiper(".swiper-container", {
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
if(viewportWidth >= screenResolution){

	let slideCollection = galaryRow.querySelectorAll(".galary__item");
	let currentSecondSlide = slideCollection[swiper.realIndex+1];
	let currentThirdSlide = slideCollection[swiper.realIndex+2];
	let currentFourthSlide = slideCollection[swiper.realIndex+3];
	currentSecondSlide.classList.add("centralSlides");
	currentThirdSlide.classList.add("centralSlides");
	currentFourthSlide.classList.add("centralSlides");

	swiper.on("slideChange", function(){
		let secondSlide = slideCollection[swiper.realIndex+1];
		let thirdSlide = slideCollection[swiper.realIndex+2];
		let fourthSlide = slideCollection[swiper.realIndex+3];
	
		currentSecondSlide.classList.remove("centralSlides");
		currentThirdSlide.classList.remove("centralSlides");
		currentFourthSlide.classList.remove("centralSlides");
	
		secondSlide.classList.add("centralSlides");
		thirdSlide.classList.add("centralSlides");
		fourthSlide.classList.add("centralSlides");
	
		currentSecondSlide = secondSlide;
		currentThirdSlide = thirdSlide;
		currentFourthSlide = fourthSlide;
		
	});
}

