const burgerBtn = document.getElementById("menu_burger");
const nav = document.getElementById("nav__menu_header");
const movingFrame = document.getElementById("moving_frame");
const modalCloseBtn = document.getElementById("modal_close_btn");
const modal = document.getElementById("modal");

if(window.innerWidth < 768){
	
	burgerBtn.addEventListener("click", function(){

		modal.classList.add("modal_showed");
		document.body.classList.add("body_modal");
		
		movingFrame.append(nav);
	});

	modalCloseBtn.addEventListener("click", function(){

		modal.classList.remove("modal_showed");
		document.body.classList.remove("body_modal");
	})
}