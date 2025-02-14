const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 5000;

const authRoute = require('./routes/auth');

require('dotenv').config();

const TrafficLight = require('./models/trafficLight');

app.use(express.json());
mongoose.connect(process.env.MONGODB_URI);

let trafficLights = [
	{id: 1, lat: 49.4444, lng: 32.0590, status: true, votes: 5},
	{id: 2, lat: 49.4454, lng: 32.0600, status: false, votes: 3},
];

app.put('/traffic-light/:id', (req, res) => {
	const {id} = req.params;
	const {status} = req.body;

	// Знаходимо світлофор за id
	const light = trafficLights.find((light) => light.id === parseInt(id));
	if (!light) {
		return res.status(404).json({message: 'Traffic light not found'});
	}

	// Оновлюємо статус світлофора
	light.status = status;
	res.json(light); // Повертаємо оновлений об'єкт світлофора
});

app.post('/update', async (req, res) => {
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

app.get('/lights', async (req, res) => {
	let lights = await TrafficLight.find({});

	res.json(lights);
})

app.get('/', (req, res) => {
	res.send('Server is working!');
});

app.use("/auth", authRoute);

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
