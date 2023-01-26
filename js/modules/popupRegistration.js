const body = document.querySelector("body");
const popupLinks = document.querySelectorAll(".popup-link");
const registerModalOverlay = document.querySelector(".register__modal_overlay");
const registerModalContent = document.querySelector(".register__modal_content");
const registerModalGratitude = document.querySelector(".register__modal_gratitude");
const closeBtn = document.querySelector(".register__close_btn");
const form = document.querySelector(".register__form");
const modalSubmitBtn = document.querySelector(".frm__btn");
const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
const timeout = 800;
const closeTimeout = 3000;
let unlock = true;

if(popupLinks.length > 0){
	for(let index = 0; index <popupLinks.length; index++){
		const popupLink = popupLinks[index];
		popupLink.addEventListener("click", function(){

			popupOpen(registerModalOverlay, registerModalContent);
			addButtonContent(popupLink);
		})
	}
}

function popupOpen(currentPopup, popupContent){
	if(!unlock) return;

	const btnEsc = "Escape";

	currentPopup.classList.add("open");
	popupContent.classList.add("open");
	body.classList.add("stopPageScroll");
	body.style.paddingRight = scrollBarWidth + "px";
	unlock = false;

	currentPopup.addEventListener("click", function(e){
		if(!e.target.closest(".register__modal_content")){
			popupClose(currentPopup, popupContent);
		}
	})
	closeBtn.addEventListener("click", function(){
		popupClose(currentPopup, popupContent);
	})
	document.addEventListener("keydown", function(e){
		if(e.code === btnEsc){
			popupClose(currentPopup, popupContent);
		}
	})
	setTimeout(() => unlock = true, timeout);

	form.addEventListener("submit", function(e){
		e.preventDefault();
		registerModalContent.classList.remove("open");
		registerModalGratitude.classList.add("open");
		unlock = false;
		setTimeout(()=>{
			unlock = true;
			popupClose(registerModalOverlay, registerModalGratitude);
		}, closeTimeout);
	});
}

function popupClose(currentPopup, popupContent){
	if(!unlock) return;

	currentPopup.classList.remove("open");
	popupContent.classList.remove("open");

	setTimeout(()=>{
		body.classList.remove("stopPageScroll");
		body.style.paddingRight = "";
		unlock = true;
	}, timeout);

}

function addButtonContent(popupLink){
	modalSubmitBtn.innerHTML = popupLink.dataset.btnContent;
}
