const elemsToValidate = document.body.querySelectorAll(".input_container");
const ERROR_DELAY = 3000;

elemsToValidate.forEach(elem => {
	
	const input = elem.querySelector(".validate");

	input.addEventListener("invalid", function(event){
		event.preventDefault();
		if(elem.dataset.isErrorShown === "true") {
			return;
		}
		showError(elem);
		setTimeout(hideError, ERROR_DELAY, elem);
	})
})

function showError(invalidItem){
	invalidItem.classList.add("error");
	invalidItem.dataset.isErrorShown = true;
}

function hideError(invalidItem){
	invalidItem.classList.remove("error");
	invalidItem.dataset.isErrorShown = false;
}
