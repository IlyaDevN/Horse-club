(function burger (){

	const burgerBtn = document.getElementById("menu_burger");
	const modalCloseBtn = document.getElementById("modal_close_btn");
	const modalOverlay = document.getElementById("modalOverlay");
	const modalBody = document.querySelector(".modal_body");
	const body = document.querySelector("body");
		
		burgerBtn.addEventListener("click", function(){

			modalOverlay.style.visibility = "visible";
			modalBody.style.transform = `translateX(0%)`;
			body.style.overflowY = "hidden";
			
		});

		modalCloseBtn.addEventListener("click", function(){

			modalOverlay.style.visibility = "hidden";
			modalBody.style.transform = `translateX(-100%)`;
			body.style.overflowY = "";
		})

})()

