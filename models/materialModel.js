const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
  materialName: { type: String, required: true },
  description: { type: String, required: false },
  contentType: { type: String, enum:[ "videos", "workSheetsAndExams", "flashCards"], required: true },
  content: { type: String, required: true },
  lessonsId: { type: mongoose.Schema.Types.ObjectId, ref: 'lesson', required: true }
});

const Material = mongoose.model('Material', materialSchema);
module.exports = Material;
