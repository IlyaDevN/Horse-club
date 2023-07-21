import { mql768 } from "./mediaQueries.js";
const menuOverlay = document.body.querySelector(".header__menu-overlay");
const burgerBtn = document.body.querySelector(".header__menu-burger-button");
const menuCloseBtn = menuOverlay.querySelector(".menu__close-button");
const headerMenu = document.querySelector(".header__menu");
const anchors = document.querySelectorAll(".nav__link, .nav__link-footer");

burgerBtn.addEventListener("click", openMenu);
menuOverlay.addEventListener("click", closeMenuByOverlay);
menuCloseBtn.addEventListener("click", closeMenu);

anchors.forEach((anchor) => {
	anchor.addEventListener("click", (event) => {
		event.preventDefault();
		if(menuOverlay.hasAttribute("open")) {
			headerMenu.addEventListener("transitionend", () => scrollToSection(anchor), {once:true});
			closeMenu();
		} else {
			scrollToSection(anchor);
		}
	})
})

mql768.addEventListener("change", (event) => {
	if(event.matches) {
		closeMenu();
	}
})

function openMenu() {
	menuOverlay.showModal();
	document.body.classList.add("stopPageScroll");
}

function closeMenuByOverlay(event) {
	if (event.target === menuOverlay) {
		closeMenu();
	}
}

function closeMenu() {
	document.body.classList.remove("stopPageScroll");
	menuOverlay.close();
}

function scrollToSection(anchor) {
	const blockID = anchor.getAttribute("href").slice(1);
	document.getElementById(blockID).scrollIntoView({
		behavior: "smooth",
		block: "start"
	})
}