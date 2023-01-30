const elemsToValidate = document.body.querySelectorAll(".isValid");
const ERROR_DELAY = 3000;

elemsToValidate.forEach(elem => {
	
	const input = elem.querySelector(".validate");
	if(input.tagName !== "INPUT") return;

	input.addEventListener("invalid", function(event){
		event.preventDefault();
		if(elem.getAttribute("data-isErrorShown") === "true") {
			return;
		}
		showError(elem);
		hideError(elem);
	})
})

function showError(invalidItem){
	invalidItem.classList.add("error");
	invalidItem.setAttribute("data-isErrorShown", true);
}

function hideError(invalidItem){
	setTimeout(()=>{
		invalidItem.classList.remove("error");
		invalidItem.setAttribute("data-isErrorShown", false);
	}, ERROR_DELAY);
}

