import { setSlidesState } from "./swiperHelpers.js";
import { switchSlidesStateHandlerOn1920px } from "./swiperHelpers.js";
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
	slidesPerView: 1,
	slidesPerGroup: 1,
	spaceBetween: 10,
	breakpoints: {
		480: {
			slidesPerView: 2,
		},
		768: {
			slidesPerView: 2,
		},
		1000: {
			slidesPerView: 3,
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

const slidesOriginal = swiperComments.slides;
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

slidesOriginal.forEach((slideOriginal) => {
	slideOriginal.classList.add("transitioned");
})

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
			closeComment(slide, initializeCommentIn);
		} else{
			initializeComment(slide);
		}
		
		slide.button.classList.remove("opened");
	});
}