const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  comments: [{ body: String, date: Date }]
});

module.exports = mongoose.model('Session', sessionSchema);

