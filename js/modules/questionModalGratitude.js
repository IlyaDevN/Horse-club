const questionModalOverlay = document.querySelector(".question__modal_overlay");
const questionModalGratitude = questionModalOverlay.querySelector(".question__modal_gratitude");
const closeBtn = questionModalOverlay.querySelector(".question__close_button");
const form = document.querySelector(".questions__form");
const KEYCODE = {
	ESC: "Escape"
};

form.addEventListener("submitSuccess", submitHandler);
questionModalOverlay.addEventListener("click", emptyPlaceCloseHandler);
closeBtn.addEventListener("click", closeBtnHandler);

function submitHandler(){
	gratitudeOpen();
}

function gratitudeOpen(){
	questionModalOverlay.classList.add("open");
	questionModalGratitude.classList.add("open");
	disablePageScroll();
	document.addEventListener("keydown", keyDownHandler);
}

function gratitudeClose(){

	questionModalOverlay.classList.remove("open");
	questionModalGratitude.classList.remove("open");
	document.removeEventListener("keydown", keyDownHandler);

	questionModalOverlay.addEventListener("transitionend", ()=>{
		enablePageScroll();
	}, {once:true})
}

function emptyPlaceCloseHandler (event){
	if(event.target === questionModalOverlay){
		gratitudeClose();
	}
}

function closeBtnHandler(){
	gratitudeClose();
}

function keyDownHandler(event){
	if(event.code === KEYCODE.ESC){
		gratitudeClose();
	}
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