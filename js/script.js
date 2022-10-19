'use strict'

/* ============================================================================
				ourVisitors slider
=============================================================================*/
//SLIDER CONTAINER Variables
let slidesQuantity = ourVisitors__photo_container.querySelectorAll(".ourVisitors__photo").length;
let slideWidth = ourVisitors__photo_container.querySelector(".ourVisitors__photo").offsetWidth;
let sliderCurrentPosition = 0;
let sliderMinPossiblePosition = -(slidesQuantity - 1)*slideWidth;
let sliderMaxPossiblePosition = 0;

//SLIDER RANGE Variables
let sliderRangeWidth = sliderRange.offsetWidth;
let sliderThumbWidth = sliderRangeWidth/slidesQuantity;
let sliderThumbCurrentPosition = 0;
let sliderThumbMinPossiblePosition = 0;
let sliderThumbMaxPossiblePosition = (slidesQuantity - 1)*sliderThumbWidth;

// Устанавливаем ширину ползунка в зависимости от количества слайдов
sliderThumb.style.width = sliderThumbWidth + "px"; 

btnPrevOurVisitors.addEventListener("click", function(){
//СМЕЩЕНИЕ СЛАЙДЕРА
	sliderCurrentPosition += slideWidth;
	if(sliderCurrentPosition >= sliderMaxPossiblePosition){
		sliderCurrentPosition = sliderMaxPossiblePosition;
	}
	ourVisitors__photo_container.style.marginLeft = sliderCurrentPosition + "px";
//СМЕЩЕНИЕ ПОЛЗУНКА
	sliderThumbCurrentPosition -= sliderThumbWidth;
	if(sliderThumbCurrentPosition <= sliderThumbMinPossiblePosition){
		sliderThumbCurrentPosition = sliderThumbMinPossiblePosition;
	}
	sliderThumb.style.marginLeft = sliderThumbCurrentPosition + "px";
});

btnNextOurVisitors.addEventListener("click", function(){
//СМЕЩЕНИЕ СЛАЙДЕРА
	sliderCurrentPosition -= slideWidth;
	if(sliderCurrentPosition <= sliderMinPossiblePosition){
		sliderCurrentPosition = sliderMinPossiblePosition;
	}
	ourVisitors__photo_container.style.marginLeft = sliderCurrentPosition + "px";
//СМЕЩЕНИЕ ПОЛЗУНКА
sliderThumbCurrentPosition += sliderThumbWidth;
	if(sliderThumbCurrentPosition >= sliderThumbMaxPossiblePosition){
		sliderThumbCurrentPosition = sliderThumbMaxPossiblePosition;
	}
	sliderThumb.style.marginLeft = sliderThumbCurrentPosition + "px";
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
if(viewportWidth >= 1920){

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

let slidesOurHorsesQuantity = galaryRow.querySelectorAll(".galary__item").length;
//SLIDER RANGE Variables
let sliderRangeOurHorsesWidth = sliderRangeOurHorses.offsetWidth;
let sliderThumbOurHorsesWidth = sliderRangeOurHorsesWidth/slidesOurHorsesQuantity;

/* Устанавливаем ширину ползунка в зависимости от количества слайдов и 
количества выводимых на экран слайдов*/
swiper.scrollbar.dragEl.style.width = sliderThumbOurHorsesWidth*swiper.params.slidesPerView + "px";



