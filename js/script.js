'use strict'

/* ============================================================================
				ourVisitors slider
=============================================================================*/
let containersQuantity = ourVisitors__photo_container.querySelectorAll(".ourVisitors__photo").length;
let sliderCurrentPosition = 1;
let sliderMaxPossiblePosition = containersQuantity;
let sliderRangeWidth = sliderRange.offsetWidth;
let sliderRangePointerWidth = sliderRangeWidth/containersQuantity;

sliderRangePointer.style.width = sliderRangePointerWidth + "px";


btnPrevOurVisitors.addEventListener("click", function(){
	
	sliderCurrentPosition--;
	if(sliderCurrentPosition <= 1) {
		sliderCurrentPosition = 1;
	}
	changeContainerPosition(sliderCurrentPosition);
})
btnNextOurVisitors.addEventListener("click", function(){

	sliderCurrentPosition++;
	if(sliderCurrentPosition >= sliderMaxPossiblePosition) {
		sliderCurrentPosition = sliderMaxPossiblePosition;
	}
	changeContainerPosition(sliderCurrentPosition);
})

function changeContainerPosition(sliderCurrentPosition){
	

	switch (+sliderCurrentPosition) {
		case 1:
			ourVisitors__photo_container.style.marginLeft = "0px";
			sliderRangePointer.style.marginLeft = "0px";
			break;
		case 2:
			ourVisitors__photo_container.style.marginLeft = -ourVisitors__photo_container.offsetWidth + "px";
			sliderRangePointer.style.marginLeft = sliderRangePointerWidth + "px";
			break;
		case 3:
			ourVisitors__photo_container.style.marginLeft = -ourVisitors__photo_container.offsetWidth*2 + "px";
			sliderRangePointer.style.marginLeft = sliderRangePointerWidth*2 + "px";
			break;	
	}
}