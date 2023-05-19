const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  className: { type: String, required: true },
  section: { type: String, enum:["scientific", "literary", "commercial", "industrial", "legitimate", "nothing"], required: true },
  coursesId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }]
});

const Class = mongoose.model('Class', classSchema);
module.exports = Class;
