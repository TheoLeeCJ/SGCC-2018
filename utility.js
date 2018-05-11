function Snackbar(text) {
	document.getElementById("Snackbar-Text").innerHTML = text;

	var a = document.getElementById("Snackbar");
	a.style.opacity = 0;
	a.style.right = "20px";
	a.style.top = "20px";

	var c = 0;

	var b = setInterval(function() {
		c = c + 0.02;
		a.style.opacity = c;
	}, 10);

	setTimeout(function() {
		clearInterval(b);
	}, 500);
}