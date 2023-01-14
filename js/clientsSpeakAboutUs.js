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
		// autoplay: {
		// 	delay: 2500,
		// 	disableOnInteraction: false,
		// 	pauseOnMouseEnter: true,
		// 	reverseDirection: false,
		// },
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
	
	let viewportWidth = window.innerWidth;
	const screenResolution = 1920;

	changeButtonAppearance(swiperComments);
	swiperComments.on("slideChange", changeButtonAppearance);

	if(viewportWidth >= screenResolution){
		for(let slide of swiperComments.slides){
			slide.classList.add("activeSlides");
		}
		setSlidesState(swiperComments, "activeSlides");
		
		swiperComments.on("slideChange", function(){
			setSlidesState(swiperComments, "activeSlides");
			closeComments();
		});
	}
	// swiperComments.on("reachBeginning", function(){
	// 	swiperComments.params.autoplay.reverseDirection = !swiperComments.params.autoplay.reverseDirection;
	// });
	// swiperComments.on("reachEnd", function(){
	// 	swiperComments.params.autoplay.reverseDirection = !swiperComments.params.autoplay.reverseDirection;
	// })
})();


(function unwrapCommentsButtons(){
	
	const btns = document.querySelectorAll(".card__detailed_container");

	for(let btn of btns){
		btn.addEventListener("click", function(){
			closeComments();
			openComment(btn);
		})
	}

	function openComment(button){
		const comment = button.previousElementSibling;
		const commentHeight = defineNodeHeight(comment);

		if(!comment.classList.contains("open")){
			document.documentElement.style.setProperty('--height', `${commentHeight}px`);
			comment.classList.add("open");
			button.classList.add("open");
		}
	}
})()

function closeComments(){
	const comments = document.querySelectorAll(".card__text.open");
	if(comments.length === 0) return;

	for(let comment of comments){

		setTimeout(() => {
			comment.classList.remove("open");
			document.documentElement.style.setProperty('--height', "");
			comment.nextElementSibling.classList.remove("open");
		}, 0);
	}
}

(function changeUnwrapBtnVisibility(){
	window.addEventListener("load", function(){

		const timeout = 1000;

		setTimeout(()=>{

			const textContainers = document.querySelectorAll(".card__text");
			const resolution = window.innerWidth;
			
			if(textContainers.length == 0) return;

			for(let container of textContainers){

				const textNode = container.firstChild;
				const textNodeHeight = defineNodeHeight(textNode);
				const lineHeightInPx = getComputedStyle(container).lineHeight;
				const lineHeight = lineHeightInPx.replace(/px/ig, "");
				const quantityOfLines = Math.ceil(textNodeHeight / lineHeight);
				
				if(resolution < 480 && quantityOfLines > 5){
					container.nextElementSibling.classList.add("calculated");
				}
				if(resolution >= 480 && resolution < 1000 && quantityOfLines > 4){
					container.nextElementSibling.classList.add("calculated");
				}
				if(resolution >= 1000 && quantityOfLines > 3){
					container.nextElementSibling.classList.add("calculated");
				}
			}
		}, timeout);
	})
})()

function defineNodeHeight(textNode){

	const range = document.createRange();
	range.selectNodeContents(textNode);
	const textNodeHeight = range.getBoundingClientRect().height;
	return textNodeHeight + 5;
}