const express = require('express');
const router = express.Router();
const upload = require('../utils/multer'); // Import the multer configuration
const { uploadExcel, addManualData, getDatasetById } = require('../controllers/datasetController');

// Route to handle uploading an Excel file
router.post('/upload', upload.single('excelFile'), async (req, res) => {
    const { userId, datasetName } = req.body;
    const file = req.file;

    try {
        if (!file) {
            return res.status(400).json({ message: 'Excel file is required' });
        }

        const newDataset = await uploadExcel(userId, datasetName, file);

        res.status(200).json({
            message: 'Dataset uploaded successfully',
            dataset: newDataset
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error uploading dataset',
            error: error.message
        });
    }
});

// Route to handle adding data manually
router.post('/manual', async (req, res) => {
    const { userId, datasetName, manualData } = req.body;

    try {
        if (!manualData || !Array.isArray(JSON.parse(manualData))) {
            return res.status(400).json({ message: 'Manual data must be an array' });
        }

        const newDataset = await addManualData(userId, datasetName, manualData);

        res.status(200).json({
            message: 'Manual data added successfully',
            dataset: newDataset
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error adding manual data',
            error: error.message
        });
    }
});

// Route to fetch a dataset by its ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const dataset = await getDatasetById(id);

        res.status(200).json({
            message: 'Dataset fetched successfully',
            dataset
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching dataset',
            error: error.message
        });
    }
});

module.exports = router;
