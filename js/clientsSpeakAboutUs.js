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
		autoplay: {
			delay: 2500,
			disableOnInteraction: false,
			pauseOnMouseEnter: true,
			reverseDirection: false,
		},
		breakpoints: {
			320: {
				slidesPerView: 1,
				slidesPerGroup: 1,
				spaceBetween: 10,
			},
			480: {
				slidesPerView: 1,
				slidesPerGroup: 1,
				spaceBetween: 10,
			}, 
			768: {
				slidesPerView: 2,
				slidesPerGroup: 1,
				spaceBetween: 10,
			},
			1920: {
				slidesPerView: 4,
				spaceBetween: 15,
				slidesPerGroup: 1
			}
		},
		speed: 1000,
	})
	swiperComments.on("reachBeginning", function(){
		swiperComments.params.autoplay.reverseDirection = !swiperComments.params.autoplay.reverseDirection;
	});
	swiperComments.on("reachEnd", function(){
		swiperComments.params.autoplay.reverseDirection = !swiperComments.params.autoplay.reverseDirection;
	})
	let viewportWidth = window.innerWidth;
	const screenResolution = 1920;
	
	if(viewportWidth >= screenResolution){
		for(let slide of swiperComments.slides){
			slide.classList.add("activeSlides");
		}
		setSlidesState(swiperComments, "activeSlides");
		
		swiperComments.on("slideChange", function(){
			setSlidesState(swiperComments, "activeSlides");
		});
	}
	
})();