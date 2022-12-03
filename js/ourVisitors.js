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
	changeButtonView();

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
		changeButtonView();
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
		changeButtonView();
	});

	function changeButtonView(){
		if(sliderCurrentPosition == 0){
			btnPrevOurVisitors.style.opacity = "0.4";
		}
		if(sliderCurrentPosition != 0){
			btnPrevOurVisitors.style.opacity = "1";
		}
		if(sliderCurrentPosition == sliderMinPossiblePosition){
			btnNextOurVisitors.style.opacity = "0.4";
		}
		if(sliderCurrentPosition != sliderMinPossiblePosition){
			btnNextOurVisitors.style.opacity = "1";
		}
	}
	
})();