const forms = Array.from(document.forms);
let isInputHandlerAdded = false;

const REGEXP = {
	Name: /^[а-яА-ЯёЁa-zA-ZЁёЇїІіЄєҐґ']+$/,
	Phone: /^(?! )^[+\-\s()0-9]{10,20}$/,
}

const RULES = [
	{
		name: "name",
		validate: function(input){

			return REGEXP.Name.test(input.value);
		}
	},
	{
		name: "phone",
		validate: function(input){

			return REGEXP.Phone.test(input.value);
		}
	},
	{
		name: "checkbox",
		validate: function(input){

			return input.checked;
		}
	}
]

document.onsubmit = () => {return false};

function validateField(input){
	let checkings = [];

	RULES.forEach((rule) => {
		if(Object.hasOwn(input.dataset, rule.name)){
			const isValid = rule.validate(input);
			checkings.push(isValid);
		}
	});
	return checkings.every((item) => item);
}

function isFormValid(form){
	const checkings = [];
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

forms.forEach((form) => form.addEventListener("submit", handleFormSubmit));

function handleFormSubmit(event){
	const form = event.target;

	if(isFormValid(form)) {

		form.dispatchEvent(new Event("submitSuccess"));
		// form.submit();
		form.reset();
	}
}

function addInputHandler(input){

	input.addEventListener("input", ()=>{
		const isValid = validateField(input);

		if(!isValid) {
			showError(input);
		} else {
			hideError(input);
		}
	});
}

function showError(input){
	const inputContainer = input.closest(".input_container");
	inputContainer.classList.add("error");
}

function hideError(input){
	const inputContainer = input.closest(".input_container");
	inputContainer.classList.remove("error");
}