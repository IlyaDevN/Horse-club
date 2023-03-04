const forms = document.forms;
let isInputHandlerAdded = false;

const REGEXP = {
	Name: /^[а-яА-ЯёЁa-zA-ZЁёЇїІіЄєҐґ']+$/,
	Phone: /^(?! )^[+\-\s()0-9]{1,20}$/,
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

			return REGEXP.Phone.test(input.value) && input.value.length >= 10;
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

for (let form of forms){
	
	form.addEventListener("submit", () => {
		
		if(isFormValid(form)) {
			formSubmit(form);
		}
	})
};

function addInputHandler(input){

	input.addEventListener("input", ()=>{
		const isValid = validateField(input);

		hideError(input);

		if(!isValid) {
			showError(input);
		}
	});
}

function formSubmit(form){
	let submitSuccess = new Event("submitSuccess");
	form.dispatchEvent(submitSuccess);
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