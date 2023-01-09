(function burger (){

	const burgerBtn = document.getElementById("menu_burger");
	const menuCloseBtn = document.getElementById("menu_close_btn");
	const menuOverlay = document.getElementById("menuOverlay");
	const menuBody = document.querySelector(".menu_body");
	const body = document.querySelector("body");
		
		burgerBtn.addEventListener("click", function(){

			menuOverlay.style.visibility = "visible";
			menuBody.style.transform = `translateX(0%)`;
			body.style.overflowY = "hidden";
			
		});

		menuCloseBtn.addEventListener("click", function(){

			menuOverlay.style.visibility = "hidden";
			menuBody.style.transform = `translateX(-100%)`;
			body.style.overflowY = "";
		})

})()

