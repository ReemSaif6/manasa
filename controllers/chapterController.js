const chapterService = require('../services/chapterService');
const express = require('express');
const Chapter = require('../models/chapterModel');

module.exports.getChapters = async (req = express.request, res = express.response ) =>{
    try {
		const chapters = await chapterService.getChapters();
		res.status(200).json(chapters);
	} catch (err) {
		const error = `Failed to get chapters, error: ${err}`;
		res.status(400).json({ error });
	}
};

module.exports.createChapter = async (req = express.request, res = express.response) =>{
    try{
    let chapter = new Chapter(req.body);
        chapter.save();
        res.status(201).json(chapter);
    }catch (err) {
        const error = `Failed to create chapter, error: ${err}`;
		res.status(400).json({ error });
    }
};

module.exports.updateChapter = async (req = express.request, res = express.response) => {
    const updateFields = req.body;
    try {
        const updatedChapter = await chapterService.updateChapter(req.params.id, updateFields);
        res.status(200).json(updatedChapter);
    }
    catch (err) {
        const errors = `FAILD to Update chapter with id ${req.params.id}, err: ${err}`;
        res.status(400).json({ errors });
    }
};

module.exports.getChapterById = async (req = express.request, res = express.response) => {
    try {
        const chapter = await chapterService.getChapterById(req.params.id);
        res.status(200).json(chapter);
    }
    catch (err) {
        const error = `Failed to get chapter, error: ${err}`;
        res.status(400).json({ error });
    }
};

module.exports.removeChapter = async (req = express.request, res = express.response) => {
    try {
        await chapterService.removeChapter(req.params.id);
        res.sendStatus(204);
    }
    catch (err) {
        const errors = `FAILD to delete this chapter with id: ${req.params.id}, error:${err}`;
        res.status(400).json({ errors });
    }
};
