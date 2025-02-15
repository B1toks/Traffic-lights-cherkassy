const express = require('express');
const router = express.Router();

const Log = require('../models/log');

const authMiddleware = require('../middleware/authMiddleware');

router.get("/", authMiddleware, async (req, res) => {
	const logs = await Log.find({}).sort({date: 1}).limit(50);

	res.json(logs);
})

module.exports = router;