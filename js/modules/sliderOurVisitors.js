const slidesContainer = document.getElementById("ourVisitors__photo_container");
const slidesQuantity = slidesContainer.querySelectorAll(".ourVisitors__photo").length;
let slideWidth = slidesContainer.querySelector(".ourVisitors__photo").offsetWidth;
let sliderMinPossiblePosition = -(slidesQuantity - 1)*slideWidth;
const SLIDER_MAX_POSSIBLE_POSITION = 0;
let sliderCurrentShift = 0;
let sliderCurrentPosition;

const sliderRangeWidth = document.getElementById("slider_range").offsetWidth;
const sliderThumb = document.getElementById("slider_thumb");
const sliderThumbWidth = sliderRangeWidth/slidesQuantity;
const SLIDER_THUMB_MIN_POSSIBLE_POSITION = 0;
const sliderThumbMaxPossiblePosition = (slidesQuantity - 1)*sliderThumbWidth;
let sliderThumbCurrentShift = 0;

const btnPrevOurVisitors = document.getElementById("btn_prev_ourVisitors");
const btnNextOurVisitors = document.getElementById("btn_next_ourVisitors");

sliderThumb.style.width = sliderThumbWidth + "px"; 

const mql320 = window.matchMedia("(min-width: 320px)");
const mql480 = window.matchMedia("(min-width: 480px)");
const mql768 = window.matchMedia("(min-width: 768px)");
const mql1000 = window.matchMedia("(min-width: 1000px)");
const mql1920 = window.matchMedia("(min-width: 1920px)");

const mqlArray = [mql320, mql480, mql768, mql1000, mql1920];

mqlArray.forEach(mql => {
	mql.addEventListener("change", setState);
});

btnPrevOurVisitors.addEventListener("click", function(){
	movePrevSlide();
	moveThumbPrev();
	if(btnNextOurVisitors.disabled){
		enableButton(btnNextOurVisitors);
	}
});

btnNextOurVisitors.addEventListener("click", function(){
	moveNextSlide();
	moveThumbNext();

	if(btnPrevOurVisitors.disabled){
		enableButton(btnPrevOurVisitors);
	}
});

function movePrevSlide(){
	sliderCurrentShift += slideWidth;

	if(sliderCurrentShift >= SLIDER_MAX_POSSIBLE_POSITION){
		sliderCurrentShift = SLIDER_MAX_POSSIBLE_POSITION;
		disableButton(btnPrevOurVisitors);
	} else{
		enableButton(btnPrevOurVisitors);
	}
	slidesContainer.style.transform = `translateX(${sliderCurrentShift}px)`;
}

function moveNextSlide(){
	sliderCurrentShift -= slideWidth;
	if(sliderCurrentShift <= sliderMinPossiblePosition){
		sliderCurrentShift = sliderMinPossiblePosition;
		disableButton(btnNextOurVisitors);
	}
	else{
		enableButton(btnNextOurVisitors);
	}
	slidesContainer.style.transform = `translateX(${sliderCurrentShift}px)`;
}

function moveThumbPrev(){
	sliderThumbCurrentShift -= sliderThumbWidth;
	if(sliderThumbCurrentShift <= SLIDER_THUMB_MIN_POSSIBLE_POSITION){
		sliderThumbCurrentShift = SLIDER_THUMB_MIN_POSSIBLE_POSITION;
	}
	sliderThumb.style.transform = `translateX(${sliderThumbCurrentShift}px)`;
}

function moveThumbNext(){
	sliderThumbCurrentShift += sliderThumbWidth;
	if(sliderThumbCurrentShift >= sliderThumbMaxPossiblePosition){
		sliderThumbCurrentShift = sliderThumbMaxPossiblePosition;
	}
	sliderThumb.style.transform = `translateX(${sliderThumbCurrentShift}px)`;
}

function enableButton(button){
	button.disabled = false;
}

function disableButton(button){
	button.disabled = true;
}

function defineState(){
	sliderCurrentPosition = sliderCurrentShift/slideWidth;
	
	slideWidth = slidesContainer.querySelector(".ourVisitors__photo").offsetWidth;
	sliderMinPossiblePosition = -(slidesQuantity - 1)*slideWidth;
	sliderCurrentShift = slideWidth * sliderCurrentPosition;
	sliderThumbCurrentShift = -sliderThumbWidth * sliderCurrentPosition;
	
	const slideState = {

		sliderShift: sliderCurrentShift,
		sliderThumbShift: sliderThumbCurrentShift
	};
	
	return slideState;
}

function setState(){
	const sliderState = defineState();
	slidesContainer.style.transform = "translateX(" + sliderState.sliderShift + "px)";
	sliderThumb.style.transform = "translateX(" + sliderState.sliderThumbShift + "px)";
}