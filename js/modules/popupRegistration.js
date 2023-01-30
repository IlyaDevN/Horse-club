const body = document.body;
const popupLinks = document.querySelectorAll(".popup-link");
const registerModalOverlay = document.querySelector(".register__modal_overlay");
const registerModalContent = document.querySelector(".register__modal_content");
const registerModalGratitude = document.querySelector(".register__modal_gratitude");
const closeBtn = document.querySelector(".register__close_btn");
const form = document.querySelector(".register__form");
const modalSubmitBtn = document.querySelector(".frm__btn");
const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
const REOPEN_DELAY = 800;
const SHOW_TIME = 3000;
const BTN_ESC = "Escape";
let isOpen = true;

for(let index = 0; index < popupLinks.length; index++){
	const popupLink = popupLinks[index];

	popupLink.addEventListener("click", function(){
		popupOpen(registerModalOverlay, registerModalContent);
		addButtonContent(popupLink);
	})
}

function popupOpen(currentPopup, popupContent){
	if(!isOpen) return;

	currentPopup.classList.add("open");
	popupContent.classList.add("open");
	body.classList.add("stopPageScroll");
	body.style.paddingRight = scrollBarWidth + "px";
	isOpen = false;

	currentPopup.addEventListener("click", function(e){
		if(!e.target.closest(".register__modal_content")){
			popupClose(currentPopup, popupContent);
		}
	})
	closeBtn.addEventListener("click", function(){
		popupClose(currentPopup, popupContent);
	})
	document.addEventListener("keydown", function(e){
		if(e.code === BTN_ESC){
			popupClose(currentPopup, popupContent);
		}
	})
	setTimeout(() => isOpen = true, REOPEN_DELAY);

	form.addEventListener("submit", function(e){
		e.preventDefault();
		registerModalContent.classList.remove("open");
		registerModalGratitude.classList.add("open");
		isOpen = false;
		setTimeout(()=>{
			isOpen = true;
			popupClose(registerModalOverlay, registerModalGratitude);
		}, SHOW_TIME);
	});
}

function popupClose(currentPopup, popupContent){
	if(!isOpen) return;

	currentPopup.classList.remove("open");
	popupContent.classList.remove("open");

	setTimeout(()=>{
		body.classList.remove("stopPageScroll");
		body.style.paddingRight = "";
		isOpen = true;
	}, REOPEN_DELAY);

}

function addButtonContent(popupLink){
	modalSubmitBtn.innerHTML = popupLink.dataset.btnContent;
}
