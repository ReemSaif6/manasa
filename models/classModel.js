const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  className: { type: String, required: true },
  section: { type: String, required: true },
});

const _Class = mongoose.model('_Class', classSchema);

module.exports = _Class;
