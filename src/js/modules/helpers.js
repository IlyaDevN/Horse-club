export function loadAllSliderImages(sectionClass) {

	const observer = new IntersectionObserver(([entry], observer) => {

		if (entry.isIntersecting) {
			const section = document.querySelector(sectionClass);
			const images = section.querySelectorAll("[loading='lazy']");

			images.forEach((image)=> image.setAttribute("loading", "eager"));
			observer.unobserve(entry.target);
		}
	});

	observer.observe(document.querySelector(sectionClass));
}