const popupLinks = document.querySelectorAll(".popup-link");
const registerModalOverlay = document.querySelector(".register__modal_overlay");
const registerModalContent = registerModalOverlay.querySelector(".register__modal_content");
const registerModalGratitude = registerModalOverlay.querySelector(".register__modal_gratitude");
const closeBtns = registerModalOverlay.querySelectorAll(".register__close_button");
const forms = document.forms;
const modalSubmitBtn = registerModalOverlay.querySelector(".modal_form_button");
const KEYCODE = {
	ESC: "Escape"
};

for(let form of forms) {
	form.addEventListener("submitSuccess", submitHandler);
}
registerModalOverlay.addEventListener("click", emptyPlaceCloseHandler);
closeBtns.forEach((button) => {
	button.addEventListener("click", closeBtnHandler)
});

popupLinks.forEach( popupLink => {
	popupLink.addEventListener("click", function(){
		popupOpen();
	})
});

function popupOpen(){
	registerModalOverlay.classList.add("open");
	registerModalContent.classList.add("open");
	disablePageScroll();

	document.addEventListener("keydown", keyDownHandler);
}

function emptyPlaceCloseHandler (event){
	if(event.target === registerModalOverlay){
		popupClose(registerModalContent);
		popupClose(registerModalGratitude);
	}
}

function closeBtnHandler(){
	popupClose(registerModalContent);
	popupClose(registerModalGratitude);
}

function keyDownHandler(event){
	if(event.code === KEYCODE.ESC){
		popupClose(registerModalContent);
		popupClose(registerModalGratitude);
	}
}

function submitHandler(){
	registerModalContent.classList.remove("open");
	if(!registerModalOverlay.classList.contains("open")) {
		registerModalOverlay.classList.add("open");
	}
	gratitudeOpen();
}

function gratitudeOpen(){
	registerModalGratitude.classList.add("open");
}

function popupClose(popupContent){
	registerModalOverlay.classList.remove("open");
	popupContent.classList.remove("open");
	document.removeEventListener("keydown", keyDownHandler);

	registerModalOverlay.addEventListener("transitionend", ()=>{
		enablePageScroll();
	}, {once:true})
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