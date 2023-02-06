import { setSlidesState } from "./swiperHelpers.js";
import Swiper from "./swiper-bundle.8.4.5.esm.browser.min.js";

const slides = document.querySelectorAll(".comments_card_container");
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
	on: {
		slideChange: setSlidesState,
	}
});

setSlidesState.call(swiperComments);

unwrapCommentsButtons();
changeUnwrapBtnVisibility();
closeCommentsOnResize();
addInitClientHeigh();

function unwrapCommentsButtons(){

	slides.forEach(slide => {
		const cardBtn = slide.querySelector(".card_unwrap_btn");

		cardBtn.addEventListener("click", function(){
			openComment(slide);
		})
	});
}

function openComment(slide){
	const cardText = slide.querySelector(".card_text");

	if(!slide.classList.contains("open")){
		cardText.style.height = cardText.scrollHeight + "px";
		slide.classList.add("open");
	} 
	else {
		closeComment(slide);
	}
}

function closeComment(slide){
	const cardText = slide.querySelector(".card_text");
	
	cardText.style.height = "";
	slide.classList.remove("open");
}

function closeAllComments(){
	slides.forEach(slide => {
		const cardText = slide.querySelector(".card_text");

		cardText.style.height = "";
		slide.classList.remove("open");
	});
}

function addInitClientHeigh(){

	slides.forEach(slide => {
		const cardText = slide.querySelector(".card_text");
		cardText.dataset.initClientHeight = cardText.clientHeight;
	});
}

function changeUnwrapBtnVisibility(){
	
	setTimeout(changeBtnVisibility, BTN_APPEARANCE_DELAY);

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

	slides.forEach(slide => {
		const cardText = slide.querySelector(".card_text");

		if(cardText.scrollHeight > cardText.dataset.initClientHeight){
			slide.classList.add("active");
		}
		else{
			slide.classList.remove("active");
		}
	});
}

function closeCommentsOnResize(){

	let isThrottled = false;

	window.addEventListener("resize", ()=>{
		if(isThrottled) return;

		isThrottled = true;
		setTimeout(()=>{
			closeAllComments();
			changeUnwrapBtnVisibility();
			isThrottled = false;
		}, RESIZE_DELAY);
	});
}
