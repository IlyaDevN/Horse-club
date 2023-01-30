const slidesContainer = document.getElementById("ourVisitors__photo_container");
const slidesQuantity = slidesContainer.querySelectorAll(".ourVisitors__photo").length;
const slideWidth = slidesContainer.querySelector(".ourVisitors__photo").offsetWidth;
const sliderMinPossiblePosition = -(slidesQuantity - 1)*slideWidth;
const SLIDER_MAX_POSSIBLE_POSITION = 0;
let sliderCurrentPosition = 0;

const sliderRangeWidth = document.getElementById("slider_range").offsetWidth;
const sliderThumb = document.getElementById("slider_thumb");
const sliderThumbWidth = sliderRangeWidth/slidesQuantity;
const SLIDER_THUMB_MIN_POSSIBLE_POSITION = 0;
const sliderThumbMaxPossiblePosition = (slidesQuantity - 1)*sliderThumbWidth;
let sliderThumbCurrentPosition = 0;

const btnPrevOurVisitors = document.getElementById("btn_prev_ourVisitors");
const btnNextOurVisitors = document.getElementById("btn_next_ourVisitors");

sliderThumb.style.width = sliderThumbWidth + "px"; 

// changeButtonView();

btnPrevOurVisitors.addEventListener("click", function(){

	sliderCurrentPosition += slideWidth;
	if(sliderCurrentPosition >= SLIDER_MAX_POSSIBLE_POSITION){
		sliderCurrentPosition = SLIDER_MAX_POSSIBLE_POSITION;
		this.disabled = true;
		this.tabIndex = "-1";
	} else{
		this.disabled = false;
		this.tabIndex = "0";
	}
	btnNextOurVisitors.disabled = false;
	btnNextOurVisitors.tabIndex = "0";

	slidesContainer.style.transform = "translateX(" + sliderCurrentPosition + "px)";

	sliderThumbCurrentPosition -= sliderThumbWidth;
	if(sliderThumbCurrentPosition <= SLIDER_THUMB_MIN_POSSIBLE_POSITION){
		sliderThumbCurrentPosition = SLIDER_THUMB_MIN_POSSIBLE_POSITION;
	}
	sliderThumb.style.transform = "translateX(" + sliderThumbCurrentPosition + "px)";
	// changeButtonView();
});

btnNextOurVisitors.addEventListener("click", function(){

	sliderCurrentPosition -= slideWidth;
	if(sliderCurrentPosition <= sliderMinPossiblePosition){
		sliderCurrentPosition = sliderMinPossiblePosition;
		this.disabled = true;
		this.tabIndex = "-1";
	}
	else{
		this.disabled = false;
		this.tabIndex = "0";
	}
	btnPrevOurVisitors.disabled = false;
	btnPrevOurVisitors.tabIndex = "0";

	slidesContainer.style.transform = "translateX(" + sliderCurrentPosition + "px)";

	sliderThumbCurrentPosition += sliderThumbWidth;
	if(sliderThumbCurrentPosition >= sliderThumbMaxPossiblePosition){
		sliderThumbCurrentPosition = sliderThumbMaxPossiblePosition;
	}
	sliderThumb.style.transform = "translateX(" + sliderThumbCurrentPosition + "px)";
	// changeButtonView();
});

// function changeButtonView(){
	// if(sliderCurrentPosition == 0){
	// 	btnPrevOurVisitors.disabled = true;
	// 	btnPrevOurVisitors.tabIndex = "-1";
	// }
	// if(sliderCurrentPosition != 0){
	// 	btnPrevOurVisitors.disabled = false;
	// 	btnPrevOurVisitors.tabIndex = "0";
	// }
	// if(sliderCurrentPosition == sliderMinPossiblePosition){
	// 	btnNextOurVisitors.disabled = true;
	// 	btnNextOurVisitors.tabIndex = "-1";
	// }
	// if(sliderCurrentPosition != sliderMinPossiblePosition){
	// 	btnNextOurVisitors.disabled = false;
	// 	btnNextOurVisitors.tabIndex = "0";
	// }
// }