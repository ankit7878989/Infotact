const Dataset = require('../models/Dataset');
const path = require('path');
const fs = require('fs');
const xlsx = require('xlsx');

// Parse Excel file
const parseExcelFile = (filePath) => {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0]; // Get the first sheet
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet); // Convert to JSON format
    return data;
};

// Upload Excel file
const uploadExcel = async (userId, datasetName, file) => {
    try {
        // Parse the uploaded Excel file
        const filePath = path.join(__dirname, '../uploads', file.filename);
        const parsedData = parseExcelFile(filePath); // Parse Excel data

        // Optionally, remove the file after processing
        fs.unlinkSync(filePath);

        // Create a new dataset with the parsed data
        const newDataset = new Dataset({
            userId,
            datasetName,
            excelFile: `/uploads/${file.filename}`,
            manualData: parsedData
        });

        // console.log(excelFile,"created")

        // Save the dataset to the database
        const savedDataset = await newDataset.save();
        return savedDataset;
    } catch (err) {
        console.error('Error uploading Excel file:', err);
        throw err;
    }
};

// Add data manually
const addManualData = async (userId, datasetName, manualData) => {
    try {
        // Create a new dataset with manual data
        const newDataset = new Dataset({
            userId,
            datasetName,
            manualData: JSON.parse(manualData) // Assuming manualData is passed as a JSON string
        });

        // Save the dataset to the database
        const savedDataset = await newDataset.save();
        return savedDataset;
    } catch (err) {
        console.error('Error adding manual data:', err);
        throw err;
    }
};

// Fetch dataset by ID
const getDatasetById = async (id) => {
    try {
        const dataset = await Dataset.findById(id);
        if (!dataset) {
            throw new Error('Dataset not found');
        }
        return dataset;
    } catch (err) {
        console.error('Error fetching dataset by ID:', err);
        throw err;
    }
};

module.exports = { uploadExcel, addManualData, getDatasetById };
