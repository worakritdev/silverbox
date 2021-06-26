const config = {
	mode: "jit",
	purge: [
		"./src/**/*.{html,js,svelte,ts}",
	],
	theme: {
		extend: {},
	},
	plugins: [],
	variants:{
		extend: {
			boxSizing: ['hover', 'focus'],
		}
	}
};

module.exports = config;
