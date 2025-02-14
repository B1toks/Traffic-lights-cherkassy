const express = require('express');
const app = express();
const PORT = 5000;

app.use(express.json());

let trafficLights = [
  { id: 1, lat: 49.4444, lng: 32.0590, status: true, votes: 5 },
  { id: 2, lat: 49.4454, lng: 32.0600, status: false, votes: 3 },
];

app.put('/traffic-light/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // Знаходимо світлофор за id
  const light = trafficLights.find((light) => light.id === parseInt(id));
  if (!light) {
    return res.status(404).json({ message: 'Traffic light not found' });
  }

  // Оновлюємо статус світлофора
  light.status = status;
  res.json(light); // Повертаємо оновлений об'єкт світлофора
});

app.get('/', (req, res) => {
    res.send('Server is working!');
  });


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
