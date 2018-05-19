var cards = [],
villain, villainBreathe = 0,
goodBoi,
people = [];

qj.run("Cards", function () {
	fightBackground = qj({
		w: 800, h: 400,
		x: 0, y: 0,
		style: {
			backgroundColor: "white"
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
		text: "Opponent: 500 HP"
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
			cardInfo.html = "<div style='font-size: 2rem;'><i class='fa fa-arrow-up'></i>&nbsp;&nbsp;&nbsp;Battle Arena</div><br>This is where you get to see MegaCorp Spirit getting defeated by you. When the MagaCorp Spirit attacks, use the Down Arrow Key to dodge the attacks.<br><br>Are you ready for battle, " + sessionStorage.getItem("name") + "?";

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
}, function() {
	villainBreathe++;

	// Breathing Animations
	if (villainBreathe == 30) {
		villainBreathe = 0;

		if (villain.src == "images/VillainStand_R.png") { villain.src = "images/VillainStand_R2.png"; }
		else { villain.src = "images/VillainStand_R.png"; }

		if (goodBoi.src == "images/BoyStand_L.png") { goodBoi.src = "images/BoyStand_L2.png"; }
		else { goodBoi.src = "images/BoyStand_L.png"; }
	}

	// Stuff happens
	if (fadingIntoCardGame) {
		console.log("Smth");
		a -= 0.02;
		blackdrop.style.opacity = a;
	}
});

// DEBUG CODE
a = 1.0;
fadingIntoCardGame = true;

qj.stage = "Cards";

setTimeout(function () {
	fadingIntoCardGame = false;
	cardInfo.style.display = "block";
	threeSidedThing.show();
	blackdrop.hide();
}, 1000);
// END OF DEBUG CODE