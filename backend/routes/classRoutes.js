const express = require('express');
const Class = require('../models/Class');
const User = require('../models/User');
const Session = require('../models/Session'); // Import Session model

const router = express.Router();

// Create Class
router.post('/', async (req, res) => {
  const { title, strength, instructorId } = req.body;
  const newClass = new Class({
    title,
    strength,
    instructor: instructorId
  });
  await newClass.save();
  res.status(201).json(newClass);
});

// Enroll Student in Class
router.post('/:classId/enroll', async (req, res) => {
  const { userId } = req.body;
  const user = await User.findById(userId);
  user.enrolledClasses.push(req.params.classId);
  await user.save();
  res.status(200).json(user);
});

// Get All Classes
router.get('/', async (req, res) => {
  const classes = await Class.find().populate('instructor');
  res.json(classes);
});

// Get Class by ID (New Endpoint)
router.get('/:id', async (req, res) => {
  try {
    const classData = await Class.findById(req.params.id)
      .populate('instructor')
      .populate({
        path: 'sessions',
        populate: {
          path: 'comments',
          model: 'Comment'
        }
      });
    if (!classData) return res.status(404).send('Class not found');
    res.json(classData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
