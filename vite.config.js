import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import autoprefixer from 'autoprefixer';
import { pugPlugin } from './vite/pug-plugin.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');

	return {
		plugins: [pugPlugin()],
		css: {
			postcss: {
				plugins: [autoprefixer()],
			},
		},
		build: {
			outDir: 'dist',
			emptyOutDir: true,
			assetsDir: 'assets',
		},
		server: {
			port: Number(env.VITE_DEV_SERVER_PORT) || 5173,
			strictPort: false,
		},
		preview: {
			port: Number(env.VITE_PREVIEW_PORT) || 4173,
		},
	};
});
