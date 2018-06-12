var cards = [],
villain, villainBreathe = 0,
goodBoi,
people = [],
enemyIsAttacking = false, playerIsAttacking = false,
damageDoneEnemy = 20, damageDoneSelf = 20;

var stats = {
	health: 100,
	enemy: 170
};

var enemyActions = ["doughnut.png", "ice-cream.png"];

function SwitchCard(card) {
	b = card;
	currentId = b.id;
	b.id = Random(0, 100);
	b.style.filter = "grayscale(100%)";

	for (i = 0; i < cardsInfo.length; i++) {
		b.removeEventListener("click", cardsInfo[i].action);
	}

	c = Random(0, cardsInfo.length - 1);

	setTimeout(function () {
		b.style.animation = "cardUsed 0.5s infinite";

		setTimeout(function () {
			b.addEventListener("click", cardsInfo[c].action);
			b.src = cardsInfo[c].image;
			b.style.filter = "";

			setTimeout(function () {
				b.style.animation = "";
				b.id = currentId;
			}, 20);
		}, 499);
	}, 3500);
}

function AddHealth() {
	thing1.style.animation = "bar 2s infinite";
	setTimeout(function() {
		thing1.style.animation = "";

		hpPlus.style.animation = "hpPlus 2s infinite";
		hpPlus.show();

		setTimeout(function () { hpPlus.style.animation = ""; hpPlus.hide(); }, 2000);
	}, 2000);
}

function SwitchTurn(text) {
	turn.text = text;
	turn.show();
	turn.style.animation = "turn 2s infinite";

	if (text !== "Your Turn") {
		setTimeout(function () {
			attack.src = "images/" + enemyActions[Random(0, 1)];
			enemyIsAttacking = true;

			tip.show();

			setTimeout(function () { attack.hide(); enemyIsAttacking = false; SwitchTurn("Your Turn"); }, 7000);
		}, 500);

		blocker.show();
	}
	else {
		blocker.hide();
		tip.hide();
	}
	
	setTimeout(function () {
		turn.style.animation = "";
		turn.hide();
	}, 2000);
}

function DamageEnemy() {
	villain.style.animation = "enemyHurt 0.25s infinite";
	enemyHpMinus.style.animation = "hpPlus 2s infinite";
	enemyHpMinus.show();

	punch.play();

	setTimeout(function () { villain.style.animation = ""; }, 250);
	setTimeout(function () { enemyHpMinus.style.animation = ""; enemyHpMinus.hide(); }, 2000);
}

function UpdateStats() {
	cards[2].text = "You: " + stats.health + " HP";
	cards[3].text = "MegaCorp Spirit: " + stats.enemy + " HP";
}

