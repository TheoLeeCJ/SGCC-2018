var wasSpacePressed = 0, animating = false;

qj.run("Outside", function() {
	floor = qj({
		x: 0, y: 0,
		w: 800, h: 600,
		style: { backgroundImage: "url('img/wood.png')", backgroundPosition: floorX + "px " + floorY + "px" }
	});

	pixels[1] = qj({
		x: 0, y: 0,
		w: 800, h: 600,
		type: "image",
		src: "img/art/sister.png"
	});

	pixels[0] = qj({
		x: 0, y: 0,
		w: 800, h: 600,
		type: "image",
		src: "img/art/flats.png"
	});

	lightsOut = qj({
		x: 0, y: 0,
		w: 800, h: 600,
		style: { backgroundColor: "rgba(0, 0, 0, 0.7)", display: "none" }
	});

	sugarboi = qj({
		x: 260, y: -200,
		type: "image",
		src: "img/enemies/sugarboi.gif"
	});

	// Helper
	{
		tutorialHelper = qj({
			html: 'You head outside. Your sister must probably be at the neighbourhood convenience store again, buying candy.',
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
			pixels[0].hide();
			tutorialHelper.html = "And lo and behold, there she is, her eyes gleaming, candy in her hands."

			tutorialTriangle.off();
			tutorialTriangle.on("click", function() {
				tutorialHelper.html = "Laughing heartily, you escort her home.";

				tutorialTriangle.off();
				tutorialTriangle.on("click", function() {
					tutorialHelper.html = "However, something doesn't feel too right.";
					
					tutorialTriangle.off();
					tutorialTriangle.on("click", function() {
						tutorialHelper.html = "Oh dear.";
						
						tutorialTriangle.off();
						tutorialTriangle.on("click", function() {
							tutorialHelper.html = "It's your <span style='color: yellow'>SPIRIT OF HEALTHKNIGHT</span>! It sense the sweets your sister is carrying having disastrously high sugar content!";	
							
							tutorialTriangle.off();
							tutorialTriangle.on("click", function() {
								animating = true;

								setTimeout(function() {
									tutorialHelper.html = "SUGARBOI ATTACKS! It's time to fight.";

									tutorialTriangle.on("click", function() {
										tutorialTriangle.off();
											whitestuff.style.animation = "fadeIn 3s infinite";
											whitestuff.show();
											teleportSound.play();

											setTimeout(function() {
												sessionStorage.setItem("enemyId", "sugarboi");
												sessionStorage.setItem("showTutorial", "false");
												qj.stage = "Battle2";
										}, 1500);
									});
								}, 3000);
								
								tutorialTriangle.off();
							});
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

	// Animating
	if (animating === true) {
		sugarboi.y += 3;
		switchSound.play();

		if (sugarboi.y > 200) {
			animating = false;
			lightsOut.show();
		}
	}

	// Keyboard
	if (qj.keydown[32]) {
		if (wasSpacePressed > 60) {
			wasSpacePressed = 0;
			tutorialTriangle.click();
		}
	}
});