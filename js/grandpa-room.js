var wasSpacePressed = 0;

qj.run("GrandpaRoom", function() {
	floor = qj({
		x: 0, y: 0,
		w: 800, h: 600,
		style: { backgroundImage: "url('img/wood.png')", backgroundPosition: floorX + "px " + floorY + "px" }
	});

	pixels = qj({
		x: 0, y: 0,
		w: 800, h: 600,
		type: "image",
		src: "img/art/oldman.png"
	});

	// Helper
	{
		tutorialHelper = qj({
			html: 'You see your Grandpa lying on the floor, with a bag of Popato Chisps next to him.',
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
			tutorialHelper.html = "A dark body looms over him. Something within you starts pulsating..."

			tutorialTriangle.off();
			tutorialTriangle.on("click", function() {
				tutorialHelper.html = "... it's your <span style='color: yellow'>SPIRIT OF HEALTHKNIGHT</span>!";

				tutorialTriangle.off();
				tutorialTriangle.on("click", function() {
					tutorialHelper.html = "Sensing this, the dark body hovers to you. This means...";
					
					tutorialTriangle.off();
					tutorialTriangle.on("click", function() {
						tutorialHelper.html = "... IT'S TIME TO FIGHT IT.";
						
						tutorialTriangle.off();
						tutorialTriangle.on("click", function() {
							tutorialTriangle.off(); music1.pause();

							whitestuff.style.animation = "fadeIn 3s infinite";
							whitestuff.show();
							teleportSound.play();

							setTimeout(function() {
								sessionStorage.setItem("enemyId", "megacorp");
								sessionStorage.setItem("showTutorial", "true");
								qj.stage = "Battle";
							}, 1500);
						});
					});
				});
			});
		});
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
}, function() {
	wasSpacePressed++;

	// Keyboard
	if (qj.keydown[32]) {
		if (wasSpacePressed > 60) {
			wasSpacePressed = 0;
			tutorialTriangle.click();
		}
	}
});