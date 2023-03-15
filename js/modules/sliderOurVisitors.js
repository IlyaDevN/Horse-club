const slidesContainer = document.getElementById("ourVisitors__photo_container");
const slidesQuantity = slidesContainer.querySelectorAll(".ourVisitors__photo").length;
const SLIDER_MAX_POSSIBLE_POSITION = 0;
const SLIDE_SHIFT_IN_PERCENT = 100;
const sliderMinPossiblePosition = -(slidesQuantity - 1) * SLIDE_SHIFT_IN_PERCENT;
let sliderCurrentShift = 0;

const sliderRangeWidth = document.getElementById("slider_range")?.offsetWidth;
const sliderThumb = document.getElementById("slider_thumb");
const sliderThumbWidth = sliderRangeWidth / slidesQuantity;
const SLIDER_THUMB_MIN_POSSIBLE_POSITION = 0;
const sliderThumbMaxPossiblePosition = (slidesQuantity - 1) * SLIDE_SHIFT_IN_PERCENT;
let sliderThumbCurrentShift = 0;

const paginationContainer = document.querySelector(".pagination_container");
let bullets;
let bulletCurrentPosition = 0;
let activeBullet = null;

const btnPrev = document.getElementById("button_prev_ourVisitors");
const btnNext = document.getElementById("button_next_ourVisitors");

initializeBulletPagination();

sliderThumb.style.width = sliderThumbWidth + "px";

btnPrev.addEventListener("click", function () {
	movePrevSlide();
	moveThumbPrev();
	selectPrevBullet();
	if (btnNext.disabled) {
		enableButton(btnNext);
	}
});

btnNext.addEventListener("click", function () {
	moveNextSlide();
	moveThumbNext();
	selectNextBullet();

	if (btnPrev.disabled) {
		enableButton(btnPrev);
	}
});

function movePrevSlide() {
	sliderCurrentShift += SLIDE_SHIFT_IN_PERCENT;

	if (sliderCurrentShift >= SLIDER_MAX_POSSIBLE_POSITION) {
		disableButton(btnPrev);
	} else {
		enableButton(btnPrev);
	}
	slidesContainer.style.transform = `translateX(${sliderCurrentShift}%)`;
}

function moveNextSlide() {
	sliderCurrentShift -= SLIDE_SHIFT_IN_PERCENT;
	if (sliderCurrentShift <= sliderMinPossiblePosition) {
		disableButton(btnNext);
	}
	else {
		enableButton(btnNext);
	}
	slidesContainer.style.transform = `translateX(${sliderCurrentShift}%)`;
}

function moveThumbPrev() {
	sliderThumbCurrentShift -= SLIDE_SHIFT_IN_PERCENT;
	if (sliderThumbCurrentShift <= SLIDER_THUMB_MIN_POSSIBLE_POSITION) {
		sliderThumbCurrentShift = SLIDER_THUMB_MIN_POSSIBLE_POSITION;
	}
	sliderThumb.style.transform = `translateX(${sliderThumbCurrentShift}%)`;
}

function moveThumbNext() {
	sliderThumbCurrentShift += SLIDE_SHIFT_IN_PERCENT;
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

function initializeBulletPagination() {
	createBullets();
	
	bullets = paginationContainer.querySelectorAll(".ourVisitor_pagination_bullet");
	activeBullet = bullets[bulletCurrentPosition];
	activeBullet.classList.add("active");
}

function createBullets() {
	for(let i = 0; i < slidesQuantity; i++) {
		const bullet = document.createElement("span");
		bullet.classList.add("ourVisitor_pagination_bullet");
		paginationContainer.append(bullet);
	}
}

function selectPrevBullet() {
	activeBullet.classList.remove("active");
	bulletCurrentPosition--;
	bullets[bulletCurrentPosition].classList.add("active");
	activeBullet = bullets[bulletCurrentPosition];
}

function selectNextBullet() {
	activeBullet.classList.remove("active");
	bulletCurrentPosition++;
	bullets[bulletCurrentPosition].classList.add("active");
	activeBullet = bullets[bulletCurrentPosition];
}