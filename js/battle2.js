var lanes = [];
var boundaries = [];
var projectiles = [];
var boundaries = [];
var projectileHelper = [];
var covers = [];
var projectileSpeed = [2.25, 2.25, 2.25];
var attackUI = [];
var loaderCode = `<div id="NextAttackTimer" class="radial-progress" data-progress="0">
	<div class="circle">
		<div class="mask full">
			<div class="fill"></div>
		</div>
		<div class="mask half">
			<div class="fill"></div>
			<div class="fill fix"></div>
		</div>
	</div>
	<div class="inset">
		<div class="percentage">
			<div class="numbers"><span>-</span><span>0%</span><span>1%</span><span>2%</span><span>3%</span><span>4%</span><span>5%</span><span>6%</span><span>7%</span><span>8%</span><span>9%</span><span>10%</span><span>11%</span><span>12%</span><span>13%</span><span>14%</span><span>15%</span><span>16%</span><span>17%</span><span>18%</span><span>19%</span><span>20%</span><span>21%</span><span>22%</span><span>23%</span><span>24%</span><span>25%</span><span>26%</span><span>27%</span><span>28%</span><span>29%</span><span>30%</span><span>31%</span><span>32%</span><span>33%</span><span>34%</span><span>35%</span><span>36%</span><span>37%</span><span>38%</span><span>39%</span><span>40%</span><span>41%</span><span>42%</span><span>43%</span><span>44%</span><span>45%</span><span>46%</span><span>47%</span><span>48%</span><span>49%</span><span>50%</span><span>51%</span><span>52%</span><span>53%</span><span>54%</span><span>55%</span><span>56%</span><span>57%</span><span>58%</span><span>59%</span><span>60%</span><span>61%</span><span>62%</span><span>63%</span><span>64%</span><span>65%</span><span>66%</span><span>67%</span><span>68%</span><span>69%</span><span>70%</span><span>71%</span><span>72%</span><span>73%</span><span>74%</span><span>75%</span><span>76%</span><span>77%</span><span>78%</span><span>79%</span><span>80%</span><span>81%</span><span>82%</span><span>83%</span><span>84%</span><span>85%</span><span>86%</span><span>87%</span><span>88%</span><span>89%</span><span>90%</span><span>91%</span><span>92%</span><span>93%</span><span>94%</span><span>95%</span><span>96%</span><span>97%</span><span>98%</span><span>99%</span><span>OK!</span></div>
		</div>
	</div>
</div>`;
var attackTimer = 0, enemyInfo = null, attackProgress = 100, a, projectilesMoving = [false, false, false], wasSpacePressed = 0, redirectSpacebar = "", health = 100, enemyHealth = 110, isMovingLanes = false, lane = 0;

// TO-DO
// ...

