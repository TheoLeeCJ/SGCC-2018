// Background
var background = [], boi, currentPosition = "images/boi.png", boiHelp = 0,
previousKeyStrokes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

qj.run("House", function() {
	background[0] = qj({
		style: {
			backgroundColor: "rgb(236, 141, 57)"
		},
		w: 1600, h: 1200,
		x: 0, y: 0
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
		src: "images/boi.png",
		w: 50, h: 50,
		x: 300, y: 300
	});

	return background;
}, function() {
	// Collisions with backgrounds + movement
	if ((boi.collide(background[1])) || (boi.collide(background[2])) || (boi.collide(background[3])) || (boi.collide(background[4]))) {
		previous = 0;
		for (i = 45; i < previousKeyStrokes.length; i++) {
			if (previousKeyStrokes[i - 1] == previousKeyStrokes[i]) { previous++; }
		}

		if (i > 10) {
			if (previousKeyStrokes[59] == 87) { boi.x -= 1; boi.y += 2; boiHelp++; }
			else if (previousKeyStrokes[59] == 83) { boi.x += 1; boi.y -= 2; boiHelp++; }
			else if (previousKeyStrokes[59] == 65) { boi.y -= 1; boi.x += 2; boiHelp++; }
			else if (previousKeyStrokes[59] == 68) { boi.y += 1; boi.x -= 2; boiHelp++; }
		}
	}
	else {
		if (qj.keydown[87]) { boi.y -= 5; boiHelp++; previousKeyStrokes.shift(); previousKeyStrokes.push(87);  }
		else if (qj.keydown[83]) { boi.y += 5; boiHelp++; previousKeyStrokes.shift(); previousKeyStrokes.push(83); }
		else if (qj.keydown[65]) { boi.x -= 5; boiHelp++; previousKeyStrokes.shift(); previousKeyStrokes.push(65); }
		else if (qj.keydown[68]) { boi.x += 5; boiHelp++; previousKeyStrokes.shift(); previousKeyStrokes.push(68); }
	}

	// Walking Animation
	if (boiHelp == 10) {
		boiHelp = 0;
		if (boi.src == "images/boi.png") { boi.src = "images/boi2.png"; }
		else { boi.src = "images/boi.png"; }
	}

	// Scroll the screen
	if ((boi.x + 50) > qj.width) {
		for (i = 0; i < background.length; i++) { background[i].x -= 5; }
		boi.x -= 5;
	}
	else if ((boi.x) < 0) {
		for (i = 0; i < background.length; i++) { background[i].x += 5; }
		boi.x += 5;
	}
	else if ((boi.y + 50) > qj.height) {
		for (i = 0; i < background.length; i++) { background[i].y -= 5; }
		boi.y -= 5;
	}
	else if ((boi.y) < 0) {
		for (i = 0; i < background.length; i++) { background[i].y += 5; }
		boi.y += 5;
	}
});

qj.stage = "House";