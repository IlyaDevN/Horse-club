export default function popupRegistrationValidation(){
	const elemsToCheck = document.querySelectorAll(".validate");
	const errorTimeout = 3000;
	

	if(elemsToCheck.length > 0){
		elemsToCheck.forEach(elem => {
			if(elem.tagName === "INPUT"){
				elem.addEventListener("invalid", function(event){
					event.preventDefault();
					if(event.target.getAttribute("errorLock") === "true") {
						return;
					}
					showError(event.target);
					setTimeout(hideError, errorTimeout, event.target);
				})
			}
		})
	}

	function showError(invalidElem){

		showTooltips();
		lightUpBorder();

		invalidElem.setAttribute("errorLock", true);

		function showTooltips(){
			invalidElem.previousElementSibling.classList.add("active");
		}
		function lightUpBorder(){
			if(invalidElem.type === "checkbox"){
				document.documentElement.style.setProperty('--checkboxReg-color', '#FF5C00');
			} else{
				invalidElem.classList.add("active");
			}
		}
	}
	
	function hideError(invalidElem){

		hideTooltips();
		lightDownBorder();

		invalidElem.setAttribute("errorLock", false);

		function hideTooltips(){
			invalidElem.previousElementSibling.classList.remove("active");
		}
		function lightDownBorder (){
			if(invalidElem.type === "checkbox"){
				document.documentElement.style.setProperty('--checkboxReg-color', '#FFC700');
			} else{
				invalidElem.classList.remove("active");
			}
		}
	}
}