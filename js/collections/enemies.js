var enemiesInfo = {
	megacorp: {
		image: "img/enemies/megacorp.png",
		w: 90, h: 180,
		initialText: "MegaCorp Spirit attacks your beloved grandpa! A fight is inevitable.",
		attacks: [
			{
				image: "img/projectiles/chips.png",
				special: 0
			}
		]
	},
	sugarboi: {
		image: "img/enemies/sugarboi.gif",
		w: 270, h: 180,
		initialText: "Sugar Boi sprinkles sugar on you! It feels disgusting. Time to fight this filthy beast. Be careful though - his projectiles may randomly expand.",
		attacks: [
			{
				image: "img/projectiles/sugar.png",
				special: 0
			},
			{
				image: "img/projectiles/candy.png",
				special: 0
			}
		]
	}
};