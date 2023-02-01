const menuOverlay = document.body.querySelector(".menu_overlay");
const burgerBtn = document.body.querySelector(".menu_burger");
const menuCloseBtn = menuOverlay.querySelector(".menu_close_btn");
const menuBody = menuOverlay.querySelector(".menu_body");

burgerBtn.addEventListener("click", function(){

	menuOverlay.classList.add("active");
	menuBody.classList.add("active");
	document.body.classList.add("stopPageScroll");
});

menuCloseBtn.addEventListener("click", function(){

	menuOverlay.classList.remove("active");
	menuBody.classList.remove("active");
	document.body.classList.remove("stopPageScroll");
})