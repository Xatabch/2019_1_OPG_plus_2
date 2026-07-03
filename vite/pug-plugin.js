import path from 'node:path';
import { fileURLToPath } from 'node:url';
import pug from 'pug';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC_ROOT = path.resolve(__dirname, '../src');

export function pugPlugin() {
	return {
		name: 'vite-plugin-pug',
		enforce: 'pre',
		transform(source, id) {
			if (!id.endsWith('.pug')) {
				return null;
			}

			const template = pug.compileFileClient(id, {
				basedir: SRC_ROOT,
				pretty: true,
			});

			return {
				code: `export default ${template}`,
				map: null,
			};
		},
	};
}
