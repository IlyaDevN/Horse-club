import { setSlidesState } from "./swiperHelpers.js";
import { switchSlidesStateHandlerOn1920px } from "./swiperHelpers.js";
import Swiper from "./swiper-bundle.8.4.5.esm.browser.min.js";

const swiper = new Swiper(".our_horses_swiper_container", {
	navigation: {
		nextEl: '.swiper_button_next_ourHorses',
		prevEl: '.swiper_button_prev_ourHorses',
	},
	scrollbar: {
		el: ".swiper_scrollbar_1",
		draggable: true,
	},
	slidesPerView: "auto",
	slidesPerGroup: 1,
	spaceBetween: 10,
	breakpoints: {
		768: {
			spaceBetween: 20,
			slidesPerView: "auto",
		},
		1920: {
			slidesPerView: 3,
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