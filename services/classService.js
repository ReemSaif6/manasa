const _Class = require('../models/classModel');

module.exports.createClass = async (classData) => {
	const _class = new _Class(classData);
	return await _class.save();
};
 
module.exports.getAllClasses = async () => {
	return await _Class.find({});
};

module.exports.getClassById = async (classId) => {
	return await _Class.findById(classId);
};

module.exports.updateClass = async (classId, classData) => {
	return await _Class.findByIdAndUpdate(classId, classData, { new: true });
};

module.exports.deleteClass = async (classId) => {
	return await _Class.findByIdAndDelete(classId);
};
