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