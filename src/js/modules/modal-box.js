const popupLinks = document.querySelectorAll(".popup-link");
const modalOverlays = document.querySelectorAll(".modal-overlay");
const forms = document.forms;
const KEYCODE = {
	ESC: "Escape"
};
let modalOverlay;
let modalContent;
let gratitude;
let closeBtns;
let currentBtn;

popupLinks.forEach((popupLink) => popupLink.addEventListener("click", popupOpen));

for (let form of forms) {
	form.addEventListener("submitSuccess", submitHandler);
}
for (let overlay of modalOverlays) {
	overlay.addEventListener("click", emptyPlaceCloseHandler);
}

function defineModal(event) {
	if (event.target.tagName == "FORM") {
		currentBtn = event.target.querySelector("button");
	} else {
		currentBtn = event.target.closest("button");
	}

	modalOverlay = document.querySelector(currentBtn.getAttribute("href"));
	modalContent = modalOverlay.querySelector(".modal-content");
	gratitude = modalOverlay.querySelector(".gratitude");
	closeBtns = modalOverlay.querySelectorAll(".modal-close-button");
	closeBtns.forEach((button) => button.addEventListener("click", popupsClose));
}

function popupOpen(event) {
	defineModal(event);
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

function submitHandler(event) {
	if (!modalOverlay) {
		defineModal(event);
	}
	if (modalContent.classList.contains("open")) {
		modalContent.classList.remove("open");
	}

	if (!modalOverlay.classList.contains("open")) {
		modalOverlay.classList.add("open");
	}
	if (gratitude) {
		gratitude.classList.add("open");
	}
	document.addEventListener("keydown", keyDownHandler);
}

function popupsClose() {
	modalOverlay.classList.remove("open");
	document.removeEventListener("keydown", keyDownHandler);
	modalOverlay.addEventListener("transitionend", enablePageScroll, { once: true });
	modalContent.classList.remove("open");
	if (gratitude) {
		gratitude.classList.remove("open");
	}
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