const Express = require('express');
const axios = require('axios');
const application = Express();

// Middlewares
application.use(Express.json());

// Endpoints
application.post('/events', async (request, response) => {
	const { type, data } = request.body;

	if (type === 'CommentCreated') {
		const status = data.content.includes('orange') ? 'rejected' : 'approved';

		await axios.post('http://localhost:4005/events', {
			type: 'CommentModerated',
			data: {
				id: data.id,
				status,
				postId: data.postId,
				content: data.content,
			},
		});
	}

	response.send({});
});

application.listen(4003, () => {
	console.log('Listening on port 4003');
});
