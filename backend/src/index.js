
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const cors = require('cors'); 

const { connectDB, Student } = require('./db');
const MONGODB_URI = process.env.MONGODB_URI;
const studentRoutes = require('./routes/students');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors()); 
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send('Student Management System is running!');
  });

// Connect to MongoDB
connectDB();

// Use API routes
app.use('/api', studentRoutes);

app.get('/', (req, res) => {
  res.send('Student Management System is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
