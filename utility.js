function CloseSnackbar() {
	var a = document.getElementById("Snackbar");
	a.style.opacity = 1.0;
	a.style.right = "20px";
	a.style.top = "20px";

	var c = 1.0;

	var b = setInterval(function() {
		c = c - 0.02;
		a.style.opacity = c;
	}, 10);

	setTimeout(function() {
		clearInterval(b);
	}, 500);
}

function Snackbar(text, clicked = function() {}) {
	
}