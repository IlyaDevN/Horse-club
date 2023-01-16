(function initializeClientsSpeakAboutUsSlider(){

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
			1920: {
				slidesPerView: 4,
				spaceBetween: 15,
			}
		},
		speed: 1000,
	})

	changeButtonAppearance(swiperComments);
	swiperComments.on("slideChange", changeButtonAppearance);
	swiperComments.on("slideChange", closeComments);

	if(window.matchMedia("(min-width: 1000px)").matches){
		swiperComments.allowTouchMove = false;
	}
	if(window.matchMedia("(min-width: 1920px)").matches){
		for(let slide of swiperComments.slides){
			slide.classList.add("activeSlides");
		}
		setSlidesState(swiperComments, "activeSlides");
		
		swiperComments.on("slideChange", function(){
			setSlidesState(swiperComments, "activeSlides");
		});
	}
})();

(function unwrapCommentsButtons(){

	const slides = document.querySelectorAll(".feedbacks__card_container");

	slides.forEach(slide => {
		const cardBtn = slide.querySelector(".card__unwrap_btn");

		cardBtn.addEventListener("click", function(){
			openComment(slide);
		})
	});
})()

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

(function changeUnwrapBtnVisibility(){
	window.addEventListener("load", function(){
		const timeout = 1000;

		setTimeout(()=>{

			const slides = document.querySelectorAll(".feedbacks__card_container");
			if(slides.length === 0) return;

			slides.forEach(slide => {
				const cardText = slide.querySelector(".card__text");
				const cardBtn = slide.querySelector(".card__unwrap_btn");
				if(cardText.scrollHeight > cardText.clientHeight){
					cardBtn.classList.add("calculated");
				}
			});

		}, timeout);
	})
})()
