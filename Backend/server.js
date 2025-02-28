
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const passport = require("passport");
require("./config/passport");
const session = require('express-session');
const connectDB = require('./config/db.js');
const authRoutes = require('./routes/authRoutes.js');
const datasetRoutes = require('./routes/datasetRoutes.js');

dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middleware

app.use(bodyParser.json()); // To parse JSON data in request bodies
app.use(bodyParser.urlencoded({ extended: true })); // To parse URL-encoded data
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(session({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: false,
}))

app.use(passport.initialize());
app.use(passport.session());


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/datasets', datasetRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
