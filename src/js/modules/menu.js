const menuOverlay = document.body.querySelector(".header__menu-overlay");
const burgerBtn = document.body.querySelector(".header__menu-burger-button");
const menuCloseBtn = menuOverlay.querySelector(".menu__close-button");
const headerMenu = document.querySelector(".header__menu");
const anchors = document.querySelectorAll("a[href*='#']");

burgerBtn.addEventListener("click", openMenu);
menuOverlay.addEventListener("click", closeMenuByOverlay);
menuCloseBtn.addEventListener("click", closeMenu);

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

function scrollToSection(anchor) {
	const blockID = anchor.getAttribute("href").slice(1);
	document.getElementById(`${blockID}`).scrollIntoView({
		behavior: "smooth",
		block: "start"
	})
}