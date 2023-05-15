const popupLinks = document.querySelectorAll(".popup-link");
const modalOverlay = document.querySelector(".modal-overlay");
const modalContent = modalOverlay.querySelector(".modal-content");
const gratitude = modalOverlay.querySelector(".modal-gratitude");
const closeBtns = modalOverlay.querySelectorAll(".modal-close-button");
const forms = document.forms;
const KEYCODE = {
	ESC: "Escape"
};

for (let form of forms) {
	form.addEventListener("submitSuccess", submitHandler);
}
modalOverlay.addEventListener("click", emptyPlaceCloseHandler);
closeBtns.forEach((button) => button.addEventListener("click", popupsClose));
popupLinks.forEach((popupLink) => popupLink.addEventListener("click", popupOpen));

function popupOpen() {
	modalOverlay.classList.add("open");
	modalContent.classList.add("open");
	disablePageScroll();
	document.addEventListener("keydown", keyDownHandler);
}

function emptyPlaceCloseHandler(event) {
	if (event.target === modalOverlay) {
		popupsClose();
	}
}

function keyDownHandler(event) {
	if (event.code === KEYCODE.ESC) {
		popupsClose();
	}
}

function submitHandler() {
	modalContent.classList.remove("open");
	if (!modalOverlay.classList.contains("open")) {
		modalOverlay.classList.add("open");
	}
	gratitude.classList.add("open");
	document.addEventListener("keydown", keyDownHandler);
}

function popupsClose() {
	modalOverlay.classList.remove("open");
	document.removeEventListener("keydown", keyDownHandler);
	modalOverlay.addEventListener("transitionend", enablePageScroll, { once: true });
	modalContent.classList.remove("open");
	gratitude.classList.remove("open");
}

function disablePageScroll() {
	const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

	document.body.classList.add("stopPageScroll");
	document.body.style.paddingRight = scrollBarWidth + "px";
}

function enablePageScroll() {
	document.body.classList.remove("stopPageScroll");
	document.body.style.paddingRight = "";
}