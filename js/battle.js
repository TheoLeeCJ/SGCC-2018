var lanes = [];
var boundaries = [];

qj.run("Battle", function() {
	var enemyInfo = enemiesInfo[sessionStorage.getItem("enemyId")];

	floor = qj({
		x: 0, y: 0,
		w: 800, h: 600,
		style: { backgroundColor: "white" }
	});

	enemy = qj({
		w: 90,
		x: 365, y: 10,
		type: "image",
		src: enemyInfo.image
	});

	// Stats
	{
		statsBackground = qj({
			w: 200, h: 480,
			x: 20, y: 10,
			style: { border: "5px solid black", backgroundColor: "yellow", display: "block" },
			html: `
				<div style="font-size: 2rem; margin-top: 10px; text-align: center;">STATS</div>
				<hr style="border: 2.5px solid black">
				<div style="padding-left: 10px;">
					<div style="font-size: 1.2rem;">Your HP</div>
					<div style="font-size: 1.2rem; margin-top: 65px;">Enemy's HP</div>
				</div>
			`
		});

		yourHP = qj({
			w: 180, h: 30,
			x: 30, y: 115,
			style: { backgroundColor: "darkgreen", color: "white", padding: "2.5px" },
			text: "100 / 100"
		});

		enemyHP = qj({
			w: 180, h: 30,
			x: 30, y: 205,
			style: { backgroundColor: "red", color: "white", padding: "2.5px" },
			text: "100 / 100"
		});
	}

	// Lanes
	{
		lanes[0] = qj({
			w: 100, h: 290,
			x: 253, y: 195,
			style: { border: "3px solid black", backdropFilter: "blur(2px)", backgroundColor: "rgba(0, 0, 0, 0.5)" }
		});

		lanes[1] = qj({
			w: 100, h: 290,
			x: 350, y: 195,
			style: { border: "3px solid black", backdropFilter: "blur(2px)", backgroundColor: "rgba(0, 0, 0, 0.5)" }
		});

		lanes[2] = qj({
			w: 100, h: 290,
			x: 447, y: 195,
			style: { border: "3px solid black", backdropFilter: "blur(2px)", backgroundColor: "rgba(0, 0, 0, 0.5)" }
		});
	}

	character = qj({
		w: 50,
		x: 278, y: 380,
		type: "image",
		src: "img/proto/Stand_R.png"
	});

	// Helper
	{
		tutorialHelper = qj({
			html: enemyInfo.initialText,
			w: 800, h: 100,
			x: 0, y: 500,
			style: { backdropFilter: "blur(2px)", backgroundColor: "rgba(0, 0, 0, 0.7)", color: "white", fontSize: "1.2rem", textAlign: "left", padding: "20px", display: "block" }
		});

		tutorialTriangle = qj({
			w: 25, h: 25,
			x: 750, y: 550,
			type: "image",
			src: "img/triangle.png",
			style: { animation: "triangle 1s infinite", cursor: "pointer" }
		});

		tutorialTriangle.element.setAttribute("onclick", "if (this.style.display !== 'none') { buttonSound.play(); }");
	}
	// End of helper
}, function() {

});