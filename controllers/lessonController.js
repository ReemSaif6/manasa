const lessonService = require('../services/lessonService');
const express = require('express');
const Lesson = require('../models/lessonModel');  

module.exports.getLessons = async (req = express.request, res = express.response ) =>{
    try {
		const lessons = await lessonService.getLessons();
		res.status(200).json(lessons);
	} catch (err) {
		const error = `Failed to get lessons, error: ${err}`;
		res.status(400).json({ error });
	}
};

module.exports.createLesson = async (req = express.request, res = express.response) =>{
    try{
    let lesson = new Lesson(req.body);
        lesson.save();
        res.status(201).json(lesson);
    }catch (err) {
        const error = `Failed to create lesson, error: ${err}`;
		res.status(400).json({ error });
    }
};

module.exports.updateLesson = async (req = express.request, res = express.response) => {
    const updateFields = req.body;
    try {
        const updatedLesson = await lessonService.updateLesson(req.params.id, updateFields);
        res.status(200).json(updatedLesson);
    }
    catch (err) {
        const errors = `FAILD to Update lesson with id ${req.params.id}, err: ${err}`;
        res.status(400).json({ errors });
    }
};

module.exports.getLessonById = async (req = express.request, res = express.response) => {
    try {
        const lesson = await lessonService.getLessonById(req.params.id);
        res.status(200).json(lesson);
    }
    catch (err) {
        const error = `Failed to get lesson, error: ${err}`;
        res.status(400).json({ error });
    }
};

module.exports.removeLesson = async (req = express.request, res = express.response) => {
    try {
        await lessonService.removeLesson(req.params.id);
        res.sendStatus(204);
    }
    catch (err) {
        const errors = `FAILD to delete this lesson with id: ${req.params.id}, error:${err}`;
        res.status(400).json({ errors });
    }
};
