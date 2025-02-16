const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 5000;

const authRoute = require('./routes/auth');
const lightMgmtRoute = require('./routes/lightMgmt');
const logsRoute = require('./routes/logs');
const logMiddleware = require('./middleware/logMiddleware');

require('dotenv').config();

app.use(logMiddleware);
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI);

app.get('/', (req, res) => {
	res.send('Server is working!');
});

app.use("/lights", lightMgmtRoute);
app.use("/auth", authRoute);
app.use("/logs", logsRoute);

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
