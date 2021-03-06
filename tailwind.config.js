module.exports = {
	content: [
		"./assets/*.liquid",
		"./layout/*.liquid",
		"./sections/*.liquid",
		"./snippets/*.liquid",
		"./templates/*.{liquid,json}",
		"./templates/**/*.{liquid,json}",
	],
	theme: {
		extend: {
			height: {
				"10v": "10vh",
				"20v": "20vh",
				"30v": "30vh",
				"40v": "40vh",
				"50v": "50vh",
				"60v": "60vh",
				"70v": "70vh",
				"80v": "80vh",
				"90v": "90vh",
				"100v": "100vh",
				"94": "22rem"
			},
		},
	},
	plugins: [],
};
