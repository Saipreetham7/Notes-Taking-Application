const express = require('express');
const jwt = require('jsonwebtoken');
const Note = require('../models/Note');

const router = express.Router();

const authenticate = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).send('Unauthorized');
  }
};

router.post('/', authenticate, async (req, res) => {
  const { title, content } = req.body;
  try {
    const newNote = new Note({
      title,
      content,
      userId: req.userId,
    });
    await newNote.save();
    res.status(201).send('Note created');
  } catch (error) {
    res.status(400).send('Error creating note');
  }
});

router.get('/', authenticate, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.userId });
    res.json(notes);
  } catch (error) {
    res.status(400).send('Error fetching notes');
  }
});

router.put('/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    await Note.findByIdAndUpdate(id, { title, content });
    res.send('Note updated');
  } catch (error) {
    res.status(400).send('Error updating note');
  }
});

router.delete('/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Note.findOneAndDelete({ _id: id, userId: req.userId });
    if (!note) {
      return res.status(404).send('Note not found');
    }
    res.send('Note deleted');
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
