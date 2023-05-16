const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseName: { type: String, required: true },
  description: { type: String, required: false },
  image: { type: String, required: true  },
  class: { type: String, required: true },
  semester: { type: String, enum:["الأول", "الثاني", "كليهما"], required: true },
  responsibleUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  classId: { type: mongoose.Schema.Types.ObjectId, ref: '_Class', required: true }
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
