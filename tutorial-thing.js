// Background
var background = [], boi, currentPosition = "images/boi.png", boiHelp = 0;

qj.run("House", function() {
	background[0] = qj({
		type: "image",
		src: "images/tiles.png",
		w: 1600, h: 1200,
		x: 0, y: 0
	});

	background[1] = qj({
		type: "image",
		src: "images/wall.png",
		w: 400, h: 70,
		x: 0, y: 45
	});

	background[2] = qj({
		type: "image",
		src: "images/wall.png",
		w: 400, h: 70,
		x: 450, y: 45
	});

	background[3] = qj({
		type: "image",
		src: "images/small-door.png",
		w: 50, h: 70,
		x: 400, y: 45
	});

	boi = qj({
		type: "image",
		src: "images/boi.png",
		w: 50, h: 50,
		x: 300, y: 300
	});

	return background;
}, function() {
	// Collisions with backgrounds + movement
	if ((qj.keydown[87]) || (qj.keydown[83]) || (qj.keydown[68]) || (qj.keydown[65])) {
		if ((boi.collide(background[1])) || (boi.collide(background[2])) || (boi.collide(background[3]))) {
			if (qj.keydown[87]) {
				boi.x += 1;
				boiHelp++;
			}
			else if (qj.keydown[68]) {
				boi.y += 1;
				boiHelp++;
			}
			else if (qj.keydown[83]) {
				boi.x += 1;
				boiHelp++;
			}
			else if (qj.keydown[65]) {
				boi.y += 1;
				boiHelp++;
			}
		}
		else {
			if (qj.keydown[87]) {
				boi.y -= 5;
				boiHelp++;
			}
			else if (qj.keydown[68]) {
				boi.x += 5;
				boiHelp++;
			}
			else if (qj.keydown[83]) {
				boi.y += 5;
				boiHelp++;
			}
			else if (qj.keydown[65]) {
				boi.x -= 5;
				boiHelp++;
			}
		}
	}

	if (boiHelp == 10) {
		boiHelp = 0;
		if (boi.src == "images/boi.png") { boi.src = "images/boi2.png"; }
		else { boi.src = "images/boi.png"; }
	}

	if ((boi.x + 50) > qj.width) {
		for (i = 0; i < background.length; i++) { background[i].x -= 5; }
		boi.x -= 5;
	}
	else if ((boi.x) < 0) {
		for (i = 0; i < background.length; i++) { background[i].x += 5; }
		boi.x += 5;
	}
});

qj.stage = "House";