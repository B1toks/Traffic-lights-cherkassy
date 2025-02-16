const Log = require("../models/log");

async function logRequest(req, res, next) {
	const date = Date.now()

	await Log.create({
		time: date,
		priority: 0,
		message: `${req.method} ${req.hostname} ${req.path}`,
	});

	next();
}

module.exports = logRequest;