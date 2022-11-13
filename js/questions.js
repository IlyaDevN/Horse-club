(function checkboxInputValidation(){

	const userName 	= document.getElementById("userName");
	const userPhone = document.getElementById("userPhone");
	const userNameNotification = document.createElement('div');
	const userPhoneNotification = document.createElement('div');

	userNameNotification.innerHTML = "Вводите буквы";
	userPhoneNotification.innerHTML = "Вводите цифры";

	addNotification(userName, userNameNotification);
	addNotification(userPhone, userPhoneNotification);

	function addNotification(elem, notification){
		elem.addEventListener("input", function(){
			elem.classList.remove("form__input_invalid");
			notification.remove();
			elem.checkValidity();
		})
		
		elem.addEventListener("invalid", function(event){
			event.preventDefault();
			notification.classList.add("notification");
			elem.classList.add("form__input_invalid");
			notification.style.left = elem.offsetLeft + "px";
			notification.style.top = elem.offsetTop - 15 + "px";
			elem.before(notification);
		})
	}
})();

(function checkboxQuestionsValidation(){

	let button = document.querySelector(".form__button");
	let checkbox = document.querySelector(".form__checkbox_original");
	let checkboxContainer = document.querySelector(".form__checkbox_container");

	button.addEventListener("click", function(){
		let label = document.querySelector(".form__label_checkbox")
		if(!checkbox.checked){
			if(checkboxContainer.querySelector(".tooltip")) {
				return;
			}
			let tooltip = document.createElement("div");
			tooltip.innerHTML = "Подтвердите согласие";
			tooltip.classList.add("tooltip");
			checkboxContainer.append(tooltip);
			document.documentElement.style.setProperty('--checkbox-color', '#FF5C00');
			setTimeout(() => {
				tooltip.remove();
				document.documentElement.style.setProperty('--checkbox-color', '#FFC700');
			}, 4000);
		}
	});
})();