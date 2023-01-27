const elemsToCheck = document.querySelectorAll(".validate");
const errorTimeout = 3000;

if(elemsToCheck.length > 0){
	elemsToCheck.forEach(elem => {
		if(elem.tagName === "INPUT"){
			elem.addEventListener("invalid", function(event){
				event.preventDefault();
				if(event.target.getAttribute("isErrorShown") === "true") {
					return;
				}
				showError(event.target);
				setTimeout(hideError, errorTimeout, event.target);
			})
		}
	})
}

function showError(invalidElem){

	showTooltips(invalidElem);
	addBorderColor(invalidElem);
	invalidElem.setAttribute("isErrorShown", true);
}

function showTooltips(invalidElem){
	invalidElem.previousElementSibling.classList.add("active");
}

function addBorderColor(invalidElem){
	if(invalidElem.type === "checkbox"){
		document.documentElement.style.setProperty('--checkboxReg-color', '#FF5C00');
	} else{
		invalidElem.classList.add("active");
	}
}

function hideError(invalidElem){

	hideTooltips(invalidElem);
	removeBorderColor(invalidElem);
	invalidElem.setAttribute("isErrorShown", false);
}

function hideTooltips(invalidElem){

	invalidElem.previousElementSibling.classList.remove("active");
}

function removeBorderColor (invalidElem){

	if(invalidElem.type === "checkbox"){
		document.documentElement.style.setProperty('--checkboxReg-color', '#FFC700');
	} else{
		invalidElem.classList.remove("active");
	}
}

