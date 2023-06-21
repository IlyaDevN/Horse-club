import { closeMenu } from './mobileMenu.js';

const anchors = document.querySelectorAll("a[href*='#']");
const menuOverlay = document.body.querySelector(".header__menu-overlay");
const headerMenu = document.querySelector(".header__menu");

anchors.forEach((anchor) => {
	anchor.addEventListener("click", (event) => {
		event.preventDefault();
		if(menuOverlay.classList.contains("active")) {
			headerMenu.addEventListener("transitionend", () => scrollToSection(anchor), {once:true});
			closeMenu();
		} else {
			scrollToSection(anchor);
		}
	})
})

function scrollToSection(anchor) {
	const blockID = anchor.getAttribute("href");
	document.querySelector(`${blockID}`).scrollIntoView({
		behavior: "smooth",
		block: "start"
	})
}