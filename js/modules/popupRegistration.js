const popupLinks = document.querySelectorAll(".popup-link");
const registerModalOverlay = document.querySelector(".register__modal_overlay");
const registerModalContent = registerModalOverlay.querySelector(".register__modal_content");
const registerModalGratitude = registerModalOverlay.querySelector(".register__modal_gratitude");
const closeBtn = registerModalOverlay.querySelector(".register__close_button");
const form = registerModalOverlay.querySelector(".register__form");
const modalSubmitBtn = registerModalOverlay.querySelector(".modal_form_button");
const REOPEN_DELAY = 800;
const SHOW_TIME = 3000;
const KEYCODE = {
	ESC: "Escape"
};
let isOpen = true;
form.addEventListener("submit", submitHandler);
registerModalOverlay.addEventListener("click", emptyPlaceCloseHandler);
closeBtn.addEventListener("click", closeBtnHandler);

popupLinks.forEach( popupLink => {
	popupLink.addEventListener("click", function(){
		popupOpen();
		addButtonContent(popupLink);
	})
});

function popupOpen(){
	if(!isOpen) return;

	registerModalOverlay.classList.add("open");
	registerModalContent.classList.add("open");
	disablePageScroll();
	isOpen = false;

	document.addEventListener("keydown", keyDownHandler);

	setTimeout(() => isOpen = true, REOPEN_DELAY);
}

function emptyPlaceCloseHandler (event){
	if(event.target === registerModalOverlay){
		popupClose(registerModalContent);
	}
}

function closeBtnHandler(){
	popupClose(registerModalContent);
}

function keyDownHandler(event){
	if(event.code === KEYCODE.ESC){
		popupClose(registerModalContent);
	}
}

function submitHandler(event){
	event.preventDefault();
	registerModalContent.classList.remove("open");
	registerModalGratitude.classList.add("open");
	isOpen = false;
	setTimeout(()=>{
		isOpen = true;
		popupClose(registerModalGratitude);
	}, SHOW_TIME);
}

function popupClose(popupContent){
	if(!isOpen) return;

	registerModalOverlay.classList.remove("open");
	popupContent.classList.remove("open");
	document.removeEventListener("keydown", keyDownHandler);

	setTimeout(()=>{
		enablePageScroll();
		isOpen = true;
	}, REOPEN_DELAY);

}

function addButtonContent(popupLink){
	modalSubmitBtn.innerHTML = popupLink.dataset.buttonContent;
}

function disablePageScroll(){
	const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
	
	document.body.classList.add("stopPageScroll");
	document.body.style.paddingRight = scrollBarWidth + "px";
}

function enablePageScroll(){
	document.body.classList.remove("stopPageScroll");
	document.body.style.paddingRight = "";
}