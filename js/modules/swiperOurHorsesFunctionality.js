import { setSlidesState } from "./swiperHelpers.js";
import { switchSlidesStateHandlerOn1920px } from "./swiperHelpers.js";
import Swiper from "./swiper-bundle.8.4.5.esm.browser.min.js";

const swiper = new Swiper(".our_horses_swiper_container", {
	navigation: {
		nextEl: '.swiper_btn_next_1',
		prevEl: '.swiper_btn_prev_1',
	},
	scrollbar: {
		el: ".swiper_scrollbar_1",
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
			slidesPerView: 3,
			spaceBetween: 20,
		},
		1920: {
			slidesPerView: 5,
			spaceBetween: 30,
		}
	},
	speed: 1000,
	on: {
		slideChange: setSlidesState,
	}
});

setSlidesState(swiper);
switchSlidesStateHandlerOn1920px(swiper);