const menuOverlay = document.body.querySelector(".menu_overlay");
const burgerBtn = document.body.querySelector(".menu_burger");
const menuCloseBtn = menuOverlay.querySelector(".menu_close_btn");

burgerBtn.addEventListener("click", openMenu);

function openMenu(){
	menuOverlay.classList.add("active");
	document.body.classList.add("stopPageScroll");
	document.addEventListener("click", closeMenu);
}

function closeMenu(event){
	if(event.target === menuOverlay || event.target.offsetParent === menuCloseBtn){
		menuOverlay.classList.remove("active");
		document.body.classList.remove("stopPageScroll");
		document.removeEventListener("click", closeMenu);
	}
}