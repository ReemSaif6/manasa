const Chapter = require('../models/chapterModel');

module.exports.getChapters = async () => {
    return await Chapter.find().populate('courseId').populate('lessonsId');
};

module.exports.createChapter = async newChapter => {
	return await Chapter.create(newChapter);
};

module.exports.updateChapter = async (id, updateFields) => {
	return await Chapter.findByIdAndUpdate(id, { $set: updateFields }, { new: true });
};

module.exports.getChapterById = async (chapterId) => {
	const chapter = await Chapter.findById(chapterId).populate('courseId').populate('lessonsId');
	return chapter;
};

module.exports.removeChapter = async _id => {
	return await Chapter.deleteOne({ _id });
};
