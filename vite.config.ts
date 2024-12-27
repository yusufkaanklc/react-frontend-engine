import react from "@vitejs/plugin-react";
import autoprefixer from "autoprefixer";
import path from "node:path";
import tailwindcss from "tailwindcss";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

import { peerDependencies } from "./package.json";

const ReactCompilerConfig = {
	/* ... */
};

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		lib: {
			entry: "./src/index.ts", // Specifies the entry point for building the library.
			name: "react-frontend-engine", // Sets the name of the generated library.
			fileName: (format) => `index.${format}.js`, // Generates the output file name based on the format.
			formats: ["cjs", "es"], // Specifies the output formats (CommonJS and ES modules).
		},
		rollupOptions: {
			external: [...Object.keys(peerDependencies)], // Defines external dependencies for Rollup bundling.
			output: {
				assetFileNames: "theme.css", // CSS dosyasının adını belirtiyoruz.
			},
		},

		sourcemap: true, // Generates source maps for debugging.
		emptyOutDir: true,
	},
	optimizeDeps: {
		include: ["react-dropzone-kit"],
		exclude: ["react-hook-form", "zod"],
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"#": path.resolve(__dirname, "./"),
		},
	},
	plugins: [
		react({
			babel: {
				plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]],
			},
		}),
		dts(),
	],
	css: {
		postcss: {
			plugins: [tailwindcss(), autoprefixer()],
		},
	},
});
