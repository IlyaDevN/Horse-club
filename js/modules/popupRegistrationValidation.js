const elemsToValidate = document.querySelectorAll(".isValid");
const errorTimeout = 3000;

if(elemsToValidate.length){
	elemsToValidate.forEach(elem => {
		
		const tooltip = elem.querySelector(".valid_tooltip");
		const input = elem.querySelector(".validate");
		if(input.tagName !== "INPUT") return;

		input.addEventListener("invalid", function(event){
			event.preventDefault();
			if(input.getAttribute("isErrorShown") === "true") {
				return;
			}
			showError(input, tooltip);
			setTimeout(hideError, errorTimeout, input, tooltip);
		})
	})
}

function showError(invalidElem, tooltip){
	showTooltips(tooltip);
	addBorderColor(invalidElem);
	invalidElem.setAttribute("isErrorShown", true);
}

function showTooltips(tooltip){
	tooltip.classList.add("active");
}

function addBorderColor(invalidElem){
	if(invalidElem.type === "checkbox"){
		document.documentElement.style.setProperty('--checkboxReg-color', '#FF5C00');
	} else{
		invalidElem.classList.add("active");
	}
}

function hideError(invalidElem, tooltip){
	hideTooltips(tooltip);
	removeBorderColor(invalidElem);
	invalidElem.setAttribute("isErrorShown", false);
}

function hideTooltips(tooltip){
	tooltip.classList.remove("active");
}

function removeBorderColor (invalidElem){
	if(invalidElem.type === "checkbox"){
		document.documentElement.style.setProperty('--checkboxReg-color', '#FFC700');
	} else{
		invalidElem.classList.remove("active");
	}
}

