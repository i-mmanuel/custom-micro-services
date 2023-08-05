const Express = require('express');
const axios = require('axios');
const cors = require('cors');

const application = Express();
application.use(cors());
application.use(Express.json());

const posts = {};

const handleEvent = (type, data) => {
	// Check post crated and add to DB
	if (type === 'PostCreated') {
		const { id, title } = data;

		posts[id] = { id, title, comments: [] };
	}

	// Check comment created and add to DB
	if (type === 'CommentCreated') {
		const { id, content, postId } = data;

		const post = posts[postId];
		post.comments.push({ id, content });
	}

	if (type === 'CommentUpdated') {
		const { id, content, postId, status } = data;

		const post = posts[postId];

		const comment = post.comments.find(comment => comment.id === id);

		comment.status = status;
		comment.content = content;
	}
};

application.get('/posts', (request, response) => {
	response.send(posts);
});

application.post('/events', (request, response) => {
	const { type, data } = request.body;

	handleEvent(type, data);

	response.send({});
});

application.listen(4002, async () => {
	console.log('Listening on port 4002');

	try {
		const response = await axios.get('http://localhost:4005/events');

		for (let event of response.data) {
			console.log(`Processing event: ${event.type}`);

			handleEvent(event.type, event.data);
		}
	} catch (error) {
		console.error(error);
	}
});
