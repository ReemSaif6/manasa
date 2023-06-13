const { Schema, model, default: mongoose } = require('mongoose');
const chapterService = require('../services/chapterService')

const lessonSchema = new Schema({
    lessonName: {
        type: String,
        required: true
    },
    lessonNumber: {
        type: Number,
        required: true
    },
    chapterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'chapter',
        required: true
    },
    materialsId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Material'
    }]
});

lessonSchema.pre('save', async function (next) {
    const lesson = this;
    try {
      const chapter = await chapterService.getChapterById(lesson.chapterId);
      chapter.lessonsId.push(lesson);
      await chapter.save();
      next();
    } catch (error) {
      next(error);
    }
});

lessonSchema.pre('findOneAndDelete', async function (next) {
  const lesson = this;
  try {
    const chapter = await chapterService.getChapterById(lesson.chapterId);
    chapter.lessonsId.pull(lesson);
    await chapter.save();
    next();
  } catch (error) {
    next(error);
  }
});

const lesson = model('lesson', lessonSchema);
module.exports = lesson;
