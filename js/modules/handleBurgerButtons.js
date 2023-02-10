const menuOverlay = document.body.querySelector(".menu_overlay");
const burgerBtn = document.body.querySelector(".menu_burger");
const menuCloseBtn = menuOverlay.querySelector(".menu_close_button");

burgerBtn.addEventListener("click", openMenu);
menuOverlay.addEventListener("click", closeMenuByOverlay);
menuCloseBtn.addEventListener("click", closeMenu);

function openMenu(){
	menuOverlay.classList.add("active");
	document.body.classList.add("stopPageScroll");
}

function closeMenuByOverlay(event){
	if(event.target === menuOverlay) {
		closeMenu();
	}
}

function closeMenu(){
	menuOverlay.classList.remove("active");
	document.body.classList.remove("stopPageScroll");
}