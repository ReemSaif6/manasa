const mongoose = require('mongoose');
const classService = require('../services/classService')
const Chapter = require('../models/chapterModel')

const courseSchema = new mongoose.Schema({
  courseName: { type: String, required: true },
  description: { type: String, required: false },
  image: { type: String, required: true  },
  semester: { type: String, enum:["first", "second", "both"], required: true },
  subAdmainId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  chaptersId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'chapter'
  }]
});

courseSchema.pre('save', async function (next) {
  const course = this;
  try {
    const _class = await classService.getClassById(course.classId._id);
    _class.coursesId.push(course._id);
    console.log('push');
    await _class.save();
    next();
  } catch (error) {
    next(error);
  }
});

courseSchema.pre('remove', async function (next) {
  const course = this;
  try {
    const _class = await classService.getClassById(course.classId._id);
    _class.coursesId.pull(course._id);
    console.log('pull');
    await _class.save();
    next();
  } catch (error) {
    next(error);
  }
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
