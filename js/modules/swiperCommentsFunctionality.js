import { setSlidesState } from "./swiperHelpers.js";
import Swiper from "./swiper-bundle.8.4.5.esm.browser.min.js";

const BTN_APPEARANCE_DELAY = 1000;
const RESIZE_DELAY = 250;

const swiperComments = new Swiper(".comments_slider_container", {

	navigation: {
		nextEl: '.swiper_btn_next_2',
		prevEl: '.swiper_btn_prev_2',
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

});
swiperComments.on("slideChange", closeComments);

const slideStateHandler = function(){
	setSlidesState(swiperComments, "activeSlides");
}

const mqlOver1920 = window.matchMedia("(min-width: 1920px)");
if(mqlOver1920.matches){
	slideStateHandler();
	swiperComments.on("slideChange", slideStateHandler);
}

mqlOver1920.addEventListener("change", function(){

	if(mqlOver1920.matches){
		swiperComments.on("slideChange", slideStateHandler);
	}
	if(!mqlOver1920.matches){
		swiperComments.off("slideChange", slideStateHandler);

		swiperComments.slides.forEach(slide => {
			slide.classList.remove("activeSlides");
		});
	}
})

unwrapCommentsButtons();
changeUnwrapBtnVisibility();
closeCommentsOnResize();

function unwrapCommentsButtons(){

	const slides = document.querySelectorAll(".comments_card_container");

	slides.forEach(slide => {
		const cardBtn = slide.querySelector(".card_unwrap_btn");

		cardBtn.addEventListener("click", function(){
			openComment(slide);
		})
	});
}

function openComment(slide){
	const cardText = slide.querySelector(".card_text");
	const cardBtn = slide.querySelector(".card_unwrap_btn");
	const cardTextHeight = cardText.scrollHeight;

	closeComments(slide);

	if(!cardText.classList.contains("open")){
		document.documentElement.style.setProperty('--cardText-height', `${cardTextHeight}px`);
		cardText.classList.add("open");
		cardBtn.classList.add("open");
	} 
	else {
		closeComments();
	}
}

function closeComments(slideNotToClose){

	const slides = document.querySelectorAll(".comments_card_container");

	slides.forEach(slide => {
		if(slide === slideNotToClose) return;
		
		const cardText = slide.querySelector(".card_text.open");
		const cardBtn = slide.querySelector(".card_unwrap_btn.open");

		if(!cardText || !cardBtn) return;

		cardText.classList.remove("open");
		cardBtn.classList.remove("open");

	});
}

function changeUnwrapBtnVisibility(){
	
	setTimeout(()=>{
		changeBtnVisibility();
	}, BTN_APPEARANCE_DELAY);

	let isThrottled = false;
	window.addEventListener("resize", ()=>{
		if(isThrottled) return;

		isThrottled = true;
		setTimeout(()=>{
			changeBtnVisibility();
			isThrottled = false;
		}, RESIZE_DELAY);
	});
}

function changeBtnVisibility(){

	const slides = document.querySelectorAll(".comments_card_container");

	slides.forEach(slide => {
		const cardText = slide.querySelector(".card_text");
		const cardBtn = slide.querySelector(".card_unwrap_btn");

		if(cardText.scrollHeight > cardText.clientHeight){
			cardBtn.classList.add("calculated");
		}
		else{
			cardBtn.classList.remove("calculated");
		}
	});
}

function closeCommentsOnResize(){

	let isThrottled = false;

	window.addEventListener("resize", ()=>{
		if(isThrottled) return;

		isThrottled = true;
		setTimeout(()=>{
			closeComments();
			isThrottled = false;
		}, RESIZE_DELAY);
	});
}
