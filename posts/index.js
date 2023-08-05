const Express = require('express');
const { randomBytes } = require('crypto');
const axios = require('axios');
const cors = require('cors');

const application = Express();
application.use(cors());
application.use(Express.json());

const posts = {};

application.get('/posts', (request, response) => {
	response.send(posts);
});

// Create a post.
application.post('/posts', async (request, response) => {
	const id = randomBytes(4).toString('hex');
	const { title } = request.body;

	// Create and apprend the new post;
	posts[id] = {
		id,
		title,
	};

	await axios.post('http://localhost:4005/events', {
		type: 'PostCreated',
		data: { id, title },
	});

	response.status(201).send(posts[id]);
});

application.post('/events', (request, response) => {
	console.log('Event received:', request.body.type);

	response.send({});
});

application.listen('4000', () => {
	console.log(`Listening on port 4000`);
});
