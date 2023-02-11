const elemsToValidate = document.body.querySelectorAll(".input_container");

elemsToValidate.forEach(elemContainer => {
	const input = elemContainer.querySelector(".validate");

	input.addEventListener("invalid", (event)=>{

		showError(event, elemContainer);
	});

	input.addEventListener("input", ()=>{

		hideError(elemContainer);

		if(input.type === "text" && input.value === "") {
			return;
		}
		if(input.type === "tel" && input.value === "") {
			return;
		}
		if(input.type === "checkbox") {
			return;
		}

		input.checkValidity();
	});
})

function showError(event, elemContainer){
	event.preventDefault();
	elemContainer.classList.add("error");
}

function hideError(elemContainer){
	elemContainer.classList.remove("error");
}