(function initializeOurHorsesSlider(){

	const swiper = new Swiper(".swiper-container-1", {
		navigation: {
			nextEl: '.swiper_btn_next_1',
			prevEl: '.swiper_btn_prev_1',
		},
		scrollbar: {
			el: ".swiper_scrollbar_1",
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
				slidesPerView: 2,
				spaceBetween: 10,
				slidesPerGroup: 2,
			}, 
			768: {
				slidesPerView: 3,
				spaceBetween: 20,
				slidesPerGroup: 1,
			},
			1920: {
				slidesPerView: 5,
				spaceBetween: 30,
				slidesPerGroup: 1
			}
		},
		speed: 1000,
	});

	let viewportWidth = window.innerWidth;
	const screenResolution = 1920;

	if(viewportWidth >= screenResolution){
		for(let slide of swiper.slides){
			slide.classList.add("activeSlides");
		}
		setSlidesState(swiper, "activeSlides");
		
		swiper.on("slideChange", function(){
			setSlidesState(swiper, "activeSlides");
		});
	}
	swiper.on("reachBeginning", function(){
		swiper.params.autoplay.reverseDirection = !swiper.params.autoplay.reverseDirection;
	});
	swiper.on("reachEnd", function(){
		swiper.params.autoplay.reverseDirection = !swiper.params.autoplay.reverseDirection;
	})

})();