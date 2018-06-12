var storyButtons = [];
var storyThings = [
	{
		text: "But the cars sure don't seem to be hovering far off the ground. Why is that so?",
		img: "story1.png"
	},
	{
		text: "Because of the people inside them. Humans has been spoiled by technology, and are now fat and lazy. The rise of Consumerism hasn't helped too.",
		img: "story3.png"
	},
	{
		text: "But you are special. You want change. The spirit of HealthKnight is burning within you.",
		img: "story4.png"
	},
	{
		text: "You need to <b>HealThem</b>.",
		img: "story5.png"
	}
];
var story = -1;

qj.run("Story", function() {
	storyButtons[0] = qj({
		x: 0, y: 0,
		w: 800, h: 500,
		type: "image",
		src: "img/story1.png"
	});

	storyButtons[1] = qj({
		x: 0, y: 500,
		w: 800, h: 100,
		style: { backgroundColor: "yellow", color: "black", padding: "10px", fontSize: "1.1rem", display: "block" },
		text: "The year is 2100, AD. Science, Technology and Engineering have brought unto humans greater prosperity than ever before. Hover cars fill the roads."
	});

	storyButtons[2] = qj({
		w: 200,
		x: 590, y: 550,
		style: { fontSize: "1.1rem", color: "black", backgroundColor: "white", padding: "10px", borderRadius: "5px", cursor: "pointer" },
		hover: { transition: "0.25s", backgroundColor: "grey" },
		text: "Next >"
	});

	storyButtons[2].on("click", function() {
		buttonSound.play();
		story++;

		storyButtons[1].html = storyThings[story].text;
		storyButtons[0].src = "img/" + storyThings[story].img;

		if (story == 3) {
			storyButtons[2].off();
			storyButtons[2].text = "Start >";
			storyButtons[2].on("click", function() {
				buttonSound.play();
				qj.stage = "Splashes";
			});
		}
	});
});