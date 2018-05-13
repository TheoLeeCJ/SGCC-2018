// Background
var background, boxers, pop;

qj.run("Background", function() {
	background = qj({
		type: 'image',
		src: "images/Sed boi.png",
		x: 0, y: 0,
		w: 800, h: 600
	});

	background.on("click", function() {
		qj.stage = "Background"
	});

	boxers = qj({
		x: 0, y: 0,
		w: 80, h: 80,
		style: {
			backgroundColor: "#2196f3"
		}
	});

	pop = qj({
		x: 80, y: 80,
		w: 80, h: 80,
		text: "Collided",
		style: {
			display: 'none'
		}
	});

	return [background, boxers, pop];
}, function() {
	if (boxers.x <= 0 && boxers.y > 0) boxers.y -= 5;
	else if (boxers.y >= qj.height - boxers.h) boxers.x -= 5;
	else if (boxers.x == qj.width - boxers.w) boxers.y += 5;
	else if (boxers.y <= 0) boxers.x += 5;

	if (boxers.collide(box)) {
		alert("Collide");
	}
});

qj.stage = "Background";