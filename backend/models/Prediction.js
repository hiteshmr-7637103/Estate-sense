const mongoose = require('mongoose');

const PredictionSchema = new mongoose.Schema({
    inputData: {
        type: Object,
        required: true
    },
    predictedPrice: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Prediction', PredictionSchema);
