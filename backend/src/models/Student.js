// src/models/Student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  studentID: {
    type: String,
    required: true,
    unique: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  enrollmentDate: {
    type: Date,
    default: Date.now,
  },
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
