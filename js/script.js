'use strict'

/* ============================================================================
				clubDirection galary
=============================================================================*/

clubDirection__galery.addEventListener("mouseover", function(event){

	if(event.target.tagName != "IMG") return;
	
	event.target.style.transform = "scale(1.15)";
})
clubDirection__galery.addEventListener("mouseout", function(event){

	if(event.target.tagName != "IMG") return;
	
	event.target.style.transform = "scale(1)";
})


/* ============================================================================
				ourVisitors slider
=============================================================================*/

btn_prev_ourVisitors.addEventListener("click", function(){
	
	slider_range_ourVisitors.value--;
	if(slider_range_ourVisitors.value <= 1) {
		slider_range_ourVisitors.value = 1;
	}
	changeContainerPosition(slider_range_ourVisitors.value);
})
btn_next_ourVisitors.addEventListener("click", function(){

	slider_range_ourVisitors.value++;
	if(slider_range_ourVisitors.value >= 3) {
		slider_range_ourVisitors.value = 3;
	}
	changeContainerPosition(slider_range_ourVisitors.value);
})

function changeContainerPosition(sliderRangeValue){
	
	switch (+sliderRangeValue) {
		case 1:
			ourVisitors__photo_container.style.marginLeft = "0px";
			break;
		case 2:
			ourVisitors__photo_container.style.marginLeft = -ourVisitors__photo_container.offsetWidth + "px";
			break;
		case 3:
			ourVisitors__photo_container.style.marginLeft = -ourVisitors__photo_container.offsetWidth*2 + "px";
			break;	
	}
}