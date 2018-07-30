var startScreenButtons = [];

qj.run("StartScreen", function() {
	qj({
		x: 0, y: 0,
		w: 800, h: 600,
		type: "image",
		src: "img/startscreen.gif"
	});

	qj({
		w: 350, h: 300,
		x: 225, y: 150,
		style: { borderRadius: "10px", backgroundColor: "rgba(0, 0, 0, 0.7)", backdropFilter: "blur(2px)" }
	});

	qj({
		x: 250, y: 180,
		text: "HealThem",
		style: { color: "white", fontSize: "3.75rem" }
	});

	startScreenButtons[0] = qj({
		w: 250,
		x: 275, y: 290,
		text: "Start Game",
		style: { fontSize: "1.25rem", color: "black", backgroundColor: "white", padding: "10px", borderRadius: "5px", cursor: "pointer" },
		hover: { transition: "0.25s", backgroundColor: "grey" }
	});

	startScreenButtons[0].on("click", function() {
		music1.play();
		qj.stage = "Story";
	});

	startScreenButtons[1] = qj({
		w: 250,
		x: 275, y: 360,
		text: "Credits",
		style: { fontSize: "1.25rem", color: "black", backgroundColor: "white", padding: "10px", borderRadius: "5px", cursor: "pointer" },
		hover: { transition: "0.25s", backgroundColor: "grey" }
	});

	startScreenButtons[1].on("click", function() {
		music1.play();
		qj.stage = "Credits";
	});
});