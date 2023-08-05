const Express = require('express');
const axios = require('axios');

const application = Express();
application.use(Express.json());

const events = [];

application.post('/events', (request, response) => {
	const event = request.body;

	events.push(event);

	axios.post('http://localhost:4000/events', event).catch(err => {
		console.log(err.message);
	});
	axios.post('http://localhost:4001/events', event).catch(err => {
		console.log(err.message);
	});
	axios.post('http://localhost:4002/events', event).catch(err => {
		console.log(err.message);
	});
	axios.post('http://localhost:4003/events', event).catch(err => {
		console.log(err.message);
	});

	response.status(200).send({ status: 'OK' });
});

application.get('/events', (request, response) => {
	response.send(events);
});

application.listen(4005, () => {
	console.log('Listing on port 4005');
});
