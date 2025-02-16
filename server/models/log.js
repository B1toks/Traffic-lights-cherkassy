const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
	time: Number,
	priority: Number,
	message: String
});

module.exports = mongoose.model('log', logSchema);