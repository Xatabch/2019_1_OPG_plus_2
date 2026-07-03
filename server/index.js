import express from 'express';
import morgan from 'morgan';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.resolve(__dirname, '..', 'dist');

const app = express();

app.use(morgan('dev'));
app.use(express.static(distPath));

app.get('/{*splat}', (_req, res) => {
	res.sendFile(path.join(distPath, 'index.html'));
});

const port = Number(process.env.PORT) || 8001;

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
