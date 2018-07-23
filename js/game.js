var characters = [];
var blocks = [];
var hitboxes = [];
var whitestuff = "";

var movementEnabled = false, listeningForMovement = false,
checkKeys = false,
floorX = 0, floorY = 0,
boiWalking = false,
wasSpacePressed = 0, wasYesPressed = 0,
previousKeyStrokes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

function ResetGameVars() {
	movementEnabled = false, listeningForMovement = false,
	checkKeys = false,
	floorX = 0, floorY = 0,
	boiWalking = false,
	wasSpacePressed = 0, wasYesPressed = 0,
	previousKeyStrokes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
}

qj.run("Game", function() {
	floor = qj({
		x: 0, y: 0,
		w: 800, h: 600,
		style: { backgroundImage: "url('img/wood.png')", backgroundPosition: floorX + "px " + floorY + "px" }
	});

	characters[0] = qj({
		x: 375, y: 250,
		h: 100, w: 52,
		type: "image",
		src: "img/proto/boy_walking_L.gif"
	});

	// Decorative stuff in apartment (mostly)
	{
		blocks[0] = qj({
			x: -5000, y: 15,
			h: 140, w: 10000,
			style: { backgroundColor: "grey" }
		});

		blocks[4] = qj({
			x: -5003, y: 470,
			h: 20, w: 10000,
			style: { backgroundColor: "#595959", border: "3px solid black" }
		});

		blocks[6] = qj({
			x: -5003, y: 490,
			h: 200, w: 10000,
			style: { backgroundColor: "black" }
		});

		blocks[5] = qj({
			x: -5003, y: 0,
			h: 20, w: 10000,
			style: { backgroundColor: "#595959", border: "3px solid black" }
		});

		blocks[7] = qj({
			x: 450, y: 40,
			h: 110,
			type: "image",
			src: "img/furniture/tv.png"
		});

		blocks[8] = qj({
			x: 1000, y: 48,
			h: 115, w: 73,
			type: "image",
			src: "img/doorway.png"
		});

		blocks[1] = qj({
			x: 100, y: 300,
			h: 100, w: 200,
			type: "image",
			src: "img/furniture/dining.png"
		});

		blocks[2] = qj({
			x: 300, y: 48,
			h: 115,
			type: "image",
			src: "img/door.png"
		});

		blocks[3] = qj({
			x: 75, y: 80,
			h: 60,
			type: "image",
			src: "img/furniture/tabletop.png"
		});
	}
	// End of decorative stuff in apartment (mostly)
	
	// Hitboxes
	{
		hitboxes[0] = qj({
			x: 1000, y: 48,
			h: 130, w: 70
		});
		
		hitboxes[1] = qj({
			x: 300, y: 48,
			h: 130, w: 70
		});
		
		hitboxes[2] = qj({
			x: 2000, y: 0,
			h: 600, w: 70
		});
		
		hitboxes[3] = qj({
			x: -2000, y: 0,
			h: 600, w: 70
		});
	}

	// Helper
	{
		tutorialHelper = qj({
			html: '<i class="fa fa-info-circle" style="margin-right: 10px;"></i> Welcome to the HealThem Tutorial!<br>Press the <span style="color: yellow;">spacebar</span> to continue.',
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

		tutorialTriangle.on("click", function() {
			tutorialTriangle.hide();
			movementEnabled = true; listeningForMovement = true;
			tutorialHelper.html = '<i class="fa fa-info-circle" style="margin-right: 10px;"></i> Use W, A, S and D to move around.';
		});

		yes = qj({
			text: "Yes (Y)",
			y: 575, x: 325,
			style: { cursor: "pointer", color: "white", textDecoration: "underline", fontSize: "1.2rem" },
			hover: { color: "yellow" }
		});

		no = qj({
			text: "No (N)",
			y: 575, x: 400,
			style: { cursor: "pointer", color: "white", textDecoration: "underline", fontSize: "1.2rem" },
			hover: { color: "yellow" }
		});

		yes.hide(); no.hide();
	}
	// End of helper

	// White thing
	{
		whitestuff = qj({
			x: 0, y: 0,
			h: 600, w: 800,
			style: {
				backgroundColor: "white",
				display: "none"
			}
		});
	}
	// End of white thing
}, function() {
	wasSpacePressed++; wasYesPressed++;

	// Collisions with backgrounds + movement
	if (movementEnabled) {
		checkKeys = true;

		for (i = 0; i < blocks.length; i++) {
			if (characters[0].collide(blocks[i])) {
				previous = 0;
				checkKeys = false;

				for (i = 45; i < previousKeyStrokes.length; i++) {
					if (previousKeyStrokes[i - 1] == previousKeyStrokes[i]) { previous++; }
				}

				if (i > 10) {
					if (previousKeyStrokes[59] == 87) { characters[0].x -= 1; characters[0].y += 2; }
					else if (previousKeyStrokes[59] == 83) { characters[0].x += 1; characters[0].y -= 2; }
					else if (previousKeyStrokes[59] == 65) { characters[0].y -= 1; characters[0].x += 2; }
					else if (previousKeyStrokes[59] == 68) { characters[0].y += 1; characters[0].x -= 2; }
				}
			}
		}

		if (checkKeys) {
			// Move Boi
			if (qj.keydown[87]) {
				boiWalking = true; characters[0].y -= 5;
				previousKeyStrokes.shift(); previousKeyStrokes.push(87);
			}
			else if (qj.keydown[83]) {
				boiWalking = true; characters[0].y += 5;
				previousKeyStrokes.shift(); previousKeyStrokes.push(83);
			}
			else if (qj.keydown[65]) {
				boiWalking = true; characters[0].x -= 5;
				if (characters[0].src.includes("_R")) characters[0].src = characters[0].src.replace("_R", "_L");
				previousKeyStrokes.shift(); previousKeyStrokes.push(65);
			}
			else if (qj.keydown[68]) {
				boiWalking = true; characters[0].x += 5;
				if (characters[0].src.includes("_L")) characters[0].src = characters[0].src.replace("_L", "_R");
				previousKeyStrokes.shift(); previousKeyStrokes.push(68);
			}
			else { boiWalking = false; }

			// Helper Helper
			if ((listeningForMovement == true) && (boiWalking == true)) {
				listeningForMovement = false;
				setTimeout(function() {
					movementEnabled = false;
					tutorialHelper.html = "You can press the <span style='color: yellow;'>spacebar</span> or use the white, moving arrow at the bottom to skip or go thru certain steps.";
					
					tutorialTriangle.style.display = "block";
					tutorialTriangle.off();
					tutorialTriangle.on("click", function() {
						tutorialHelper.html = "This is your <span style='color: yellow;'>HOUSE</span>. As the only person with the spirit of the HealthKnight, you need to convince your family members to get healthy.";
						
						tutorialTriangle.off();
						tutorialTriangle.on("click", function() {
							tutorialHelper.html = "Grandpa ought to be home at this time. Explore around your house and try looking for him.";
							tutorialTriangle.hide();
							movementEnabled = true;
						});
					});
				}, 250);
			}

			// Move Screen I guess...
			if ((characters[0].x + 110) > qj.width) {
				for (i = 0; i < blocks.length; i++) { blocks[i].x -= 5; }
				for (i = 0; i < hitboxes.length; i++) { hitboxes[i].x -= 5; }
				characters[0].x -= 5;
				floorX -= 5;
				floor.style.backgroundPosition = floorX + "px " + floorY + "px";
			}
			else if ((characters[0].x) < 60) {
				for (i = 0; i < blocks.length; i++) { blocks[i].x += 5; }
				for (i = 0; i < hitboxes.length; i++) { hitboxes[i].x += 5; }
				characters[0].x += 5;
				floorX += 5;
				floor.style.backgroundPosition = floorX + "px " + floorY + "px";
			}
			else if ((characters[0].y + 110) > qj.height) {
				for (i = 0; i < blocks.length; i++) { blocks[i].y -= 5; }
				for (i = 0; i < hitboxes.length; i++) { hitboxes[i].y -= 5; }
				characters[0].y -= 5;
			}
			else if ((characters[0].y) < 60) {
				for (i = 0; i < blocks.length; i++) { blocks[i].y += 5; }
				for (i = 0; i < hitboxes.length; i++) { hitboxes[i].y += 5; }
				characters[0].y += 5;
			}
		}
	}

	// Grandpa's room
	if (characters[0].collide(hitboxes[0])) {
		if (sessionStorage.getItem("unlockedAttacks") > 0) {
			tutorialHelper.html = "You've been here already.";
			characters[0].y = 190;

			setTimeout(function() {
				tutorialHelper.html = "HINT: You need to leave the house through the main door.";
			}, 2000);
		}
		else {
			tutorialHelper.html = "This door leads to your Grandpa's room. Continue?";
			tutorialTriangle.off();
			tutorialTriangle.hide();
			movementEnabled = false;

			yes.show(); no.show();
			yes.on("click", function() { characters[0].y = 190; movementEnabled = true; yes.off(); no.off(); yes.hide(); no.hide(); tutorialTriangle.show(); qj.stage = "GrandpaRoom"; });
			no.on("click", function() { characters[0].y = 190; movementEnabled = true; yes.off(); no.off(); yes.hide(); no.hide(); tutorialHelper.html = "Objective: Find Grandpa. (hint: he should be in Grandpa's Room)"; });
		}
	}
	
	// Door to outside
	if (characters[0].collide(hitboxes[1])) {
		if (sessionStorage.getItem("unlockedAttacks") > 0) {
			document.getElementById("qj_26").innerHTML = "This door leads outside. Continue?";
			//tutorialTriangle.off();
			tutorialTriangle.hide();
			movementEnabled = false;

			yes.show(); no.show();
			yes.on("click", function() { characters[0].y = 190; movementEnabled = true; yes.off(); no.off(); yes.hide(); no.hide(); qj.stage = "Outside"; });
			no.on("click", function() { characters[0].y = 190; movementEnabled = true; yes.off(); no.off(); yes.hide(); no.hide(); tutorialHelper.html = "Objective: Go outside."; });
		}
		else {
			tutorialHelper.html = "This door leads outside. Do you really want to leave your nice, comfortable house?";
			tutorialTriangle.off();
			tutorialTriangle.show();
			characters[0].y += 5;
			movementEnabled = false;

			tutorialTriangle.on("click", function() {
				tutorialHelper.html = "...";
				tutorialTriangle.off();

				tutorialTriangle.on("click", function() {
					tutorialHelper.html = "You do? Really?";
					tutorialTriangle.off();

					tutorialTriangle.on("click", function() {
						tutorialHelper.html = "Nah, no you don't. :)";
						tutorialTriangle.off();
		
						tutorialTriangle.on("click", function() {
							tutorialHelper.html = "Objective: Find Grandpa.";
							tutorialTriangle.hide();
							movementEnabled = true;
						});
					});
				});
			});
		}
	}

	// Walking for too long
	if ((characters[0].collide(hitboxes[2])) || (characters[0].collide(hitboxes[3]))) {
		tutorialHelper.html = "You've been walking down this corridor for such a long time.";
		tutorialTriangle.off();
		tutorialTriangle.show();
		if (characters[0].collide(hitboxes[3])) characters[0].x += 5;
		else if (characters[0].collide(hitboxes[2])) characters[0].x -= 5;
		movementEnabled = false;

		tutorialTriangle.on("click", function() {
			tutorialHelper.html = "And yet...";
			tutorialTriangle.off();
			
			tutorialTriangle.on("click", function() {
				tutorialHelper.html = "You realise there's really no point trying to break out of this game's boundaries.";
				tutorialTriangle.off();

				tutorialTriangle.on("click", function() {
					tutorialHelper.html = "And so, you decide that you ought to go back to where you began.";
					tutorialTriangle.off();
	
					tutorialTriangle.on("click", function() {
						tutorialHelper.html = "Objective: Find Grandpa.";
						tutorialTriangle.off();
						tutorialTriangle.hide();
						movementEnabled = true;
					});
				});
			});
		});
	}

	// Keyboard
	if (qj.keydown[32]) {
		if (wasSpacePressed > 60) {
			wasSpacePressed = 0;
			tutorialTriangle.click();
		}
	}

	if (qj.keydown[89]) {
		if (wasYesPressed > 60) {
			wasYesPressed = 0;
			yes.click();
		}
	}

	if (qj.keydown[78]) {
		if (wasYesPressed > 60) {
			wasYesPressed = 0;
			no.click();
		}
	}
});