'use strict'

// ourVisitors__sliderCheckbox.addEventListener("click", function(event){
// 	if(!event.target.closest("button") && event.target.tagName != "INPUT") return;
// 	let photoContainerCoords = ourVisitors__photo_container.getBoundingClientRect();
// 	let btn = event.target.closest("button");
	
// 	if(btn && btn.classList.contains("btn_prev")){
// 		slider_range_ourVis.value--;
// 		if(slider_range_ourVis.value <= 1) {
// 			slider_range_ourVis.value = 1;
// 		}
// 	}
// 	if(btn && btn.classList.contains("btn_next")){
// 		slider_range_ourVis.value++;
// 		if(slider_range_ourVis.value >= 3) {
// 			slider_range_ourVis.value = 3;
// 		}
// 	}

// 	switch (+slider_range_ourVis.value) {
// 		case 1:
// 			ourVisitors__photo_container.style.marginLeft = "0px";
// 			break;
// 		case 2:
// 			ourVisitors__photo_container.style.marginLeft = -photoContainerCoords.width + "px";
// 			break;
// 		case 3:
// 			ourVisitors__photo_container.style.marginLeft = -photoContainerCoords.width*2 + "px";
// 			break;	
// 	}
// })

let photoContainerCoords = ourVisitors__photo_container.getBoundingClientRect();

btn_prev_ourVis.addEventListener("click", function(){

	slider_range_ourVis.value--;
	if(slider_range_ourVis.value <= 1) slider_range_ourVis.value = 1;
	changeContainerPosition(slider_range_ourVis.value);
})
btn_next_ourVis.addEventListener("click", function(){

	slider_range_ourVis.value++;
	if(slider_range_ourVis.value >= 3) slider_range_ourVis.value = 3;
	changeContainerPosition(slider_range_ourVis.value);
})

function changeContainerPosition(sliderRangeValue){
	switch (+sliderRangeValue) {
		case 1:
			ourVisitors__photo_container.style.marginLeft = "0px";
			break;
		case 2:
			ourVisitors__photo_container.style.marginLeft = -photoContainerCoords.width + "px";
			break;
		case 3:
			ourVisitors__photo_container.style.marginLeft = -photoContainerCoords.width*2 + "px";
			break;	
	}
}