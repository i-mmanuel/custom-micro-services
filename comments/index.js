const Express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const application = Express();

// Middlewares
application.use(Express.json());
application.use(cors());

const commentsByPostsId = {};

// Create a comment
application.post('/posts/:id/comments', (request, response) => {
	const commentId = randomBytes(6).toString('hex');
	const { content } = request.body;

	const comments = commentsByPostsId[request.params.id] || [];

	comments.push({ id: commentId, content, status: 'pending' });

	commentsByPostsId[request.params.id] = comments;

	// To the event bus
	axios.post('http://localhost:4005/events', {
		type: 'CommentCreated',
		data: {
			id: commentId,
			content,
			postId: request.params.id,
			status: 'pending',
		},
	});

	response.status(201).send(comments);
});

// Create a post.
application.get('/posts/:id/comments', (request, response) => {
	response.send(commentsByPostsId[request.params.id] || []);
});

application.post('/events', async (request, response) => {
	console.log('Event received:', request.body.type);

	const { type, data } = request.body;

	if (type === 'CommentModerated') {
		const { postId, id, status, content } = data;
		const comments = commentsByPostsId[postId];

		const comment = comments.find(comment => comment.id === id);
		comment.status = status;

		axios.post('http://localhost:4005/events', {
			type: 'CommentUpdated',
			data: {
				id,
				content,
				status,
				postId,
				status,
			},
		});
	}
	response.send({});
});

application.listen('4001', () => {
	console.log(`Listening on port 4001`);
});
