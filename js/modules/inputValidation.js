const buttons = document.querySelectorAll("button[type = submit]");
let onSubmit = false;
let isInputHandlerAdded = false;

const RULES = [

	{
		name: "name",
		validate: function(input){
			const regExp = /^[а-яА-ЯёЁa-zA-ZЁёЇїІіЄєҐґ']+$/

			if(onSubmit){
				return regExp.test(input.value);
			} else {
				if(!input.value){
					return true;
				}
				return regExp.test(input.value);
			}
		}
	},
	{
		name: "phone",
		validate: function(input){
			const regExp = /^(?! )^[+\-\s()0-9]{1,20}$/

			if(onSubmit){
				return regExp.test(input.value) && input.value.length >= 10;
			} else {
				if(!input.value){
					return true;
				}
				return regExp.test(input.value);
			}
		}
	},
	{
		name: "checkbox",
		validate: function(input){
			if(onSubmit){
				return input.checked;
			}
			return true;
		}
	}
]

function validateField(input){
	let isValid;

	RULES.forEach((rule) => {
		if(Object.hasOwn(input.dataset, rule.name)){
			isValid = rule.validate(input);
		}
	});
	return isValid;
}

function isFormValid(form){
	let checkings = [];
	
	const filteredFields = Array.from(form.elements).filter((element)=>{
		return Object.hasOwn(element.dataset, "toValidate");
	});

	filteredFields.forEach((element)=> {

		const isValid = validateField(element);

		if(!isInputHandlerAdded) {
			addInputHandler(element);
		}
		
		checkings.push(isValid);

		if(!isValid) {
			showError(element);
		} else {
			hideError(element);
		}
	})
	isInputHandlerAdded = true;
	
	return checkings.every((item) => {
		return item;
	})
}

buttons.forEach((button) => {
	
	button.addEventListener("click", () => {
		onSubmit = true;
		const isValid = isFormValid(button.form);
		
		if(isValid) {
			formSubmit(button.form);
		}
	})
});

function addInputHandler(input){

	input.addEventListener("input", ()=>{
		onSubmit = false;
		const isValid = validateField(input);

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
	form.reset();
}

function showError(input){
	const inputContainer = input.closest(".input_container");
	inputContainer.classList.add("error");
}

function hideError(input){
	const inputContainer = input.closest(".input_container");
	inputContainer.classList.remove("error");
}