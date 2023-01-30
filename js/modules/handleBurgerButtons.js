const menuOverlay = document.body.querySelector(".menu_overlay");
const burgerBtn = document.body.querySelector(".menu_burger");
const menuCloseBtn = menuOverlay.querySelector(".menu_close_btn");
const menuBody = menuOverlay.querySelector(".menu_body");
const body = document.body;

burgerBtn.addEventListener("click", function(){

	menuOverlay.style.visibility = "visible";
	menuBody.style.transform = `translateX(0%)`;
	body.style.overflowY = "hidden";
});

menuCloseBtn.addEventListener("click", function(){

	menuOverlay.style.visibility = "hidden";
	menuBody.style.transform = `translateX(-100%)`;
	body.style.overflowY = "";
})