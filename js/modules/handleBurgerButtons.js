const menuOverlay = document.body.querySelector(".menu_overlay");
const burgerBtn = document.body.querySelector(".menu_burger");
const menuCloseBtn = menuOverlay.querySelector(".menu_close_btn");

burgerBtn.addEventListener("click", openMenu);

function openMenu(){
	menuOverlay.classList.add("active");
	document.body.classList.add("stopPageScroll");
	document.addEventListener("click", closeMenuByOverlay);
	document.addEventListener("click", closeMenuByButton);
}

function closeMenuByOverlay(event){
	if(event.target === menuOverlay) {
		closeMenu();
	}
}
function closeMenuByButton(event){
	if(event.target.offsetParent === menuCloseBtn){
		closeMenu();
	}
}

function closeMenu(){
	menuOverlay.classList.remove("active");
	document.body.classList.remove("stopPageScroll");
	document.removeEventListener("click", closeMenuByOverlay);
	document.removeEventListener("click", closeMenuByButton);
}