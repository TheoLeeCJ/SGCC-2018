var lanes = [];
var boundaries = [];
var projectiles = [];
var boundaries = [];
var projectileHelper = [];
var projectilesMoving = false, wasSpacePressed = 0, redirectSpacebar = "";

// TO-DO
// Make projectile move for a while before projectile explanation shows (stop projectile when explanation shows)

// Utilities
{
	function DisplayProjectiles() {
		for (i = 0; i < projectiles.length; i++) { projectiles[i].show(); }
		projectilesMoving = true;

		if (sessionStorage.getItem("showTutorial") == "true") {
			redirectSpacebar = "OK-1";
			setTimeout(function() {
				projectilesMoving = false;
				for (i = 0; i < projectileHelper.length; i++) { projectileHelper[i].style.display = "block"; }
			}, 750);
		}
	}
}

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
			style: { border: "3px solid black", backgroundColor: "rgba(0, 0, 0, 0.3)" }
		});

		lanes[1] = qj({
			w: 100, h: 290,
			x: 350, y: 195,
			style: { border: "3px solid black", backgroundColor: "rgba(0, 0, 0, 0.3)" }
		});

		lanes[2] = qj({
			w: 100, h: 290,
			x: 447, y: 195,
			style: { border: "3px solid black", backgroundColor: "rgba(0, 0, 0, 0.3)" }
		});
	}

	// Projectiles
	{
		projectiles[0] = qj({
			w: 36, h: 36,
			type: "image",
			src: "img/projectiles/hamburger.png",
			x: 285, y: 200,
			style: { display: "none" }
		});

		projectiles[1] = qj({
			w: 36, h: 36,
			type: "image",
			src: "img/projectiles/hamburger.png",
			x: 385, y: 200,
			style: { display: "none" }
		});

		projectiles[2] = qj({
			w: 36, h: 36,
			type: "image",
			src: "img/projectiles/hamburger.png",
			x: 480, y: 200,
			style: { display: "none" }
		});
	}

	character = qj({
		w: 50, h: 97,
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

		tutorialTriangle.on("click", function() {
			if (sessionStorage.getItem("showTutorial") == "true") {
				tutorialTriangle.off();
				tutorialHelper.html = "But how do you fight?";

				tutorialTriangle.on("click", function() {
					tutorialTriangle.off();
					tutorialHelper.html = "Well, what better way to find out... than to actually fight?";

					tutorialTriangle.on("click", function() {
						tutorialHelper.html = "And so the fight begins... when you press the spacebar.";

						tutorialTriangle.on("click", function() {
							tutorialTriangle.off();
							tutorialTriangle.hide();
	
							DisplayProjectiles();
						});
					});
				});
			}
			else {
				tutorialHelper.html = "And so the fight begins... when you press the spacebar.";

				tutorialTriangle.on("click", function() {
					tutorialTriangle.off();
					tutorialTriangle.hide();

					DisplayProjectiles();
					projectilesMoving = true;
				});
			}
		});

		tutorialTriangle.element.setAttribute("onclick", "if (this.style.display !== 'none') { buttonSound.play(); }");
	}
	// End of helper

	if (sessionStorage.getItem("showTutorial") == "true") {
		projectileHelper[0] = qj({
			w: 800, h: 600,
			type: "image",
			x: 0, y: 0,
			src: "img/projectiles/tutorial-overlay.png",
			style: { display: "none", opacity: "0.7" }
		});

		projectileHelper[1] = qj({
			x: 400, y: 285,
			style: { display: "none", color: "white", padding: "10px" },
			html: `These are <span style='color: yellow;'>PROJKECTILES</span>. They will rain down on you. Use the S and D keys to move yourself between lanes to avoid them.
			<div><span id="OK-1" style="float: right; text-decoration: underline; cursor: pointer;" onclick="projectileHelper[0].hide(); this.parentElement.parentElement.style.display = 'none'; projectilesMoving = true;">OK (spacebar)</span></div>`
		});
	}
}, function() {
	wasSpacePressed++;

	// Projectile logic
	if (projectilesMoving) {
		for (i = 0; i < projectiles.length; i++) { projectiles[i].y += 2.5; }

		for (i = 0; i < projectiles.length; i++) {
			if (projectiles[i].collide(character)) { projectiles[i].y = 200; }
			if (projectiles[i].y > 450) { projectiles[i].y = 200; }
		}
	}

	// Keyboard
	if (qj.keydown[32]) {
		if (wasSpacePressed > 60) {
			wasSpacePressed = 0;

			if (redirectSpacebar == "") { tutorialTriangle.click(); }
			else { document.getElementById(redirectSpacebar).click(); redirectSpacebar = ""; }
		}
	}

	if (qj.keydown[83]) {}

	if (qj.keydown[68]) {}
});