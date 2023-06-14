import { closeMenu } from './mobileMenu.js';

const anchors = Array.from(document.querySelectorAll("a[href*='#']"));

anchors.forEach((anchor) => {
	anchor.addEventListener("click", (event) => {
		event.preventDefault();
		closeMobileMenu();
		const blockID = anchor.getAttribute("href");
		document.querySelector(`${blockID}`).scrollIntoView({
			behavior: "smooth",
			block: "start"
		})
	})
})

function closeMobileMenu() {
	const menuOverlay = document.body.querySelector(".header__menu-overlay");
	if (menuOverlay.classList.contains("active")) {
		closeMenu();
	}
}