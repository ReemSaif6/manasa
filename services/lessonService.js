const Lesson = require('../models/lessonModel');

module.exports.getLessons = async () => {
    return await Lesson.find().populate('chapterId').populate('materialsId');
};

module.exports.createLesson = async newLesson => {
	return await Lesson.create(newLesson);

};

module.exports.updateLesson = async (id, updateFields) => {
	return await Lesson.findByIdAndUpdate(id, { $set: updateFields }, { new: true });
};

module.exports.getLessonById = async (lessonId) => {
	const lesson = await Lesson.findById(lessonId).populate('chapterId').populate('materialsId');
	return lesson;
};

module.exports.removeLesson = async _id => {
	return await Lesson.deleteOne({ _id });
};
