const { Schema, model, default: mongoose } = require('mongoose');
const courseService = require('../services/courseService');

//const Lesson = require('../models/lessonModel');
//const Material = require('../models/materialModel');

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
        ref: 'Course',
        required: true
    },
    lessonsId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'lesson'
    }],
    semester: { type: String, enum:["first", "second", "both"], required: true }
});

chapterSchema.pre('save', async function (next) {
    const chapter = this;
    try {
      const course = await courseService.getCourseById(chapter.courseId);
      course.chaptersId.push(chapter);
      await course.save();
      next();
    } catch (error) {
      next(error);
    }
});
   
chapterSchema.pre('remove', async function (next) {
    const chapter = this;
    try {
      //await Lesson.deleteMany({chapterId: chapter._id});
      //await Material.deleteMany({lessonsId: { $in: chapter._id}});
      const course = await courseService.getCourseById(chapter.courseId._id);
      course.chaptersId.pull(chapter);
      await course.save();
      next();
    } catch (error) {
      next(error);
    }
});

const chapter = model('chapter', chapterSchema);
module.exports = chapter;
