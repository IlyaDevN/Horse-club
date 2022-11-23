(function burger (){

	const burgerBtn = document.getElementById("menu_burger");
	const nav = document.getElementById("nav__menu_header");
	const movingFrame = document.getElementById("moving_frame");
	const modalCloseBtn = document.getElementById("modal_close_btn");
	const modal = document.getElementById("modal");
	const tabletInnerWidth = 768;

	modal.style.transform = `translateX(-${window.innerWidth}px)`;

	window.addEventListener("resize", function(){
		modal.style.transform = `translateX(-${window.innerWidth}px)`;
	})

	if(window.innerWidth < tabletInnerWidth){
		
		burgerBtn.addEventListener("click", function(){

			modal.classList.add("modal_showed");
			document.body.classList.add("body_modal");
			modal.style.transform = `translateX(0)`;
		});

		modalCloseBtn.addEventListener("click", function(){

			modal.classList.remove("modal_showed");
			document.body.classList.remove("body_modal");
			modal.style.transform = `translateX(-${window.innerWidth}px)`;
		})
	}

})()