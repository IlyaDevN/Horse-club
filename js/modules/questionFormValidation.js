validateInput();
validateCheckbox();

function validateInput(){

	const form = document.getElementById("form");
	const userName 	= document.getElementById("userName");
	const userPhone = document.getElementById("userPhone");
	const userNameTooltip = document.createElement('div');
	const userPhoneTooltip = document.createElement('div');
	const tooltipTimeout = form.getAttribute("tooltipTimeout");
	const indent = 15;

	userNameTooltip.innerHTML = userName.getAttribute("invalidTooltip");
	userPhoneTooltip.innerHTML = userPhone.getAttribute("invalidTooltip");

	addTooltip(userName, userNameTooltip);
	addTooltip(userPhone, userPhoneTooltip);

	function addTooltip(elem, tooltip){
		elem.addEventListener("input", function(){
			elem.classList.remove("form__input_invalid");
			tooltip.remove();
			elem.checkValidity();
		})
		
		elem.addEventListener("invalid", function(event){
			event.preventDefault();
			tooltip.classList.add("inputTooltip");
			elem.classList.add("form__input_invalid");
			tooltip.style.left = elem.offsetLeft + "px";
			tooltip.style.top = elem.offsetTop - indent + "px";
			elem.before(tooltip);

			setTimeout(()=>{
				elem.classList.remove("form__input_invalid");
				tooltip.remove();
			}, tooltipTimeout);
		})

	}
}

function validateCheckbox(){

	const form = document.getElementById("form");
	const button = document.querySelector(".form__button");
	const checkbox = document.querySelector(".form__checkbox_original");
	const checkboxContainer = document.querySelector(".form__checkbox_container");
	const tooltipTimeout = form.getAttribute("tooltipTimeout");

	checkbox.addEventListener("invalid", function(event){
		event.preventDefault();
	})

	button.addEventListener("click", function(){
		
		if(!checkbox.checked){
			if(checkboxContainer.querySelector(".tooltip")) {
				return;
			}
			const tooltip = document.createElement("div");
			tooltip.innerHTML = checkboxContainer.getAttribute("invalidTooltip");
			tooltip.classList.add("tooltip");
			checkboxContainer.append(tooltip);
			document.documentElement.style.setProperty('--checkbox-color', '#FF5C00');
			setTimeout(() => {
				tooltip.remove();
				document.documentElement.style.setProperty('--checkbox-color', '#FFC700');
			}, tooltipTimeout);
		}
	});
}