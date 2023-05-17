const courseService = require('../services/courseService');
const express = require('express');

module.exports.createCourse = async (req = express.request, res = express.response) => {
  try {
    const courseData = req.body;
    const course = await courseService.createCourse(courseData);
    res.status(201).json({course});
  } catch (err) {
    res.status(400).json(err);
  }
};
 
module.exports.getAllCourses = async (req = express.request, res = express.response) => {
  try {
    const courses = await courseService.getAllCourses();
    res.status(200).json(courses);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports.getCourseById = async (req = express.request, res = express.response) => {
  try {
    const courseId = req.params.id;
    const course = await courseService.getCourseById(courseId);
    if(!course){
      res.status(404).json({ error: 'Course not found' });
    }else{
      res.status(200).json(course);
    }  
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports.updateCourse = async (req = express.request, res = express.response) => {
  try {
    const courseId = req.params.id;
    const courseData = req.body;
    const updatedCourse = await courseService.updateCourse(courseId, courseData);
    if(!updatedCourse){
      res.status(404).json({ error: 'Course not found' });
    } else{
      res.status(200).json(updatedCourse);
    } 
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports.deleteCourse = async (req = express.request, res = express.response) => {
  try {
    const courseId = req.params.id;
    await courseService.deleteCourse(courseId);
    res.sendStatus(204);
  } catch(err) {
      const errors = `FAILD to delete this course with id: ${req.params.id}, error:${err}`;
      res.status(400).json({ errors });
  } 
};