qj.run("Cards", function () {
	fightBackground = qj({
		w: 800, h: 400,
		x: 0, y: 0,
		style: {
			backgroundColor: "white"
		}
	});

	furniture1 = qj({
		x: -100, y: 210,
		h: 200,
		type: "image",
		src: "images/iBed.png",
		style: {
			filter: "blur(2px)"
		}
	});

	// Animation Things
	thing1 = qj({
		w: 100, h: 40,
		x: 500, y: -40,
		text: "HP",
		style: {
			backgroundColor: "green", color: "white"
		}
	});

	hpPlus = qj({
		x: 480, y: 330,
		style: {
			animationTimingFunction: "ease-in-out",
			color: "green",
			zIndex: "3",
			fontSize: "2rem",
			display: "none"
		},
		html: "<i class='fa fa-arrow-up'></i>&nbsp;&nbsp;HP UP!"
	});

	enemyHpMinus = qj({
		x: 100, y: 330,
		style: {
			animationTimingFunction: "ease-in-out",
			color: "red",
			zIndex: "3",
			fontSize: "2rem",
			display: "none"
		},
		html: "<i class='fa fa-arrow-down'></i>&nbsp;&nbsp;HP DOWN!"
	});

	hpMinus = qj({
		x: 440, y: 330,
		style: {
			animationTimingFunction: "ease-in-out",
			color: "red",
			zIndex: "3",
			fontSize: "2rem",
			display: "none"
		},
		html: "<i class='fa fa-arrow-down'></i>&nbsp;&nbsp;HP DOWN"
	});

	// Turn Indicator
	turn = qj({
		x: 200, y: 270,
		w: 400, h: 60,
		style: {
			backgroundColor: "rgba(0, 0, 0, 0.7)", color: "white",
			backdropFilter: "blur(3px)",
			animationTimingFunction: "ease-in-out",
			fontSize: "2rem",
			zIndex: "3",
			display: "none"
		},
		text: "MegaCorp Spririt's Turn"
	});

	// Attack Sprite
	attack = qj({
		type: "image",
		x: 100, y: 75,
		w: 75, h: 75,
		style: {
			display: "none"
		}
	});

	// Cards Area
	cards[0] = qj({
		w: 800, h: 200,
		x: 0, y: 400,
		style: {
			backgroundColor: "yellow", color: "black"
		}
	});

	cards[2] = qj({
		w: 350, h: 30,
		x: 50, y: 425,
		style: {
			backgroundColor: "green", color: "white",
			textAlign: "center"
		},
		text: "You: 100 HP"
	});

	cards[3] = qj({
		w: 350, h: 30,
		x: 400, y: 425,
		style: {
			backgroundColor: "red", color: "white",
			textAlign: "center"
		},
		text: "MegaCorp Spirit: 170 HP"
	});

	cards[4] = qj({
		w: 200, h: 300,
		x: 50, y: 475,
		type: "image",
		src: "cards/Card_EatYourVeggies.png",
		style: {
			boxShadow: "10px 10px 5px rgb(0, 0, 0)",
			cursor: "pointer",
			zIndex: "2"
		},
		hover: {
			transition: "top 0.2s, left 0.2s, box-shadow 0.2s",
			top: "265px", left: "40px",
			boxShadow: "30px 30px 30px rgb(0, 0, 0)",
		}
	});

	cards[5] = qj({
		w: 200, h: 300,
		x: 300, y: 475,
		type: "image",
		src: "cards/Card_SayNoToConk.png",
		style: {
			boxShadow: "10px 10px 5px rgb(0, 0, 0)",
			cursor: "pointer",
			zIndex: "2"
		},
		hover: {
			transition: "all 0.2s",
			top: "265px", left: "290px",
			boxShadow: "30px 30px 30px rgb(0, 0, 0)",
		}
	});

	cards[6] = qj({
		w: 200, h: 300,
		x: 550, y: 475,
		type: "image",
		src: "cards/Card_Research.png",
		style: {
			boxShadow: "10px 10px 5px rgb(0, 0, 0)",
			cursor: "pointer",
			zIndex: "2"
		},
		hover: {
			transition: "all 0.2s",
			top: "265px", left: "540px",
			boxShadow: "30px 30px 30px rgb(0, 0, 0)",
		}
	});

	// Card Blocker
	blocker = qj({
		w: 800, h: 150,
		x: 0, y: 450,
		style: {
			backgroundColor: "rgba(0, 0, 0, 0.7)",
			display: "none",
			zIndex: "3"
		}
	});

	// Battle Area
	villain = qj({
		w: 150, h: 300,
		x: 100, y: 25,
		type: "image",
		src: "images/VillainStand_R.png"
	});

	goodBoi = qj({
		w: 100,
		x: 500, y: 120,
		type: "image",
		src: "images/BoyStand_L.png"
	});

	tip = qj({
		x: 600, y: 400,
		text: "Press S to dodge attacks."
	});

	tip.hide();

	// Info Cards
	cardInfo = qj({
		x: 0, y: 0,
		w: 800, h: 600,
		html: "<div style='font-size: 2rem;'>Oh No!</div><br>Grandpa has been controlled by the MegaCorp Spirit, and has been eating unhealthy foods as a result!<br><br>As one with the Spirit of HealKnight, you must fight MegaCorp Spirit to help Grandpa.",
		style: {
			backgroundColor: "rgba(0, 0, 0, 0.7)", color: "white",
			backdropFilter: "blur(3px)",
			textAlign: "center",
			padding: "50px",
			display: "none",
			transition: "all 0.5s",
			zIndex: "3"
		}
	});

	fightButton = qj({
		x: 50, y: 560,
		w: 200,
		text: "Yes, I'm Ready",
		style: {
			color: "white", backgroundColor: "black",
			padding: "5px",
			cursor: "pointer",
			display: "none",
			zIndex: "4"
		},
		hover: {
			color: "yellow"
		}
	});

	fightButton.on("click", function() {
		fightButton.off();
		fightButton.hide();
		cardInfo.hide();

		// Assign Cards
		for (i = 0; i < 3; i++) {
			cards[i + 4].off();
			cards[i + 4].on("click", cardsInfo[i].action);
			cards[i + 4].src = cardsInfo[i].image;
		}
	});

	// Triangle
	threeSidedThing = qj({
		w: 35, h: 35,
		x: 725, y: 250,
		type: "image",
		src: "images/triangle.png",
		style: {
			animation: "threeSidedThing 1s infinite",
			cursor: "pointer",
			display: "none",
			zIndex: "4"
		}
	});

	threeSidedThing.on("click", function() {
		cardInfo.h = "400";
		cardInfo.html = "<div style='font-size: 2rem;'>Cards</div><br>These are your cards.<br><br>You play cards to either heal yourself or damage the MegaCorp Spirit.<br><br>You can hover over cards with your mouse to learn more about their abilities and click on cards to play them. This will perform whatever the ability of the card is.";

		threeSidedThing.off();
		threeSidedThing.on("click", function() {
			cardInfo.h = "200";
			cardInfo.style.top = "400px";
			cardInfo.style.paddingTop = "10px";
			cardInfo.html = "<div style='font-size: 2rem;'><i class='fa fa-arrow-up'></i>&nbsp;&nbsp;&nbsp;Battle Arena</div><br>This is where you get to see the battle. When the MagaCorp Spirit attacks, use the 'S' Key to dodge the attacks.<br><br>Are you ready for battle, " + sessionStorage.getItem("name") + "?";

			fightButton.show();
			threeSidedThing.hide();
		});
	});

	// Black thing
	blackdrop = qj({
		w: 800, h: 600,
		x: 0, y: 0,
		style: {
			opacity: "1.0",
			backgroundColor: "black"
		}
	});

	// You lost
	lost = qj({
		w: 800, h: 600,
		x: 0, y: 0,
		style: {
			opacity: "0",
			transition: "all 3s",
			backgroundColor: "rgba(0, 0, 0, 0.7)", color: "white",
			zIndex: "5",
			display: "none"
		},
		html: "<div style='display: block;'><div style='font-size: 2rem;'>You Lost</div><br>Press Ctrl + R to restart</div>"
	});
}, function() {
	villainBreathe++;

	// Health Check (lol)
	if (stats.health < 0) {
		enemyIsAttacking = false;
		document.getElementsByClassName("qj-container")[0].style.filter = "grayscale(100%)";
		setTimeout(function() {
			lost.show();
			lost.style.opacity = "1.0";
		}, 750);
	}

	if (stats.enemy < 0) {
		enemyIsAttacking = false;
		document.getElementsByClassName("qj-container")[0].style.filter = "grayscale(100%)";
		setTimeout(function () {
			lost.html = "<div style='display: block;'><div style='font-size: 2rem;'>You Win!</div>Thank you for completing the HealThem tutorial level. Thanks to you, Grandpa is now free of MegaCorp Spirit and is now on the road to recovery.</div>";
			lost.show();
			lost.style.opacity = "1.0";

			setTimeout(function() {
				blackCover.opacity = "0";
				blackCover.hide();
				won = true;
				qj.stage = "House";
			}, 1000);
		}, 750);
	}

	// Breathing Animations
	if (villainBreathe == 30) {
		villainBreathe = 0;

		if (villain.src == "images/VillainStand_R.png") { villain.src = "images/VillainStand_R2.png"; }
		else { villain.src = "images/VillainStand_R.png"; }

		if (goodBoi.src == "images/BoyStand_L.png") { goodBoi.src = "images/BoyStand_L2.png"; }
		else if(goodBoi.src == "images/BoyStand_L2.png") { goodBoi.src = "images/BoyStand_L.png"; }
	}

	// Stuff happens
	if (fadingIntoCardGame) {
		console.log("Smth");
		a -= 0.02;
		cardInfo.style.display = "block";
		threeSidedThing.show();
		blackdrop.style.opacity = a;
	}

	// Attacking Stuff
	if (enemyIsAttacking) {
		attack.show();

		if (attack.x > 900) { attack.x = 100; }
		else { attack.x += 4; }

		if (attack.collide(goodBoi)) {
			attack.x = 100;
			punch.play();

			stats.health -= damageDoneEnemy;
			UpdateStats();

			goodBoi.style.animation = "boiHurt 0.25s infinite";

			hpMinus.style.animation = "hpPlus 0.75s infinite";
			hpMinus.show();

			setTimeout(function () { hpMinus.style.animation = ""; hpMinus.hide(); }, 750);
			setTimeout(function () { goodBoi.style.animation = ""; }, 250);
		}

		if (qj.keydown[83]) {
			goodBoi.y = 156;
			goodBoi.src = "images/BoyCrouch.png";
		}
		else {
			goodBoi.y = 126;
			goodBoi.src = "images/BoyStand_L.png";
		}
	}
});

// DEBUG CODE
/*a = 1.0;
fadingIntoCardGame = true;

qj.stage = "Cards";

setTimeout(function () {
	fadingIntoCardGame = false;
	cardInfo.style.display = "block";
	threeSidedThing.show();
	blackdrop.hide();
}, 1000);*/
// END OF DEBUG CODE