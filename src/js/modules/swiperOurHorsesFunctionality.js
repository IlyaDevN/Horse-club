import { setSlidesState, loadAllSliderImages, updateSwiperOnMediaQuery } from "./swiperHelpers.js";
import { mql1920 } from "./mediaQueries.js";
import Swiper from 'swiper';
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';

const swiper = new Swiper(".our-horses__swiper-container", {
	modules: [Navigation, Pagination, Scrollbar],
	navigation: {
		nextEl: '.our-horses__button-next',
		prevEl: '.our-horses__button-prev',
	},
	scrollbar: {
		el: ".our-horses__swiper-scroll-bar",
		draggable: true,
	},
	pagination: {
		el: ".swiper_pagination_ourHorses",
	},
	mousewheel: true,
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
			speed: 1000,
		}
	},
	on: {
		slideChange: setSlidesState,
	}
});

updateSwiperOnMediaQuery(swiper, mql1920);
mql1920.addEventListener("change", () => updateSwiperOnMediaQuery(swiper, mql1920));

loadAllSliderImages(".our-horses");