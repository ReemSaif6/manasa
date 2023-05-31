const mongoose = require('mongoose');
const Chapter = require('./chapterModel');
const lessonSchema = new mongoose.Schema({
  title: String,
});
lessonSchema.pre('save', async function (next) {
  const lesson = this;
  const chapterId = lesson.chapter; // Assuming the lesson has a 'chapter' field containing the chapter's ID
  try {
    const chapter = await Chapter.findById(chapterId);
    if (chapter) {
      chapter.lessons.push(lesson._id);
      await chapter.save();
    }
    next();
  } catch (error) {
    next(error);
  }
});
lessonSchema.pre('remove', async function (next) {
  const lesson = this;
  const chapterId = lesson.chapter;
  try {
    const chapter = await Chapter.findById(chapterId);
    if (chapter) {
      chapter.lessons.pull(lesson._id);
      await chapter.save();
    }
    next();
  } catch (error) {
    next(error);
  }
});
const Lesson = mongoose.model('Lesson', lessonSchema);
module.exports = Lesson;




// Pre-remove hook to remove associated chapters and their lessons
courseSchema.pre('remove', async function (next) {
  const chapterIds = this.chapters.map((chapterId) =>
    mongoose.Types.ObjectId(chapterId)
  );

  await Chapter.deleteMany({ _id: { $in: chapterIds } });

  next();
});