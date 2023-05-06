const Course = require('../models/courseModel');

module.exports.createCourse = async (courseData) => {
	const course = new Course(courseData);
	return await course.save();
};

module.exports.getAllCourses = async () => {
	return await Course.find({});
};

module.exports.getCourseById = async (courseId) => {
	return await Course.findById(courseId);
};

module.exports.getCurrentCourses = async () => {
	return await Course.findOne({ date: { $lte: new Date() } }).sort({ date: -1 });
};

module.exports.updateCourse = async (courseId, courseData) => {
	return await Course.findByIdAndUpdate(courseId, courseData, { new: true });
};

module.exports.deleteCourse = async (courseId) => {
	return await Course.findByIdAndDelete(courseId);
};
  
