const Chapter = require('../models/chapterModel');

module.exports.getChapters = async () => {
    return await Chapter.find();
};
module.exports.createChapter = async newChapter => {
	return await Chapter.create(newChapter);

};
module.exports.updateChapter = async (id, updateFields) => {
	return await Chapter.findByIdAndUpdate(id, { $set: updateFields }, { new: true });
};
module.exports.getChapterById = async (chapterId) => {
	const chapter = await Chapter.findById(chapterId);
	return chapter;
};
module.exports.removeChapter = async _id => {
	return await Chapter.deleteOne({ _id });
};
