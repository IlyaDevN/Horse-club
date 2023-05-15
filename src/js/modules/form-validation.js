const forms = Array.from(document.forms);

const REGEXP = {
	NAME: /^[а-яА-ЯёЁa-zA-ZЁёЇїІіЄєҐґ']{2,20}$/,
	PHONE: /^(?! )^[+\-\s()0-9]{10,20}$/,
}

const RULES = [
	{
		name: "name",
		validate: function (input) {
			return REGEXP.NAME.test(input.value);
		}
	},
	{
		name: "phone",
		validate: function (input) {
			return REGEXP.PHONE.test(input.value);
		}
	},
	{
		name: "checkbox",
		validate: function (input) {
			return input.checked;
		}
	}
]

forms.forEach((form) => form.addEventListener("submit", handleFormSubmit));

function validateField(input) {
	const checkings = [];

	RULES.forEach((rule) => {
		if (Object.hasOwn(input.dataset, rule.name)) {
			const isValid = rule.validate(input);
			checkings.push(isValid);
		}
	});

	const isValid = checkings.every((item) => item);

	if (!isValid) {
		showError(input);
	} else {
		hideError(input);
	}

	return isValid;
}

function isFormValid(form) {
	const checkings = [];
	const filteredFields = Array.from(form.elements).filter((element) => {
		return Object.hasOwn(element.dataset, "toValidate");
	});

	filteredFields.forEach((input) => {
		const isValid = validateField(input);
		addInputHandler(input);
		checkings.push(isValid);
	})
	return checkings.every((item) => item);
}

function handleFormSubmit(event) {
	const form = event.target;
	event.preventDefault();

	if (isFormValid(form)) {
		form.dispatchEvent(new Event("submitSuccess"));
		form.reset();
	}
}

function inputHandler(event) {
	validateField(event.target);
}

function addInputHandler(input) {
	input.removeEventListener("input", inputHandler);
	input.addEventListener("input", inputHandler);
}

function showError(input) {
	const inputContainer = input.closest(".input-container");
	inputContainer.classList.add("error");
}

function hideError(input) {
	const inputContainer = input.closest(".input-container");
	inputContainer.classList.remove("error");
}