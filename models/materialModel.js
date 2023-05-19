const mongoose = require('mongoose');
const lessonService = require('../services/lessonService')

const materialSchema = new mongoose.Schema({
  materialName: { type: String, required: true },
  description: { type: String, required: false },
  contentType: { type: String, enum:[ "videos", "workSheetsAndExams", "flashCards"], required: true },
  content: { type: String, required: true },
  lessonsId: { type: mongoose.Schema.Types.ObjectId, ref: 'lesson', required: true }
});

materialSchema.pre('save', async function (next) {
  const material = this;
  try {
    const lesson = await lessonService.getLessonById(material.lessonsId._id);
    lesson.materialsId.push(material);
    await lesson.save();
    next();
  } catch (error) {
    next(error);
  }
});

materialSchema.pre('remove', async function (next) {
  const material = this;
  try {
    const lesson = await lessonService.getLessonById(material.lessonsId._id);
    lesson.materialsId.pull(material);
    await lesson.save();
    next();
  } catch (error) {
    next(error);
  }
});

const Material = mongoose.model('Material', materialSchema);
module.exports = Material;
