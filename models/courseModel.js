const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseName: { type: String, required: true },
  description: { type: String, required: false },
  image: { type: String, required: true  },
  semester: { type: String, enum:["first", "second", "both"], required: true },
  responsible_SubAdmain_Id: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  chaptersId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'chapter'
  }]
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
