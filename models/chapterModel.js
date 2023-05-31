const { Schema, model, default: mongoose } = require('mongoose');
const courseService = require('../services/courseService')

const chapterSchema = new Schema({
    chapterName: {
        type: String,
        required: true
    },
    chapterNumber: {
        type: Number,
        required: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'course',
        required: true
    },
    lessonsId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'lesson'
    }]
});

chapterSchema.pre('save', async function (next) {
    const chapter = this;
    try {
      const course = await courseService.getCourseById(chapter.courseId._id);
      course.chaptersId.push(chapter);
      console.log('push1');

      await course.save();
      next();
    } catch (error) {
      next(error);
    }
});
   
chapterSchema.pre('remove', async function (next) {
    const chapter = this;
    try {
      const course = await courseService.getCourseById(chapter.courseId._id);
      course.chaptersId.pull(chapter);
      console.log('pull');

      await course.save();
      next();
    } catch (error) {
      next(error);
    }
});

const chapter = model('chapter', chapterSchema);
module.exports = chapter;
