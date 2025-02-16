const mongoose = require('mongoose')

const {Schema} = mongoose

const trafficLightSchema = new Schema({
	id: {type: Number, unique: true, index: true},
	lat: Number,
	lon: Number,
	status: Boolean,
	street: String,
	votes: Number,
	updated: Number
})

const TrafficLight = mongoose.model('sign', trafficLightSchema)

module.exports = TrafficLight