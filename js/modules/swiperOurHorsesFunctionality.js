import { navigationButtonAppearance, setSlidesState } from "./swiperHelpers.js";
import Swiper from "./swiper-bundle.esm.browser.min.js";

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

const viewportWidth = window.innerWidth;
const screenResolution = 1920;

navigationButtonAppearance(swiper);
swiper.on("slideChange", navigationButtonAppearance);

if(viewportWidth >= screenResolution){
	for(let slide of swiper.slides){
		slide.classList.add("activeSlides");
	}
	setSlidesState(swiper, "activeSlides");

	swiper.on("slideChange", function(){
		setSlidesState(swiper, "activeSlides");
	});
}
