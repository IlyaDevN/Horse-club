const slidesContainer = document.getElementById("ourVisitors__photo_container");
const slidesQuantity = slidesContainer.querySelectorAll(".ourVisitors__photo").length;
const SLIDER_MAX_POSSIBLE_POSITION = 0;
const SHIFT = 100;
let sliderMinPossiblePosition = -(slidesQuantity - 1) * SHIFT;
let sliderCurrentShift = 0;
let sliderCurrentPosition;

const sliderRangeWidth = document.getElementById("slider_range").offsetWidth;
const sliderThumb = document.getElementById("slider_thumb");
const sliderThumbWidth = sliderRangeWidth / slidesQuantity;
const SLIDER_THUMB_MIN_POSSIBLE_POSITION = 0;
const sliderThumbMaxPossiblePosition = (slidesQuantity - 1) * SHIFT;
let sliderThumbCurrentShift = 0;

const btnPrev = document.getElementById("button_prev_ourVisitors");
const btnNext = document.getElementById("button_next_ourVisitors");

sliderThumb.style.width = sliderThumbWidth + "px";

btnPrev.addEventListener("click", function () {
	movePrevSlide();
	moveThumbPrev();
	if (btnNext.disabled) {
		enableButton(btnNext);
	}
});

btnNext.addEventListener("click", function () {
	moveNextSlide();
	moveThumbNext();

	if (btnPrev.disabled) {
		enableButton(btnPrev);
	}
});

function movePrevSlide() {
	sliderCurrentShift += SHIFT;

	if (sliderCurrentShift >= SLIDER_MAX_POSSIBLE_POSITION) {
		disableButton(btnPrev);
	} else {
		enableButton(btnPrev);
	}
	slidesContainer.style.transform = `translateX(${sliderCurrentShift}%)`;
}

function moveNextSlide() {
	sliderCurrentShift -= SHIFT;
	if (sliderCurrentShift <= sliderMinPossiblePosition) {
		disableButton(btnNext);
	}
	else {
		enableButton(btnNext);
	}
	slidesContainer.style.transform = `translateX(${sliderCurrentShift}%)`;
}

function moveThumbPrev() {
	sliderThumbCurrentShift -= SHIFT;
	if (sliderThumbCurrentShift <= SLIDER_THUMB_MIN_POSSIBLE_POSITION) {
		sliderThumbCurrentShift = SLIDER_THUMB_MIN_POSSIBLE_POSITION;
	}
	sliderThumb.style.transform = `translateX(${sliderThumbCurrentShift}%)`;
}

function moveThumbNext() {
	sliderThumbCurrentShift += SHIFT;
	if (sliderThumbCurrentShift >= sliderThumbMaxPossiblePosition) {
		sliderThumbCurrentShift = sliderThumbMaxPossiblePosition;
	}
	sliderThumb.style.transform = `translateX(${sliderThumbCurrentShift}%)`;
}

function enableButton(button) {
	button.disabled = false;
}

function disableButton(button) {
	button.disabled = true;
}