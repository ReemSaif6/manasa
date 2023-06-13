const Class = require('../models/classModel');

module.exports.createClass = async (classData) => {
	const _class = new Class(classData);
	return await _class.save();
};
 
module.exports.getAllClasses = async () => {
	return await Class.find({}).populate('coursesId');
};

module.exports.getClassById = async (classId) => {
	return await Class.findById(classId).populate('coursesId');
};

module.exports.updateClass = async (classId, classData) => {
	return await Class.findByIdAndUpdate(classId, classData, { new: true });
};

module.exports.deleteClass = async (classId) => {
	return await Class.findByIdAndDelete(classId);
};
