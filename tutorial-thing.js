var background = [],
boi,
currentPosition = "images/boi.png",
boiHelp = 0,
grandpaMenu = {},
previousKeyStrokes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
movementEnabled = false,
welcome = [],
listeningForWASD = false,
listeningForGrandpa = false,
fadingToCardGame = false,
fadingIntoCardGame = false,
blackCover,
a = 0,
boiWalking,
direction = "L";

// Welcome
qj.run("Welcome", function() {
	welcome[0] = qj({
		x: 20, y: 250,
		w: 760, h: 50,
		style: {
			backgroundColor: "yellow", color: "black",
			fontSize: "1.5rem"
		},
		text: "Double-Click Here to Begin!"
	});

	welcome[0].on("click", function() {
		qj.stage = "House";
	});

	return welcome;
});

// Background + House
qj.run("House", function() {
	background[0] = qj({
		style: {
			backgroundImage: "url('images/FloorTile.png')"
		},
		w: 1600, h: 1200,
		x: 0, y: 0
	});

	background[6] = qj({
		x: 600, y: 100,
		w: 200, h: 75,
		type: "image",
		src: "images/iBed.png"
	});

	background[1] = qj({
		style: {
			backgroundColor: "rgb(236, 217, 58)"
		},
		w: 1690, h: 45,
		x: -45, y: 0
	});

	background[2] = qj({
		style: {
			backgroundColor: "rgb(236, 217, 58)"
		},
		w: 1690, h: 45,
		x: -45, y: 1200
	});

	background[3] = qj({
		style: {
			backgroundColor: "rgb(236, 217, 58)"
		},
		w: 45, h: 1200,
		x: -45, y: 45
	});

	background[4] = qj({
		style: {
			backgroundColor: "rgb(236, 217, 58)"
		},
		w: 45, h: 1200,
		x: 1555, y: 45
	});

	boi = qj({
		type: "image",
		src: "images/BoyStand_L.png",
		w: 60, h: 110,
		x: 350, y: 300
	});

	background[5] = qj({
		type: "image",
		src: "images/OldManStand_L.png",
		w: 60, h: 90,
		x: 200, y: 200
	});

	tutorialHelper = qj({
		html: '<i class="fa fa-info-circle" style="margin-right: 10px;"></i> Welcome to the HealThem Tutorial Level, ' + sessionStorage.getItem("name") + '!<br>Click on the white arrow on the bottom right to continue.',
		w: 800, h: 100,
		x: 0, y: 500,
		style: {
			backdropFilter: "blur(2px)",
			backgroundColor: "rgba(0, 0, 0, 0.7)", color: "white",
			fontSize: "1.2rem",
			textAlign: "left",
			padding: "20px",
			display: "block"
		}
	});

	tutorialTriangle = qj({
		w: 25, h: 25,
		x: 750, y: 550,
		type: "image",
		src: "images/triangle.png",
		style: {
			animation: "triangle 1s infinite",
			cursor: "pointer"
		}
	});

	tutorialTriangle.on("click", function() {
		tutorialTriangle.hide();
		movementEnabled = true;
		listeningForWASD = true;
		tutorialHelper.html = '<i class="fa fa-info-circle" style="margin-right: 10px;"></i> Use W, A, S and D to move around.';
	});

	grandpaMenu.text = qj({
		text: "Grandpa Joe",
		w: 200, h: 45,
		x: 570, y: 20,
		style: {
			backgroundColor: "black", color: "white",
			fontSize: "1.5rem",
			borderTop: "6px solid white", borderLeft: "6px solid white", borderRight: "6px solid white",
			display: "none"
		}
	});

	grandpaMenu.background = qj({
		w: 200, h: 90,
		x: 570, y: 65,
		style: {
			backgroundColor: "black", color: "white",
			borderBottom: "6px solid white", borderLeft: "6px solid white", borderRight: "6px solid white",
			display: "none"
		}
	});

	grandpaMenu.button1 = qj({
		text: "Check",
		w: 188, h: 45,
		x: 576, y: 65,
		style: {
			backgroundColor: "black", color: "white",
			textAlign: "left",
			paddingLeft: "10px",
			cursor: "pointer",
			display: "none"
		},
		hover: {
			color: "yellow"
		}
	});

	grandpaInfo = qj({
		x: 570, y: 175,
		w: 200, h: 300,
		style: {
			backgroundColor: "black", color: "white",
			textAlign: "center",
			border: "6px solid white",
			padding: "7.5px"
		}
	});

	grandpaInfo.hide();

	grandpaMenu.button1.on("click", function() {
		grandpaInfo.html = '<div style="color: yellow; margin-bottom: 10px; text-align: center;">CHECK:<br>GRANDPA JOE</div><div style="text-align: center;">Health Problem:<br>Obesity<br><br>Cause:<br>ate too many potato chips and processed foods</div>';
		grandpaInfo.style.display = "block";

		tutorialHelper.html = 'Now that we know what\'s up with Grandpa, you, as one with the Spirit of HealthKnight, need to help him get healthier. Click on "SAVE".';
		grandpaMenu.button1.off();
		grandpaMenu.button1.text = "SAVE";

		grandpaMenu.button1.on("click", function() {
			fadingToCardGame = true;
			blackCover.show();
			setTimeout(function() {
				fadingToCardGame = false;
				fadingIntoCardGame = true;
				qj.stage = "Cards";

				setTimeout(function() {
					fadingIntoCardGame = false;
					blackdrop.hide();
				}, 1000);
			}, 1000);
		});
	});

	grandpaMenu.button2 = qj({
		text: "Cancel",
		w: 188, h: 39,
		x: 576, y: 110,
		style: {
			backgroundColor: "black", color: "white",
			textAlign: "left",
			paddingLeft: "10px",
			cursor: "pointer",
			display: "none"
		},
		hover: {
			color: "yellow"
		}
	});

	grandpaMenu.button2.on("click", function() {
		grandpaMenu.text.hide();
		grandpaMenu.background.hide();
		grandpaMenu.button1.hide();
		grandpaMenu.button2.hide();
		movementEnabled = true;
		boi.x += 10;
	});
	
	blackCover = qj({
		x: 0, y: 0,
		w: 800, h: 600,
		style: {
			opacity: 0,
			backgroundColor: "black"
		}
	});

	blackCover.hide();
}, function () {
	boiHelp++;

	// Curb your BitConnect. Now.
	if (fadingToCardGame) {
		console.log("Smth");
		a += 0.02;
		blackCover.style.opacity = a;
	}

	// Talking to Grandpa?
	if (boi.collide(background[5])) {
		grandpaMenu.text.show();
		grandpaMenu.background.show();
		grandpaMenu.button1.show();
		grandpaMenu.button2.show();

		if (listeningForGrandpa) {
			listeningForGrandpa = false;
			tutorialHelper.html = 'When you move to any one of your family members, a dialog with option will come up. Click on "Check".';
		}

		movementEnabled = false;
	}

	// Listetning for Movement
	if (listeningForWASD) {
		if ((qj.keydown[87]) || (qj.keydown[83]) || (qj.keydown[65]) || (qj.keydown[68])) {
			listeningForWASD = false;
			setTimeout(function() { movementEnabled = false; }, 500);
			tutorialHelper.html = '<i class="fa fa-info-circle" style="margin-right: 10px"></i> The white, moving arrow at the bottom right can be used to skip or move on from certain tutorial steps.';
			
			tutorialTriangle.show();
			tutorialTriangle.off();

			tutorialTriangle.on("click", function() {
				tutorialHelper.html = '<i class="fa fa-info-circle" style="margin-right: 10px;"></i> This is your <span style="display: inline-block; color: yellow;">HOUSE</span>. As the only person with the Spirit of the HealthKnight, you must convince your family memebers to give up their unhealthy habits.';
				tutorialTriangle.off();

				tutorialTriangle.on("click", function() {
					tutorialHelper.html = 'Let\'s start with Grandpa. Use the WASD keys to move to him.';
					movementEnabled = true;
					tutorialTriangle.hide();
					listeningForGrandpa = true;
				});
			});
		}
	}

	// Collisions with backgrounds + movement
	if (movementEnabled) {
		if ((boi.collide(background[1])) || (boi.collide(background[2])) || (boi.collide(background[3])) || (boi.collide(background[4])) || (boi.collide(background[6]))) {
			previous = 0;
			for (i = 45; i < previousKeyStrokes.length; i++) {
				if (previousKeyStrokes[i - 1] == previousKeyStrokes[i]) { previous++; }
			}

			if (i > 10) {
				if (previousKeyStrokes[59] == 87) { boi.x -= 1; boi.y += 2; }
				else if (previousKeyStrokes[59] == 83) { boi.x += 1; boi.y -= 2; }
				else if (previousKeyStrokes[59] == 65) { boi.y -= 1; boi.x += 2; }
				else if (previousKeyStrokes[59] == 68) { boi.y += 1; boi.x -= 2; }
			}
		}
		else {
			if (qj.keydown[87]) { boiWalking = true; boi.y -= 5; previousKeyStrokes.shift(); previousKeyStrokes.push(87);  }
			else if (qj.keydown[83]) { boiWalking = true; boi.y += 5; previousKeyStrokes.shift(); previousKeyStrokes.push(83); }
			else if (qj.keydown[65]) { boi.src = boi.src.replace("_R", "_L"); direction = "L"; boiWalking = true; boi.x -= 5; previousKeyStrokes.shift(); previousKeyStrokes.push(65); }
			else if (qj.keydown[68]) { boi.src = boi.src.replace("_L", "_R"); direction = "R"; boiWalking = true; boi.x += 5; previousKeyStrokes.shift(); previousKeyStrokes.push(68); }
			else { boiWalking = false; }
		}

		// Walking Animation
		if (boiWalking === true) {
			if (boiHelp == 7) {
				boiHelp = 0;
				if (boi.src == "images/BoyStand_" + direction + ".png") { boi.src = "images/BoyWalk_" + direction + "1.png"; }
				else if (boi.src == "images/BoyWalk_" + direction + "1.png") { boi.src = "images/BoyWalk_" + direction + "2.png"; }
				else if (boi.src == "images/BoyWalk_" + direction + "2.png") { boi.src = "images/BoyStand_" + direction + ".png"; }
				else { boi.src = "images/BoyWalk_" + direction + "1.png"; }
			}
		}

		// Scroll the screen
		if ((boi.x + 110) > qj.width) {
			for (i = 0; i < background.length; i++) { background[i].x -= 5; }
			boi.x -= 5;
		}
		else if ((boi.x) < 60) {
			for (i = 0; i < background.length; i++) { background[i].x += 5; }
			boi.x += 5;
		}
		else if ((boi.y + 110) > qj.height) {
			for (i = 0; i < background.length; i++) { background[i].y -= 5; }
			boi.y -= 5;
		}
		else if ((boi.y) < 60) {
			for (i = 0; i < background.length; i++) { background[i].y += 5; }
			boi.y += 5;
		}
	}

	// Breathing animation
	if (boiHelp == 30) {
		boiHelp = 0;
		if (boi.src == "images/BoyStand_" + direction + ".png") { boi.src = "images/BoyStand_" + direction + "2.png"; }
		else { boi.src = "images/BoyStand_" + direction + ".png"; }
	}
});

qj.stage = "Welcome";