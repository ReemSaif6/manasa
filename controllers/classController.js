const classService = require('../services/classService');
const express = require('express');
module.exports.createClass = async (req = express.request, res = express.response) => {
  try {
    const classData = req.body;
    const _class = await classService.createClass(classData);
    res.status(201).json({_class});
  } catch (err) {
    res.status(400).json(err);
  }
};
 
module.exports.getAllClasses = async (req = express.request, res = express.response) => {
  try {
    const _class = await classService.getAllClasses();
    res.status(200).json(_class);
  } catch (err) {
    res.status(400).json(err);
  }
};
module.exports.getClassById = async (req = express.request, res = express.response) => {
  try {
    const classId = req.params.id;
    const _class = await classService.getClassById(classId);
    if(!_class){
      res.status(404).json({ error: 'Class not found' });
    }else{
      res.status(200).json(_class);
    }  
  } catch (err) {
    res.status(400).json(err);
  }
};
module.exports.updateClass = async (req = express.request, res = express.response) => {
  try {
    const classId = req.params.id;
    const classData = req.body;
    const updatedClass = await classService.updateClass(classId, classData);
    if(!updatedClass){
      res.status(404).json({ error: 'Class not found' });
    } else{
      res.status(200).json(updatedClass);
    } 
  } catch (err) {
    res.status(400).json(err);
  }
};
module.exports.deleteClass = async (req = express.request, res = express.response) => {
  try {
    const classId = req.params.id;
    await classService.deleteClass(classId);
    res.sendStatus(204);
  } catch(err) {
      const errors = `FAILD to delete this class with id: ${req.params.id}, error:${err}`;
      res.status(400).json({ errors });
  } 
};