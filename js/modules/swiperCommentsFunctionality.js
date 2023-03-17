import { setSlidesState } from "./swiperHelpers.js";
import { updateSwiperOnMediaQuery } from "./swiperHelpers.js";
import { mql1920 } from "./mediaQueries.js";
import { debounce } from "./helpers.js";
import Swiper from "./swiper-bundle.8.4.5.esm.browser.min.js";

const swiperComments = new Swiper(".comments_slider_container", {
	navigation: {
		nextEl: '.swiper_button_next_comments',
		prevEl: '.swiper_button_prev_comments',
	},
	scrollbar: {
		el: ".swiper_scrollbar_2",
		draggable: true,
	},
	pagination: {
		el: ".swiper_pagination_comments",
	},
	slidesPerView: "auto",
	slidesPerGroup: 1,
	spaceBetween: 10,
	speed: 600,
	breakpoints: {
		768: {
			spaceBetween: 20,
			slidesPerView: "auto",
			speed: 1000,
		},
		1000: {
			spaceBetween: 20,
			slidesPerView: "auto",
			allowTouchMove: false,
			speed: 1000,
		},
		1920: {
			slidesPerView: 2,
			spaceBetween: 30,
			allowTouchMove: false,
			speed: 1000,
		}
	},
	on: {
		slideChange: setSlidesState,
	}
});

updateSwiperOnMediaQuery(swiperComments, mql1920);
mql1920.addEventListener("change", () => updateSwiperOnMediaQuery(swiperComments, mql1920));

const slides = swiperComments.slides.map((slide) => {
	return {
		comment: slide.querySelector(".card_text"),
		button: slide.querySelector(".card_unwrap_button")
	}
});

const debouncedOnResize = debounce(onResize, 240);
window.addEventListener("resize", debouncedOnResize);

slides.forEach((slide) => {
	initializeComment(slide);

	slide.button.addEventListener("click", () => {
		if(slide.comment.classList.contains("opened")){
			closeComment(slide);
		} else {
			openComment(slide);
		}

		slide.button.classList.toggle("opened");
	});
});

function initializeComment(slide){
	slide.comment.dataset.scrollHeight = slide.comment.scrollHeight;
	slide.comment.dataset.clientHeight = slide.comment.clientHeight;
	slide.comment.style.setProperty('--height', slide.comment.clientHeight + "px");

	if(slide.comment.scrollHeight > slide.comment.clientHeight){
		slide.button.classList.add("visible");
	} else{
		slide.button.classList.remove("visible");
	}
}

function openComment(slide){
	slide.comment.classList.add("opened");
	slide.comment.style.setProperty('--height', slide.comment.dataset.scrollHeight + "px");
}

function closeComment(slide, callback = () => {}){
	slide.comment.style.setProperty('--height', slide.comment.dataset.clientHeight + "px");
	slide.comment.addEventListener("transitionend", () => {
		slide.comment.classList.remove("opened");
		callback(slide);
	}, {once: true});
}

function onResize(){
	slides.forEach(slide => {
		slide.comment.style.setProperty('--height', "auto");
		
		if(slide.comment.classList.contains("opened")){
			closeComment(slide, initializeComment);
		} else{
			initializeComment(slide);
		}
		
		slide.button.classList.remove("opened");
	});
}