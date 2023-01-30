const body = document.body;
const popupLinks = document.body.querySelectorAll(".popup-link");
const registerModalOverlay = document.querySelector(".register__modal_overlay");
const registerModalContent = registerModalOverlay.querySelector(".register__modal_content");
const registerModalGratitude = registerModalOverlay.querySelector(".register__modal_gratitude");
const closeBtn = registerModalOverlay.querySelector(".register__close_btn");
const form = registerModalOverlay.querySelector(".register__form");
const modalSubmitBtn = registerModalOverlay.querySelector(".frm__btn");
const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
const REOPEN_DELAY = 800;
const SHOW_TIME = 3000;
const BTN_ESC = "Escape";
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
	body.classList.add("stopPageScroll");
	body.style.paddingRight = scrollBarWidth + "px";
	isOpen = false;

	registerModalOverlay.addEventListener("click", function(e){
		if(!e.target.closest(".register__modal_content")){
			popupClose(registerModalContent);
		}
	})
	closeBtn.addEventListener("click", function(){
		popupClose(registerModalContent);
	})
	document.addEventListener("keydown", function(e){
		if(e.code === BTN_ESC){
			popupClose(registerModalContent);
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
			popupClose(registerModalGratitude);
		}, SHOW_TIME);
	});
}

function popupClose(popupContent){
	if(!isOpen) return;

	registerModalOverlay.classList.remove("open");
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
