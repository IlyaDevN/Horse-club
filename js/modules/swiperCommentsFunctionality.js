import { setSlidesState } from "./swiperHelpers.js";
import { switchSlidesStateHandlerOn1920px } from "./swiperHelpers.js";
import Swiper from "./swiper-bundle.8.4.5.esm.browser.min.js";
import { mqlArray } from "./helpers.js";


const slides = document.querySelectorAll(".comments_card_container");
const BTN_APPEARANCE_DELAY = 1000;

const swiperComments = new Swiper(".comments_slider_container", {

	navigation: {
		nextEl: '.swiper_button_next_comments',
		prevEl: '.swiper_button_prev_comments',
	},
	scrollbar: {
		el: ".swiper_scrollbar_2",
		draggable: true,
	},
	slidesPerView: 1,
	slidesPerGroup: 1,
	spaceBetween: 10,
	breakpoints: {
		768: {
			slidesPerView: 2,
		},
		1000: {
			slidesPerView: 2,
			allowTouchMove: false,
		},
		1920: {
			slidesPerView: 4,
			spaceBetween: 15,
			allowTouchMove: false,
		}
	},
	speed: 1000,
	focufocusableElements: "button",
	on: {
		slideChange: setSlidesState,
	}
});

setSlidesState(swiperComments);
switchSlidesStateHandlerOn1920px(swiperComments);

addInitialClientHeigh();
initializeCommentsButtons();
changeBtnVisibilityDelayed();
addHandlerOnResize();

function addInitialClientHeigh() {

	slides.forEach(slide => {
		const cardText = slide.querySelector(".card_text");
		cardText.dataset.initialClientHeight = cardText.clientHeight;
	});
}

function initializeCommentsButtons() {

	slides.forEach(slide => {
		const cardBtn = slide.querySelector(".card_unwrap_button");
		cardBtn.addEventListener("click", () => changeCommentState(slide))
	});
}

function changeCommentState(slide) {

	if (!slide.classList.contains("open")) {
		openComment(slide);
	} else {
		closeComment(slide);
	}
}

function openComment(slide) {
	const cardText = slide.querySelector(".card_text");
	const unwrapButtonn = slide.querySelector(".card_unwrap_button");
	cardText.style.height = cardText.scrollHeight + "px";
	slide.classList.add("open");
	unwrapButtonn.classList.add("open");
}

function closeComment(slide) {
	const cardText = slide.querySelector(".card_text");
	const unwrapButtonn = slide.querySelector(".card_unwrap_button");

	cardText.style.height = "";
	unwrapButtonn.classList.remove("open");
	cardText.addEventListener("transitionend", ()=> slide.classList.remove("open"), {once: true});
}

function closeAllComments() {

	slides.forEach(slide => {
		const cardText = slide.querySelector(".card_text");
		const unwrapButtonn = slide.querySelector(".card_unwrap_button");

		cardText.style.height = "";
		unwrapButtonn.classList.remove("open");
		cardText.addEventListener("transitionend", ()=> slide.classList.remove("open"), {once: true});
	});
}

function changeBtnVisibilityDelayed() {

	setTimeout(changeBtnVisibility, BTN_APPEARANCE_DELAY);
}

function changeBtnVisibility() {

	slides.forEach(slide => {
		const cardText = slide.querySelector(".card_text");

		if (cardText.scrollHeight > cardText.dataset.initialClientHeight) {
			slide.classList.add("active");
		}
		else {
			slide.classList.remove("active");
		}
	});
}

function addHandlerOnResize() {

	mqlArray.forEach(mql => {
		mql.addEventListener("change", closeAllComments);
		mql.addEventListener("change", changeBtnVisibilityDelayed);
	});
}