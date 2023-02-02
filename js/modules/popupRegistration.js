const popupLinks = document.querySelectorAll(".popup-link");
const registerModalOverlay = document.querySelector(".register__modal_overlay");
const registerModalContent = registerModalOverlay.querySelector(".register__modal_content");
const registerModalGratitude = registerModalOverlay.querySelector(".register__modal_gratitude");
const closeBtn = registerModalOverlay.querySelector(".register__close_btn");
const form = registerModalOverlay.querySelector(".register__form");
const modalSubmitBtn = registerModalOverlay.querySelector(".modal_form_btn");
const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
const REOPEN_DELAY = 800;
const SHOW_TIME = 3000;
const KEYCODE = {
	ESC: "Escape"
};
let isOpen = true;

for(let index = 0; index < popupLinks.length; index++){
	const popupLink = popupLinks[index];

	popupLink.addEventListener("click", function(){
		popupOpen();
		addButtonContent(popupLink);
	})
}

function popupOpen(){
	if(!isOpen) return;

	registerModalOverlay.classList.add("open");
	registerModalContent.classList.add("open");
	document.body.classList.add("stopPageScroll");
	document.body.style.paddingRight = scrollBarWidth + "px";
	isOpen = false;

	registerModalOverlay.addEventListener("click", emptyPlaceCloseHandler)
	closeBtn.addEventListener("click", closeBtnHandler);
	document.addEventListener("keydown", keyDownHandler);

	setTimeout(() => isOpen = true, REOPEN_DELAY);

	form.addEventListener("submit", submitHandler);
}

function emptyPlaceCloseHandler (event){
	if(!event.target.closest(".register__modal_content")){
		popupClose(registerModalContent);
		registerModalOverlay.removeEventListener("click", emptyPlaceCloseHandler);
	}
}

function closeBtnHandler(){
	popupClose(registerModalContent);
	closeBtn.removeEventListener("click", closeBtnHandler);
}

function keyDownHandler(event){
	if(event.code === KEYCODE.ESC){
		popupClose(registerModalContent);
		document.removeEventListener("keydown", keyDownHandler);
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

	setTimeout(()=>{
		document.body.classList.remove("stopPageScroll");
		document.body.style.paddingRight = "";
		isOpen = true;
	}, REOPEN_DELAY);

}

function addButtonContent(popupLink){
	modalSubmitBtn.innerHTML = popupLink.dataset.btnContent;
}
