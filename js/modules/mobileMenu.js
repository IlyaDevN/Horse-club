const menuOverlay = document.body.querySelector(".menu-overlay");
const burgerBtn = document.body.querySelector(".menu-burger-button");
const menuCloseBtn = menuOverlay.querySelector(".menu__close-button");

burgerBtn.addEventListener("click", openMenu);
menuOverlay.addEventListener("click", closeMenuByOverlay);
menuCloseBtn.addEventListener("click", closeMenu);

function openMenu() {
	menuOverlay.classList.add("active");
	document.body.classList.add("stopPageScroll");
}

function closeMenuByOverlay(event) {
	if (event.target === menuOverlay) {
		closeMenu();
	}
}

function closeMenu() {
	menuOverlay.classList.remove("active");
	document.body.classList.remove("stopPageScroll");
}