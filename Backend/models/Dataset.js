const mongoose = require('mongoose');

const datasetSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    },
    datasetName: {
        type: String,
        required: true,
    },
    excelFile: {
        type: String,
        default: null,
    },
    manualData: {
        type: [mongoose.Schema.Types.Mixed], 
        default: [], 
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now, 
    }
});

datasetSchema.pre('save', function (next) {
    if (this.isModified()) {
        this.updatedAt = Date.now();
    }
    next();
});

const Dataset = mongoose.model('Dataset', datasetSchema);

module.exports = Dataset;
