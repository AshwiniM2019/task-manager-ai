const express = require('express');

const app = express();
app.use(express.json());

let nextTaskId = 1;
const tasks = [];

app.get('/tasks', (req, res) => {
	res.json(tasks);
});

app.get('/tasks/:id', (req, res) => {
	const task = tasks.find((item) => item.id === Number(req.params.id));

	if (!task) {
		return res.status(404).json({ error: 'Task not found' });
	}

	return res.json(task);
});

app.post('/tasks', (req, res) => {
	const { title, description = '' } = req.body || {};

	if (typeof title !== 'string' || title.trim().length === 0) {
		return res.status(400).json({ error: 'A non-empty title is required' });
	}

	const task = {
		id: nextTaskId++,
		title: title.trim(),
		description: typeof description === 'string' ? description : '',
		completed: false,
		createdAt: new Date().toISOString(),
	};

	tasks.push(task);
	return res.status(201).json(task);
});

const port = process.env.PORT || 3000;

if (require.main === module) {
	app.listen(port, () => {
		console.log(`Task API listening on port ${port}`);
	});
}

module.exports = app;
