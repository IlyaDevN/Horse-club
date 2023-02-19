const buttons = document.querySelectorAll("button[type = submit]");
let onSubmit = false;
let isInputHandlerAdded = false;

const REGEXP = {
	name: /^[а-яА-ЯёЁa-zA-ZЁёЇїІіЄєҐґ']+$/,
	phone: /^(?! )^[+\-\s()0-9]{1,20}$/,
}

const RULES = [

	{
		name: "name",
		validate: function(input){

			if(onSubmit){
				return REGEXP.name.test(input.value);
			} else {
				if(!input.value){
					return true;
				}
				return REGEXP.name.test(input.value);
			}
		}
	},
	{
		name: "phone",
		validate: function(input){

			if(onSubmit){
				return REGEXP.phone.test(input.value) && input.value.length >= 10;
			} else {
				if(!input.value){
					return true;
				}
				return REGEXP.phone.test(input.value);
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
	let checkings = [];

	RULES.forEach((rule) => {
		if(Object.hasOwn(input.dataset, rule.name)){
			let isValid = rule.validate(input);
			checkings.push(isValid);
		}
	});
	return checkings.every((item) => item);
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
	
	return checkings.every((item) => item);
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