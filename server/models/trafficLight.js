const mongoose = require('mongoose')

const {Schema} = mongoose

const trafficLightSchema = new Schema({
	id: Number,
	lat: Number,
	lon: Number,
	status: Boolean,
	street: String,
	votes: Number,
	updated: Number
})

const TrafficLight = mongoose.model('sign', trafficLightSchema)

module.exports = TrafficLight