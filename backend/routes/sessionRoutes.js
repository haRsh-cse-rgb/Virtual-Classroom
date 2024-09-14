const express = require('express');
const Session = require('../models/Session');

const router = express.Router();

// Create Session
router.post('/', async (req, res) => {
  const { title, content, classId } = req.body;
  const newSession = new Session({
    title,
    content,
    class: classId
  });
  await newSession.save();
  res.status(201).json(newSession);
});

// Add Comment to Session
router.post('/:sessionId/comment', async (req, res) => {
  const { body } = req.body;
  const session = await Session.findById(req.params.sessionId);
  session.comments.push({ body, date: new Date() });
  await session.save();
  res.status(200).json(session);
});

module.exports = router;
