const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Create a new student
router.post('/students', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all students
router.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific student
router.get('/students/:id', getStudent, (req, res) => {
  res.json(res.student);
});

// Update a student
router.put('/students/:id', getStudent, async (req, res) => {
  try {
    Object.assign(res.student, req.body);
    await res.student.save();
    res.json(res.student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a student
router.delete('/students/:id', getStudent, async (req, res) => {
    try {
        await res.student.deleteOne(); 
      res.json({ message: 'Student deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
async function getStudent(req, res, next) {
  try {
    const student = await Student.findById(req.params.id);
    if (student == null) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.student = student;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = router;
