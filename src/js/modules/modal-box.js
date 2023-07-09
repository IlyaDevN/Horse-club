const modals = document.querySelectorAll(".modal-overlay");
const modalGratitude = document.getElementById("modal-gratitude");
const forms = Array.from(document.forms);
let activeModal = null;

forms.forEach((form) => form.addEventListener("submitSuccess", openGratitude));

modals.forEach((modal) => {
	const openButtons = document.querySelectorAll(`[data-modal-link="${modal.id}"]`);
	const closeButtons = modal.querySelectorAll(".modal-close-button");

	openButtons.forEach((button) => button.addEventListener("click", () => openModal(modal)));
	closeButtons.forEach((button) => button.addEventListener(("click"), () => closeModal(modal)));

	modal.addEventListener("click", closeByOverlay);
	modal.addEventListener("cancel", closeModal);
})

function openModal(modal, isGratitude = false) {
	activeModal = modal;
	
	activeModal.showModal();

	if (isGratitude) {
		activeModal.querySelector(".gratitude").classList.add("open");
	} else {
		activeModal.querySelector(".modal-content").classList.add("open");
	}

	disablePageScroll();
}

function closeModal() {
	const content = activeModal.querySelector(".modal-content");
	const gratitude = activeModal.querySelector(".gratitude");

	if (content) {
		content.classList.remove("open");
	}
	if (gratitude) {
		gratitude.classList.remove("open");
	}

	activeModal.close();
	activeModal.addEventListener("transitionend", enablePageScroll, { once: true });
	activeModal = null;
}

function openGratitude() {
	if (activeModal) {
		activeModal.querySelector(".modal-content").classList.remove("open");
		activeModal.querySelector(".gratitude").classList.add("open");
	} else {
		openModal(modalGratitude, true);
	}
}

function closeByOverlay(event) {
	if (event.target === activeModal) {
		closeModal();
	}
}

function disablePageScroll() {
	const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
	document.body.classList.add("stopPageScroll");
	document.documentElement.style.setProperty("--width-of-scrollbar", scrollBarWidth + "px");
}

function enablePageScroll() {
	document.body.classList.remove("stopPageScroll");
	document.documentElement.style.setProperty("--width-of-scrollbar", 0);
}