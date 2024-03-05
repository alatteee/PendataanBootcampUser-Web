/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			backgroundColor: {
				'primary': '#005183',
			  },
		},
	},
	daisyui: {
		themes: ['pastel'],
	},
	plugins: [require('daisyui')],
}
