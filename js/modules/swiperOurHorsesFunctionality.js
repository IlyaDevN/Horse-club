import { setSlidesState } from "./swiperHelpers.js";
import { updateSwiperOnMediaQuery } from "./swiperHelpers.js";
import { mql1920 } from "./mediaQueries.js";
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
	pagination: {
		el: ".swiper_pagination_ourHorses",
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
		1920: {
			slidesPerView: 3,
			spaceBetween: 30,
		}
	},
	on: {
		slideChange: setSlidesState,
	}
});

updateSwiperOnMediaQuery(swiper, mql1920);
mql1920.addEventListener("change", () => updateSwiperOnMediaQuery(swiper, mql1920));