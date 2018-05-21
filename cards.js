var cardsInfo = [
	{
		image: "cards/Card_EatYourVeggies.png",
		action: function () {
			blocker.show();
			stats.health += 10;
			AddHealth();
			UpdateStats();

			SwitchCard(this);

			setTimeout(function () { SwitchTurn("MegaCorp Spirit's Turn"); }, 4000);
		}
	},
	{
		image: "cards/Card_SayNoToConk.png",
		action: function () {
			blocker.show();
			stats.enemy -= damageDoneSelf;
			DamageEnemy();
			UpdateStats();

			SwitchCard(this);

			setTimeout(function () { SwitchTurn("MegaCorp Spirit's Turn"); }, 3500);
		}
	},
	{
		image: "cards/Card_SayNoToConk.png",
		action: function () {
			blocker.show();
			stats.enemy -= damageDoneSelf;
			DamageEnemy();
			UpdateStats();

			SwitchCard(this);

			setTimeout(function () { SwitchTurn("MegaCorp Spirit's Turn"); }, 3500);
		}
	},
	{
		image: "cards/Card_Research.png",
		action: function () {
			blocker.show();
			damageDoneEnemy--;

			turn.text = "Enemy does less damage now.";
			turn.show();
			turn.style.animation = "turn 2s infinite";

			SwitchCard(this);

			setTimeout(function () {
				turn.style.animation = "";
				turn.hide();
			}, 2000);

			setTimeout(function () { SwitchTurn("MegaCorp Spirit's Turn"); }, 3500);
		}
	},
	{
		image: "cards/Card_Exercise.png",
		action: function () {
			blocker.show();
			damageDoneSelf++;

			hpPlus.html = "<i class='fa fa-arrow-up'></i>&nbsp;&nbsp;DMG UP!";
			hpPlus.style.animation = "hpPlus 2s infinite";
			hpPlus.show();

			setTimeout(function() {
				hpPlus.style.animation = "";
			}, 2000);

			SwitchCard(this);

			UpdateStats();
			setTimeout(function () {
				hpPlus.html = "<i class='fa fa-arrow-up'></i>&nbsp;&nbsp;&nbsp;HP UP!";
				hpPlus.hide();
				SwitchTurn("MegaCorp Spirit's Turn"); 
			}, 3500);
		}
	},
	{
		image: "cards/Card_Checkup.png",
		action: function () {
			blocker.show();
			damageDoneEnemy--;

			turn.text = "Enemy does less damage now.";
			turn.show();
			turn.style.animation = "turn 2s infinite";

			SwitchCard(this);

			setTimeout(function () {
				turn.style.animation = "";
				turn.hide();
			}, 2000);

			setTimeout(function () { SwitchTurn("MegaCorp Spirit's Turn"); }, 3500);
		}
	},
	{
		image: "cards/Card_LessOil.png",
		action: function () {
			blocker.show();
			stats.enemy -= damageDoneSelf;
			DamageEnemy();
			UpdateStats();

			SwitchCard(this);

			setTimeout(function () { SwitchTurn("MegaCorp Spirit's Turn"); }, 3500);
		}
	},
	{
		image: "cards/Card_LessOil.png",
		action: function () {
			blocker.show();
			stats.enemy -= damageDoneSelf;
			DamageEnemy();
			UpdateStats();

			SwitchCard(this);

			setTimeout(function () { SwitchTurn("MegaCorp Spirit's Turn"); }, 3500);
		}
	}
];