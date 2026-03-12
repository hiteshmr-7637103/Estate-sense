const express = require('express');
const axios = require('axios');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const Prediction = require('./models/Prediction');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

const ML_SERVICE_BASE = process.env.PYTHON_API_URL || "http://estate-sense-ml:8000";
const PYTHON_API_URL = `${ML_SERVICE_BASE}/predict`;

app.post('/api/house-price', async (req, res) => {
    try {
        const pythonResponse = await axios.post(PYTHON_API_URL, req.body);
        const price = pythonResponse.data.predicted_price;

        // SAVE TO DATABASE
        const newPrediction = new Prediction({
            inputData: req.body,
            predictedPrice: price
        });
        await newPrediction.save();

        res.json({ success: true, price });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));