var characters = [];
var blocks = [];

var movementEnabled = false,
checkKeys = false,
floorX = 0, floorY = 0,
previousKeyStrokes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

qj.run("Game", function() {
	floor = qj({
		x: 0, y: 0,
		w: 800, h: 600,
		style: { backgroundImage: "url('img/wood.png')", backgroundPosition: floorX + "px " + floorY + "px" }
	});

	characters[0] = qj({
		x: 375, y: 250,
		h: 100,
		type: "image",
		src: "img/proto/Stand_L.png"
	});

	// Decorative stuff in apartment (mostly)
	{
		blocks[0] = qj({
			x: 0, y: 15,
			h: 140, w: 1000,
			style: { backgroundColor: "grey" }
		});

		blocks[4] = qj({
			x: -3, y: 470,
			h: 20, w: 10000,
			style: { backgroundColor: "#595959", border: "3px solid black" }
		});

		blocks[6] = qj({
			x: -3, y: 490,
			h: 200, w: 10000,
			style: { backgroundColor: "black" }
		});

		blocks[5] = qj({
			x: -3, y: 0,
			h: 20, w: 1000,
			style: { backgroundColor: "#595959", border: "3px solid black" }
		});

		blocks[1] = qj({
			x: 100, y: 300,
			h: 100, w: 200,
			type: "image",
			src: "img/furniture/dining.png"
		});

		blocks[2] = qj({
			x: 300, y: 45,
			h: 115,
			type: "image",
			src: "img/doorway.png"
		});

		blocks[3] = qj({
			x: 75, y: 80,
			h: 60,
			type: "image",
			src: "img/furniture/tabletop.png"
		});
	}
	// End of decorative stuff in apartment (mostly)

	// Helper
	{
		tutorialHelper = qj({
			html: '<i class="fa fa-info-circle" style="margin-right: 10px;"></i> Welcome to the HealThem Tutorial!<br>Click on the white arrow on the bottom right to continue.',
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
			tutorialTriangle.hide();
			movementEnabled = true;
			tutorialHelper.html = '<i class="fa fa-info-circle" style="margin-right: 10px;"></i> Use W, A, S and D to move around.';
		});
	}
	// End of helper
}, function() {
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
				boi.src = boi.src.replace("_R", "_L");
				previousKeyStrokes.shift(); previousKeyStrokes.push(65);
			}
			else if (qj.keydown[68]) {
				boiWalking = true; characters[0].x += 5;
				boi.src = boi.src.replace("_L", "_R");
				previousKeyStrokes.shift(); previousKeyStrokes.push(68);
			}
			else { boiWalking = false; }

			// Move Screen I guess...
			if ((characters[0].x + 110) > qj.width) {
				for (i = 0; i < blocks.length; i++) { blocks[i].x -= 5; }
				characters[0].x -= 5;
				floorX -= 5;
				floor.style.backgroundPosition = floorX + "px " + floorY + "px";
			}
			else if ((characters[0].x) < 60) {
				for (i = 0; i < blocks.length; i++) { blocks[i].x += 5; }
				characters[0].x += 5;
				floorX += 5;
				floor.style.backgroundPosition = floorX + "px " + floorY + "px";
			}
			else if ((characters[0].y + 110) > qj.height) {
				for (i = 0; i < blocks.length; i++) { blocks[i].y -= 5; }
				characters[0].y -= 5;
			}
			else if ((characters[0].y) < 60) {
				for (i = 0; i < blocks.length; i++) { blocks[i].y += 5; }
				characters[0].y += 5;
			}
		}
	}
});