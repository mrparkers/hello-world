const {Server} = require('hapi');
const Chance = require('chance');

let chance;

const createServer = (port) => {
	const server = new Server({
		host: '0.0.0.0',
		port
	});

	server.route({
		path: '/',
		method: 'GET',
		handler: (request, h) => {
			return "index route 2";
		}
	});

	server.route({
		path: '/healthz',
		method: 'GET',
		handler: () => 'ok'
	});

	return server;
};

(async () => {
	chance = new Chance();

	const server = createServer(5555);

	['SIGINT', 'SIGTERM'].forEach((signal) => {
		process.on(signal, async () => {
			console.log(`Caught signal ${signal}, terminating...`);

			await server.stop();
		});
	});

	await server.start();

	console.log('Listening...');
})();
