var credits = "", creditsText;

var request = new XMLHttpRequest();
request.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		credits = request.responseText;

		qj.run("Credits", function() {
			creditsText = qj({
				w: 800, h: 600,
				style: { backgroundColor: "black" }
			});

			creditsText = qj({
				w: 800, h: 600,
				x: 0, y: 300,
				text: credits,
				style: { fontSize: "1.5rem", color: "white", display: "block" }
			});

			document.getElementById("qj_7").style.justifyContent = "";
			document.getElementById("qj_7").style.textAlign = "center";
		}, function() {
			creditsText.y--;
		});
	}
};
request.open("GET", "/credits.txt", true);
request.send();