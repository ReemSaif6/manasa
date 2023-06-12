const mongoose = require('mongoose');
const classService = require('../services/classService')
const userService = require('../services/userService')

const courseSchema = new mongoose.Schema({
  courseName: { type: String, required: true },
  description: { type: String, required: false },
  image: { type: String, required: true  },
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
    console.log(course.classId);

    const _class = await classService.getClassById(course.classId);
    _class.coursesId.push(course);
    await _class.save();
    next();
  } catch (error) {
    next(error);
  }
});

courseSchema.pre('findOneAndDelete', async function (next) {
  const course = this;
  try {
    console.log(course.courseName);
    const _class = await classService.getClassById(course.classId);
    _class.coursesId.pull(course);
    await _class.save();
    next();
  } catch (error) {
    next(error);
  }
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
