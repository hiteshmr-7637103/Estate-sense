const mongoose = require('mongoose');

const PredictionSchema = new mongoose.Schema({
    inputData: {
        crim: Number,
        zn: Number,
        indus: Number,
        chas: Number,
        nox: Number,
        rm: Number,
        age: Number,
        dis: Number,
        rad: Number,
        tax: Number,
        ptratio: Number,
        b: Number,
        lstat: Number
    },
    predictedPrice: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Prediction', PredictionSchema);