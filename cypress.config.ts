import { defineConfig } from "cypress";

export default defineConfig({
	component: {
		viewportWidth: 1280,
		viewportHeight: 720,
		devServer: {
			framework: "react",
			bundler: "vite",
		},
	},

	e2e: {
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
	},
});
