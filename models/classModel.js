const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  className: { type: String, required: true },
  section: { type: String, enum:["علمي", "أدبي", "تجاري", "صناعي", "شرعي", "لا يوجد"], required: true },
});

const _Class = mongoose.model('_Class', classSchema);

module.exports = _Class;
