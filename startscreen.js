function StartGame() {
	document.getElementById("StartScreen").style.display = "none";
	document.getElementById("EnterName").style.display = "block";
}

function EnterName(event) {
	event.preventDefault();
	sessionStorage.setItem("name", document.getElementById("EnterName-Name").value);

	for (i = 0; i < document.getElementsByClassName("PlayerName").length; i++) {
		document.getElementsByClassName("PlayerName")[i].innerHTML = sessionStorage.getItem("name");
	}

	document.getElementById("EnterName").style.display = "none";
	document.getElementById("Premise").style.display = "block";
}

function Premise(a, b) {
	document.getElementById("Premise-" + a).style.display = "none";
	document.getElementById("Premise-" + b).style.display = "block";
}