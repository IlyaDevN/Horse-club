import { setSlidesState } from "./swiperHelpers.js";
import { updateSwiperOnMediaQuery } from "./swiperHelpers.js";
import { mql1920 } from "./mediaQueries.js";
import Swiper, { Navigation, Pagination, Scrollbar } from 'swiper';

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

let ourHorsesObserver = new IntersectionObserver(([entry], observer)=>{
	if(entry.isIntersecting) {
		removeLazyLoading();
		observer.unobserve(entry.target);
	}
});

ourHorsesObserver.observe(document.querySelector(".our-horses"));

function removeLazyLoading() {
	let photos = document.querySelectorAll('.image-horse');

	photos.forEach((photo)=> {
		photo.setAttribute("loading", "eager");
	})
}