function InitBattle() {
	projectileSpeed = [2.25, 2.25, 2.25];
	attackTimer = 0, attackProgress = 100, a, projectilesMoving = [false, false, false], wasSpacePressed = 0, redirectSpacebar = "", health = 100, enemyHealth = 110, isMovingLanes = false, lane = 0;

	qj.run("Battle2", function() { mountain.play();
		enemyInfo = enemiesInfo[sessionStorage.getItem("enemyId")];

		floor = qj({
			x: 0, y: 0,
			w: 800, h: 600,
			style: { backgroundColor: "white" }
		});

		// Lanes
		{
			lanes[0] = qj({
				w: 100, h: 290,
				x: 253, y: 195,
				style: { border: "3px solid black", backgroundColor: "rgba(0, 0, 0, 0.3)" }
			});

			lanes[1] = qj({
				w: 100, h: 290,
				x: 350, y: 195,
				style: { border: "3px solid black", backgroundColor: "rgba(0, 0, 0, 0.3)" }
			});

			lanes[2] = qj({
				w: 100, h: 290,
				x: 447, y: 195,
				style: { border: "3px solid black", backgroundColor: "rgba(0, 0, 0, 0.3)" }
			});
		}

		// Projectiles
		{
			projectiles[0] = qj({
				w: 36, h: 36,
				type: "image",
				src: "img/projectiles/hamburger.png",
				x: 285, y: 150,
				style: { display: "none" }
			});

			projectiles[1] = qj({
				w: 36, h: 36,
				type: "image",
				src: "img/projectiles/hamburger.png",
				x: 385, y: 150,
				style: { display: "none" }
			});

			projectiles[2] = qj({
				w: 36, h: 36,
				type: "image",
				src: "img/projectiles/hamburger.png",
				x: 480, y: 150,
				style: { display: "none" }
			});
		}

		// Covers
		{
			covers[0] = qj({
				w: 300, h: 50,
				x: 250, y: 145,
				style: { backgroundColor: "black" }
			});

			covers[1] = qj({
				w: 60, h: 50,
				x: 250, y: 485,
				style: { backgroundColor: "white" }
			});
		}

		// Coke, Broccoli
		{
			coke = qj({
				w: 32, h: 79,
				type: "image",
				src: "img/attacks/Conk.png"
			});

			coke.hide();

			broc = qj({
				w: 60, h: 60,
				x: 275, y: 300,
				type: "image",
				src: "img/attacks/broc.png"
			});

			broc.hide();

			hpUp = qj({
				x: 265, y: 440,
				text: "HP UP!",
				style: { color: "green", fontSize: "24px" }
			});

			hpUp.hide();
		}

		// Stats
		{
			statsBackground = qj({
				w: 200, h: 480,
				x: 20, y: 10,
				style: { border: "5px solid black", backgroundColor: "yellow", display: "block" },
				html: `
					<div style="font-size: 2rem; margin-top: 10px; text-align: center;">STATS</div>
					<hr style="border: 2.5px solid black">
					<div style="padding-left: 10px;">
						<div style="font-size: 1.2rem;">Your HP</div>
						<div style="font-size: 1.2rem; margin-top: 65px;">Enemy's HP</div>
						<div style="font-size: 1.2rem; margin-top: 65px;">Next Action:</div>
					</div>
				`
			});

			yourHP = qj({
				w: 180, h: 30,
				x: 30, y: 115,
				style: { backgroundColor: "darkgreen", color: "white", padding: "2.5px" },
				text: "100 / 100"
			});

			enemyHP = qj({
				w: 180, h: 30,
				x: 30, y: 205,
				style: { backgroundColor: "red", color: "white", padding: "2.5px" },
				text: "100 / 100"
			});

			a = qj({
				x: 10, y: 250,
				html: loaderCode
			});
		}

		enemy = qj({
			w: enemyInfo.w, h: enemyInfo.h,
			x: 400 - (enemyInfo.w / 2), y: 10,
			type: "image",
			src: enemyInfo.image
		});

		character = qj({
			w: 71, h: 50,
			x: 265, y: 380,
			type: "image",
			src: "img/proto/Stand_R.png",
			style: { transitionTimingFunction: "ease", transition: "0.25s all", objectFit: "cover", objectPosition: "50% 0" }
		});

		// Helper
		{
			tutorialHelper = qj({
				html: enemyInfo.initialText,
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
				if (sessionStorage.getItem("showTutorial") == "true") {
					tutorialTriangle.off();
					tutorialHelper.html = "But how do you fight?";

					tutorialTriangle.on("click", function() {
						tutorialTriangle.off();
						tutorialHelper.html = "Well, what better way to find out... than to actually fight?";

						tutorialTriangle.on("click", function() {
							tutorialHelper.html = "And so the fight begins... when you press the spacebar.";

							tutorialTriangle.on("click", function() {
								tutorialTriangle.off();
								tutorialTriangle.hide();
		
								DisplayProjectiles();
							});
						});
					});
				}
				else {
					tutorialHelper.html = "And so the fight begins... when you press the spacebar.";

					tutorialTriangle.on("click", function() {
						tutorialTriangle.off();
						tutorialTriangle.hide();

						DisplayProjectiles();
					});
				}
			});

			tutorialTriangle.element.setAttribute("onclick", "if (this.style.display !== 'none') { buttonSound.play(); }");
		}
		// End of helper

		// Choose Attack UI
		{
			attackUI[0] = qj({
				w: 800, h: 600,
				x: 0, y: 0,
				style: { opacity: "0.8", backgroundColor: "rgb(0, 0, 0)" }
			});

			attackUI[1] = qj({
				w: 800,
				x: 0, y: 5,
				text: "Choose Attack",
				style: { fontSize: "48px", color: "white", textAlign: "center" }
			});

			attackUI[2] = qj({
				h: 250,
				x: 100, y: 75,
				type: "image",
				src: "img/attacks/Card_SayNoToConk.png",
				hover: { border: "3px solid yellow", cursor: "pointer" }
			});

			attackUI[2].on("click", function() {
				HideAttackUI();
				
				// Execute Attack
				setTimeout(function() {
					enemyHealth -= 20;

					coke.show();
					coke.style.animation = "conk 1.5s forwards";

					setTimeout(function() {
						coke.hide();
						coke.style.animation = "";

						UpdateStats("enemy");
					}, 1500);
				}, 500);
			});

			attackUI[3] = qj({
				h: 250,
				x: 310, y: 75,
				type: "image",
				src: "img/attacks/Card_EatYourVeggies.png",
				hover: { border: "3px solid yellow", cursor: "pointer" }
			});

			attackUI[3].on("click", function() {
				HideAttackUI();

				// Execute Attack
				setTimeout(function() {
					health += 10;

					broc.show();
					broc.style.animation = "broc 1.5s forwards";

					setTimeout(function() {
						broc.hide();
						broc.style.animation = "";

						hpUp.show();
						hpUp.style.animation = "hpUp 1s forwards";

						setTimeout(function() {
							hpUp.hide();
							hpUp.style.animation = "";
						}, 1000);

						UpdateStats("character", "");
					}, 1500);
				}, 500);
			});

			attackUI[4] = qj({
				h: 250,
				x: 520, y: 75,
				type: "image",
				src: "img/attacks/Card_Locked.png",
				hover: { border: "3px solid yellow", cursor: "pointer" }
			});

			if (sessionStorage.getItem("unlockedAttacks") > 0) {
				attackUI[4].src = "img/attacks/Card_Checkup.png";
				attackUI[4].on("click", function() {
					HideAttackUI();
					
					// Execute Attack
				});
			}

			attackUI[5] = qj({
				h: 250,
				x: 100, y: 340,
				type: "image",
				src: "img/attacks/Card_Locked.png",
				hover: { border: "3px solid yellow", cursor: "pointer" }
			});

			if (sessionStorage.getItem("unlockedAttacks") > 1) {
				attackUI[5].src = "img/attacks/Card_Exercise.png";
				attackUI[5].on("click", function() {
					HideAttackUI();
					
					// Execute Attack
				});
			}

			attackUI[6] = qj({
				h: 250,
				x: 310, y: 340,
				type: "image",
				src: "img/attacks/Card_Locked.png",
				hover: { border: "3px solid yellow", cursor: "pointer" }
			});

			if (sessionStorage.getItem("unlockedAttacks") > 2) {
				attackUI[6].src = "img/attacks/Card_LessOil.png";
				attackUI[6].on("click", function() {
					HideAttackUI();
					
					// Execute Attack
				});
			}

			attackUI[7] = qj({
				h: 250,
				x: 520, y: 340,
				type: "image",
				src: "img/attacks/Card_Locked.png",
				hover: { border: "3px solid yellow", cursor: "pointer" }
			});

			if (sessionStorage.getItem("unlockedAttacks") > 3) {
				attackUI[7].src = "img/attacks/Card_Research.png";
				attackUI[7].on("click", function() {
					HideAttackUI();
					
					// Execute Attack
				});
			}
		}

		HideAttackUI();

		// Darken Screen
		darkener = qj({
			w: 800, h: 600,
			x: 0, y: 0,
			text: "You Won!",
			style: { backgroundColor: "rgba(0, 0, 0, 0.7)", color: "white", fontSize: "48px", display: "none", justifyItems: "middle" }
		});

		continueButton = qj({
			w: 250,
			x: 275, y: 340,
			text: "Continue",
			style: { display: "none", fontSize: "1.25rem", color: "black", backgroundColor: "white", padding: "10px", borderRadius: "5px", cursor: "pointer" },
			hover: { transition: "0.25s", backgroundColor: "grey" }
		});

		if (sessionStorage.getItem("showTutorial") == "true") {
			projectileHelper[0] = qj({
				w: 800, h: 600,
				type: "image",
				x: 0, y: 0,
				src: "img/projectiles/tutorial-overlay.png",
				style: { display: "none", opacity: "0.7" }
			});

			projectileHelper[1] = qj({
				x: 400, y: 285,
				style: { display: "none", color: "white", padding: "10px" },
				html: `These are <span style='color: yellow;'>PROJKECTILES</span>. They will rain down on you. Use the S and D keys to move yourself between lanes to avoid them.
				<div><span id="OK-1" style="float: right; text-decoration: underline; cursor: pointer;" onclick="projectileHelper[0].hide(); this.parentElement.parentElement.style.display = 'none'; projectilesMoving[0] = true; redirectSpacebar = 'OK-2';">OK (spacebar)</span></div>`
			});

			projectileHelper[2] = qj({
				w: 800, h: 600,
				type: "image",
				x: 0, y: 0,
				src: "img/projectiles/attack-overlay.png",
				style: { display: "none", opacity: "0.7" }
			});

			projectileHelper[3] = qj({
				x: 400, y: 285,
				style: { display: "none", color: "white", padding: "10px" },
				html: `This is your attack timer. When it is full, you can press the <span style="color: yellow;">Z</span> key to launch an attack.
				<div><span id="OK-2" style="float: right; text-decoration: underline; cursor: pointer;" onclick="projectileHelper[2].hide(); this.parentElement.parentElement.style.display = 'none'; projectilesMoving[0] = true; projectilesMoving[1] = true;">OK (spacebar)</span></div>`
			});
		}
	}, function() {
		wasSpacePressed++;
		if (!(attackProgress > 99)) attackTimer++;

		// Next Attack
		if (((attackTimer % 5) == 0) && !(attackProgress > 99)) {
			attackProgress++;
			document.getElementById("NextAttackTimer").setAttribute("data-progress", attackProgress);
		}

		// Randomly expand projectiles
		if (sessionStorage.getItem("showTutorial") !== "true") {
			if (Random(0, 200) == 5) {
				var a = Random(0, 2);
				var originalX = projectiles[a].x;
				var originalY = projectiles[a].y;
				var originalW = projectiles[a].w;
				var originalH = projectiles[a].h;

				projectiles[a].style.transition = "0.25s";
				projectiles[a].w *= 2;
				projectiles[a].h *= 2;
				projectiles[a].x -= projectiles[a].w / 4;
				projectiles[a].y -= projectiles[a].h / 4;
				projectiles[a].style.opacity = "0.25";

				setTimeout(function() {
					projectiles[a].x = originalX;
					projectiles[a].h = originalH;
					projectiles[a].w = originalW;
					projectiles[a].y = originalY;
					projectiles[a].style.transition = "0s";
					projectiles[a].y = 150;
					projectiles[a].style.opacity = "1.0";
				}, 250);
			}
		}

		// Projectile logic
		for (i = 0; i < projectilesMoving.length; i++) {
			if (projectilesMoving[i]) {
				projectiles[i].y += projectileSpeed[i];
		
				if (projectiles[i].collide(character)) { attackProgress -= 20; document.getElementById("NextAttackTimer").setAttribute("data-progress", attackProgress); health -= 10; UpdateStats("character"); projectiles[i].y = 150; }
				if (projectiles[i].y > 500) {
					projectiles[i].src = enemyInfo.attacks[Random(0, enemyInfo.attacks.length - 1)].image;
					projectiles[i].y = 150;
				}
			}
		}

		// Keyboard
		if (qj.keydown[32]) {
			if (wasSpacePressed > 60) {
				wasSpacePressed = 0;

				if (redirectSpacebar == "") { tutorialTriangle.click(); }
				else { document.getElementById(redirectSpacebar).click(); redirectSpacebar = ""; }
			}
		}

		if (qj.keydown[90] && (attackProgress > 99)) {
			projectilesMoving[0] = false; projectilesMoving[1] = false; projectilesMoving[2] = false;
			ShowAttackUI();
		}

		if (qj.keydown[68] && !isMovingLanes) {
			// Move left
			isMovingLanes = true;
			setTimeout(function() { isMovingLanes = false }, 250);
			if (lane !== 2) { character.x += 97; lane++; hpUp.x += 97; broc.x += 97; }
		}

		if (qj.keydown[65] && !isMovingLanes) {
			// Move right
			isMovingLanes = true;
			setTimeout(function() { isMovingLanes = false }, 250);
			if (lane !== 0) { character.x -= 97; lane--; hpUp.x -= 97; broc.x -= 97; }
		}
	});
}

InitBattle();