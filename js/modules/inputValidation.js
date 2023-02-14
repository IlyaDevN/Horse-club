const buttons = document.querySelectorAll("button[type = submit]");
const VALIDATE = {
	onSubmit: false,

	name: function (input){
		const regExp = /^[а-яА-ЯёЁa-zA-ZЁёЇїІіЄєҐґ']+$/
		const str = input.value;

		if(this.onSubmit){
			if(!regExp.test(str)){
				return false;
			}
		} else {
			if(!input.value){
				return true;
			}
			if(!regExp.test(str)){
				return false;
			}
		}
		return true;
	},

	phone: function (input){
		const regExp = /^(?! )^[+\-\s()0-9]{1,20}/
		const str = input.value;

		if(this.onSubmit){
			if(!regExp.test(str) || input.value.length < 10){
				return false;
			}
		} else {
			if(!input.value){
				return true;
			}
			if(!regExp.test(str)){
				return false;
			}
		}
		return true;
	},

	checkbox: function (input){

		if(this.onSubmit){
			if(!input.checked){
				return false;
			}
		}
		return true;
	},

}

Object.defineProperty(VALIDATE, "onSubmit", {enumerable: false});

function validateHandler(button){
	
	const form = button.closest("form");
	const inputCollection = form.querySelectorAll("input");
	const validateKeys = Object.keys(VALIDATE);
	let isPermitted = true;
	let map = new Map();

	inputCollection.forEach((input)=>{

		validateKeys.forEach((key) => {

			if(input.hasAttribute(`data-${key}`)) {
				VALIDATE.onSubmit = true;
				const isValid = VALIDATE[key](input);
				map.set(input, isValid);
				addInputHandler(input, VALIDATE[key]);
			}
		})
	});

	for(let entry of map){
		const input = entry[0];
		const isInputValid = entry[1];

		if(!isInputValid){
			showError(input);
			isPermitted = false;
		}
	}
	return isPermitted;
}

buttons.forEach((button) => {
	
	button.addEventListener("click", (event)=>{
		event.preventDefault();
		const isValid = validateHandler(button);
		const form = button.closest("form");
		
		if(isValid) {
			formSubmit(form);
		}
	})
});

function addInputHandler(input, validFunc){

	input.addEventListener("input", ()=>{
		
		VALIDATE.onSubmit = false;
		const isValid = validFunc.call(VALIDATE, input);

		hideError(input);

		if(!isValid) {
			showError(input);
		}
	});
}

function formSubmit(form){
	let submit = new Event("submit");
	form.dispatchEvent(submit);
	// form.submit();
	clearInput(form);
}

function showError(input){
	const inputContainer = input.closest(".input_container");
	inputContainer.classList.add("error");
}

function hideError(input){
	const inputContainer = input.closest(".input_container");
	inputContainer.classList.remove("error");
}

function clearInput(form){
	const inputsToClear = form.querySelectorAll("input");

	inputsToClear.forEach((input) => {

		if(input.type === "checkbox") {
			input.checked = false;
		}
		else {
			input.value = "";
		}
	})
}