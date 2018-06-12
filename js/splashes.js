var splashesThings = [];
var splashes = 1;

qj.run("Splashes", function() {
	qj({
		x: 0, y: 0,
		w: 800, h: 600,
		style: { backgroundColor: "black" }
	});

	splashesThings[0] = qj({
		x: 100, y: 100,
		w: 600, h: 400,
		type: "image",
		src: "img/logos/sponsors1.png",
		style: { animation: "1s fadeIn forwards" }
	});

	setTimeout(function() {
		splashesThings[1] = setInterval(function() {
			splashes++;
			splashesThings[0].src = "img/logos/sponsors" + splashes + ".png";
	
			if (splashes == 4) {
				clearInterval(splashesThings[1]);
	
				setTimeout(function() {
					splashesThings[0].style.animation = "1s fadeOut forwards";
	
					setTimeout(function() {
						splashesThings[0].src = "img/logos/sponsors5.png";
						splashesThings[0].style.animation = "1s fadeIn forwards";
	
						setTimeout(function() {
							qj.stage = "Game";
						}, 1500);
					}, 1000);
				}, 1000);
			}
		}, 750);
	}, 2000);
});