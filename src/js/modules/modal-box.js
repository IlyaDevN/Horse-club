export let scrollBarWidth = null;

const modals = document.querySelectorAll(".modal-overlay");
const modalGratitude = document.getElementById("modal-gratitude");
const forms = Array.from(document.forms);
const KEYCODE = {
	ESC: "Escape"
};
let activeModal = null;

forms.forEach((form) => form.addEventListener("submitSuccess", openGratitude));

modals.forEach((modal) => {
	const openButtons = document.querySelectorAll(`[data-modal-link="${modal.id}"]`);
	const closeButtons = modal.querySelectorAll(".modal-close-button");

	openButtons.forEach((button) => button.addEventListener("click", () => openModal(modal)));
	closeButtons.forEach((button) => button.addEventListener(("click"), () => closeModal(modal)));

	modal.addEventListener("click", closeByOverlay);
})

function openModal(modal, isGratitude = false) {
	modal.classList.add("open");

	if(isGratitude) {
		modal.querySelector(".gratitude").classList.add("open");
	} else {
		modal.querySelector(".modal-content").classList.add("open");
	}

	activeModal = modal;
	disablePageScroll();
	document.addEventListener("keydown", closeByEscape);
}

function closeModal(modal) {
	const content = modal.querySelector(".modal-content");
	const gratitude = modal.querySelector(".gratitude");

	if(content){
		content.classList.remove("open");
	}
	if(gratitude){
		gratitude.classList.remove("open");
	}

	modal.classList.remove("open");
	document.removeEventListener("keydown", closeByEscape);
	activeModal = null;
	modal.addEventListener("transitionend", enablePageScroll, { once: true });
}

function openGratitude() {
	if(activeModal) {
		activeModal.querySelector(".modal-content").classList.remove("open");
		activeModal.querySelector(".gratitude").classList.add("open");
	} else {
		openModal(modalGratitude, true);
	}
}

function closeByEscape(event){
	if (event.code === KEYCODE.ESC) {
		closeModal(activeModal);
	}
}

function closeByOverlay(event){
	const modal = this;
	if(event.target === modal){
		closeModal(modal);
	}
}

function disablePageScroll() {
	scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
	document.body.classList.add("stopPageScroll");
	document.body.style.paddingRight = scrollBarWidth + "px";
}

function enablePageScroll() {
	document.body.classList.remove("stopPageScroll");
	document.body.style.paddingRight = "";
}