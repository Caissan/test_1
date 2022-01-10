import express from 'express';
import cors from 'cors';
import { idGenerator, nameGenerator } from './helpers/index.js';

const app = express();
app.use(cors());

app.get('/api/items', (req, res) => {
	const length = parseInt(req.query.count)
		|| Math.round(Math.random() * 49000) + 1000;

	const responseArray = Array.from({ length }, () => ({
		id: idGenerator(),
		name: nameGenerator(),
		items: Array.from({ length: Math.floor(Math.random() * 20) + 1 }, () => ({
			id: idGenerator(),
			name: nameGenerator()
		}))
	}));

	res.json(responseArray);
});

app.listen(3001, () => {
	console.clear();
	console.log('\u001b[34mСервер тестового задания');
	console.log('\u001b[37m- Статус: \u001b[32monline\u001b[0m\n');
});