import { setSlidesState } from "./swiperHelpers.js";
import Swiper from "./swiper-bundle.8.4.5.esm.browser.min.js";

const swiper = new Swiper(".swiper-container-1", {
	navigation: {
		nextEl: '.swiper_btn_next_1',
		prevEl: '.swiper_btn_prev_1',
	},
	scrollbar: {
		el: ".swiper_scrollbar_1",
		draggable: true,
	},
	breakpoints: {
		320: {
			slidesPerView: 1,
			slidesPerGroup: 1,
			spaceBetween: 10,
		},
		480: {
			slidesPerView: 2,
			slidesPerGroup: 1,
			spaceBetween: 10,

		}, 
		768: {
			slidesPerView: 3,
			slidesPerGroup: 1,
			spaceBetween: 20,
		},
		1920: {
			slidesPerView: 5,
			slidesPerGroup: 1,
			spaceBetween: 30,
		}
	},
	speed: 1000,
});

const slideStateHandler = function(){
	setSlidesState(swiper, "activeSlides");
}

const mqlOver1920 = window.matchMedia("(min-width: 1920px)");
if(mqlOver1920.matches){
	slideStateHandler();
	swiper.on("slideChange", slideStateHandler);
}

mqlOver1920.addEventListener("change", function(){

	if(mqlOver1920.matches){
		swiper.on("slideChange", slideStateHandler);
	}
	if(!mqlOver1920.matches){
		swiper.off("slideChange", slideStateHandler);

		swiper.slides.forEach(slide => {
			slide.classList.remove("activeSlides");
		});
	}
})