var wasSpacePressed = 0;
var pixels = [];

qj.run("GrandpaOK", function() {
	floor = qj({
		x: 0, y: 0,
		w: 800, h: 600,
		style: { backgroundImage: "url('img/wood.png')", backgroundPosition: floorX + "px " + floorY + "px" }
	});

	pixels[2] = qj({
		x: 0, y: 0,
		w: 800, h: 600,
		type: "image",
		src: "img/art/oldmansitting.png"
	});

	pixels[1] = qj({
		x: 0, y: 0,
		w: 800, h: 600,
		type: "image",
		src: "img/art/oldmangetup.png"
	});

	pixels[0] = qj({
		x: 0, y: 0,
		w: 800, h: 600,
		type: "image",
		src: "img/art/oldmanhumpfloor.png"
	});

	// Helper
	{
		tutorialHelper = qj({
			html: '...',
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
			tutorialHelper.html = "Ugh..."

			tutorialTriangle.off();
			tutorialTriangle.on("click", function() {
				tutorialHelper.html = "(Grandpa is coming around...)";

				tutorialTriangle.off();
				tutorialTriangle.on("click", function() {
					tutorialHelper.html = "(He's getting up...)";
					
					tutorialTriangle.off();
					tutorialTriangle.on("click", function() {
						tutorialHelper.html = "<span style='color: yellow;'>Grandpa:</span><br>Thanks, my dear grandchild.";
						
						tutorialTriangle.off();
						tutorialTriangle.on("click", function() {
							tutorialHelper.html = "<span style='color: yellow;'>Grandpa:</span><br>If it weren't for you, well...";
						
							tutorialTriangle.off();
							tutorialTriangle.on("click", function() {
								tutorialHelper.html = "<span style='color: yellow;'>Grandpa:</span><br>Let's just say things may not have went well.";
							
								tutorialTriangle.off();
								tutorialTriangle.on("click", function() {
									tutorialHelper.html = "<span style='color: yellow;'>Grandpa:</span><br>Have this, my grandchild.";
								
									tutorialTriangle.off();
									tutorialTriangle.on("click", function() {
										newCardSound.play();
										sessionStorage.setItem("unlockedAttacks", 1);
										blackstuff.show(); textThing.show(); imgThing.show(); buttonThing.show();
									});
								});
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
		blackstuff = qj({
			x: 0, y: 0,
			h: 600, w: 800,
			style: {
				backgroundColor: "rgba(0, 0, 0, 0.7)",
				display: "none"
			}
		});

		textThing = qj({
			w: 800,
			x: 0, y: 100,
			text: "New Card Unlocked!",
			style: {
				textAlign: "center", color: "white", fontSize: "36px",
				display: "none"
			}
		});

		imgThing = qj({
			x: 300, y: 175,
			type: "image",
			src: "img/attacks/Card_Checkup.png",
			style: { display: "none" }
		});

		buttonThing = qj({
			w: 250,
			x: 275, y: 450,
			text: "Continue",
			style: { display: "none", fontSize: "1.25rem", color: "black", backgroundColor: "white", padding: "10px", borderRadius: "5px", cursor: "pointer" },
			hover: { transition: "0.25s", backgroundColor: "grey" }
		});

		buttonThing.on("click", function() {
			blackstuff.hide(); textThing.hide(); imgThing.hide(); buttonThing.hide();
			tutorialHelper.html = "<span style='color: yellow;'>Grandpa:</span><br>I saw your sister heading out just now. Go out and take care of her, maybe escort her home.";
			
			tutorialTriangle.off();
			tutorialTriangle.on("click", function() {
				qj.stage = "Game";
			});
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