import { navigationButtonAppearance, setSlidesState } from "./swiperGlobalFunctionality.js";

export default function initializeClientsSpeakAboutUsSlider(){

	const swiperComments = new Swiper(".swiper-container-2", {

		navigation: {
			nextEl: '.swiper_btn_next_2',
			prevEl: '.swiper_btn_prev_2',
		},
		scrollbar: {
			el: ".swiper_scrollbar_2",
			draggable: true,
		},
		breakpoints: {
			320: {
				slidesPerView: 1,
				slidesPerGroup: 1,
				spaceBetween: 10,
			},
			768: {
				slidesPerView: 2,
				spaceBetween: 10,
			},
			1000: {
				slidesPerView: 2,
				spaceBetween: 10,
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
	swiperComments.on("slideChange", navigationButtonAppearance);
	swiperComments.on("slideChange", closeComments);

	navigationButtonAppearance(swiperComments);

	const slideStateHandler = function(){
		setSlidesState(swiperComments, "activeSlides");
	}

	const mqlLess1920 = window.matchMedia("(max-width: 1919px)");
	mqlLess1920.addEventListener("change", function(){

		if(mqlLess1920.matches){
			swiperComments.off("slideChange", slideStateHandler);

			swiperComments.slides.forEach(slide => {
				slide.classList.remove("activeSlides");
			});
			navigationButtonAppearance(swiperComments);
		}
	})

	const mqlOver1920 = window.matchMedia("(min-width: 1920px)");
	if(mqlOver1920.matches){
		slideStateHandler();
		swiperComments.on("slideChange", slideStateHandler);
	}

	mqlOver1920.addEventListener("change", function(){

		if(mqlOver1920.matches){
			swiperComments.on("slideChange", slideStateHandler);
			navigationButtonAppearance(swiperComments);
		}
	})
}

unwrapCommentsButtons();
changeUnwrapBtnVisibility();
closeCommentsOnResize();

function unwrapCommentsButtons(){

	const slides = document.querySelectorAll(".feedbacks__card_container");

	slides.forEach(slide => {
		const cardBtn = slide.querySelector(".card__unwrap_btn");

		cardBtn.addEventListener("click", function(){
			openComment(slide);
		})
	});
}

function openComment(slide){
	const cardText = slide.querySelector(".card__text");
	const cardBtn = slide.querySelector(".card__unwrap_btn");
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

	const slides = document.querySelectorAll(".feedbacks__card_container");
	if(slides.length === 0) return;

	slides.forEach(slide => {
		if(slide === slideNotToClose) return;
		
		const cardText = slide.querySelector(".card__text.open");
		const cardBtn = slide.querySelector(".card__unwrap_btn.open");

		if(!cardText || !cardBtn) return;

		cardText.classList.remove("open");
		cardBtn.classList.remove("open");

	});
}

function changeUnwrapBtnVisibility(){

	const btnAppearanceDelay = 1000;
	setTimeout(()=>{
		changeBtnVisibility();
	}, btnAppearanceDelay);

	const delay = 250;
	let isThrottled = false;
	window.addEventListener("resize", ()=>{
		if(isThrottled) return;

		isThrottled = true;
		setTimeout(()=>{
			changeBtnVisibility();
			isThrottled = false;
		}, delay);
	});

	function changeBtnVisibility(){

		const slides = document.querySelectorAll(".feedbacks__card_container");
		if(slides.length === 0) return;

		slides.forEach(slide => {
			const cardText = slide.querySelector(".card__text");
			const cardBtn = slide.querySelector(".card__unwrap_btn");

			if(cardText.scrollHeight > cardText.clientHeight){
				cardBtn.classList.add("calculated");
			}
			else{
				cardBtn.classList.remove("calculated");
			}
		});
	}
}

function closeCommentsOnResize(){
	const delay = 250;
	let isThrottled = false;

	window.addEventListener("resize", ()=>{
		if(isThrottled) return;

		isThrottled = true;
		setTimeout(()=>{
			closeComments();
			isThrottled = false;
		}, delay);
	});
}
