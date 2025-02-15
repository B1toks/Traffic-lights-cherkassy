const express = require('express');
const TrafficLight = require("../models/trafficLight");
const Log = require("../models/log");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get('/get/:skip', async (req, res) => {
	const {skip} = req.params;
	
	try {
		let lights = await TrafficLight.find({}).skip(skip).limit(10);
		res.json(lights);
	} catch (e) {
		const date = Date.now()
		await Log.create({
			time: date,
			priority: 3,
			message: `Incorrect request when getting lights`,
		});
	}
});

router.get('/facts', async (req, res) => {
	try {
		let data = {
			total: 0,
			working: 0
		};

		data["total"] = await TrafficLight.countDocuments();
		data["working"] = await TrafficLight.countDocuments({status: true});

		res.json(data);
	} catch (err) {
		console.log(err);
		res.status(500).json({});
	}
})

router.put('/toggle/:id', authMiddleware, async (req, res) => {
	const {id} = req.params;

	const trafficLight = await TrafficLight.findOne({id: id});

	if (trafficLight) {
		trafficLight.status = !trafficLight.status;
		await trafficLight.save();
		res.json({success: true, updated: trafficLight});
	} else {
		res.status(404).send({success: false, message: "Not found"});
	}
});

router.post('/edit-street/:id', authMiddleware, async (req, res) => {
	const {id} = req.params;
	const {name} = req.body;

	const trafficLight = await TrafficLight.findOne({id: id});

	if (trafficLight) {
		trafficLight.street = name;
		await trafficLight.save();
		res.json({success: true, updated: trafficLight});
	} else {
		res.status(404).send({success: false, message: "Not found"});
	}
});

router.post('/update', authMiddleware, async (req, res) => {
	await fetch('https://overpass-api.de/api/interpreter', {
		method: 'POST',
		body: `data=${encodeURIComponent(`
      [out:json]
      [bbox:49.31124653992916,31.969184875488285,49.514510112029,32.183761596679695]
      ;
      (
        node["highway"="traffic_signals"];
        way["highway"="traffic_signals"];
        relation["highway"="traffic_signals"];
      );
      out body;
      out skel qt;
    `)}`
	})
		.then(data => data.json())
		.then(data => {
			data.elements.forEach(async (item) => {

				const light = await TrafficLight.findOne({
					id: item.id
				});

				if (!light) {
					console.log(`New light ${item.id}`);
					await TrafficLight.create({
						id: item.id,
						lat: item.lat,
						lon: item.lon,
						status: true,
						votes: 0,
						street: "",
						updated: Date.now()
					})
				} else {
					console.log(`Existing light ${item.id}`);
				}
			})
		})
		.then(() => {
			res.status(200);
			res.send("Successfully updated");
		})
		.catch(err => console.error(err));
})

module.exports = router;