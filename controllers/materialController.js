const Material = require('../models/materialModel');
const materialService = require('../services/materialService');
const express = require('express');

module.exports.createMaterial = async (req = express.request, res = express.response) => {
  try {
    const materialData = req.body;
    const material = await materialService.createMaterial(materialData);
    res.status(201).json(material);
  } catch (err) {
    res.status(400).json(err);
  }
};
 
module.exports.getAllMaterials = async (req = express.request, res = express.response) => {
  try {
    const material = await materialService.getAllMaterials();
    res.status(200).json(material);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports.getMaterialById = async (req = express.request, res = express.response) => {
  try {
    const materialId = req.params.id;
    const material = await materialService.getMaterialById(materialId);
    if(!material){
      res.status(404).json({ error: 'Material not found' });
    }else{
      res.status(200).json(material);
    }  
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports.updateMaterial = async (req = express.request, res = express.response) => {
  try {
    const materialId = req.params.id;
    const materialData = req.body;
    const updatedMaterial = await materialService.updateMaterial(materialId, materialData);
    if(!updatedMaterial){
      res.status(404).json({ error: 'Material not found' });
    } else{
      res.status(200).json(updatedMaterial);
    } 
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports.deleteMaterial = async (req = express.request, res = express.response) => {
  try {
    const materialId = req.params.id;
    await materialService.deleteMaterial(materialId);
    res.sendStatus(204);
  } catch(err) {
      const errors = `FAILD to delete this material with id: ${req.params.id}, error:${err}`;
      res.status(400).json({ errors });
  } 
};

module.exports.searchMaterial = async (req = express.request, res = express.response) => {
  const query = req.params.query;
    try {
      const results = await Material.find({
        $or: [
          { className: { $regex: query, $options: 'i' } },
          { coursesId: { $elemMatch: { courseName: { $regex: query, $options: 'i' } } } },
          { 'coursesId.chaptersId': { $elemMatch: { chapterName: { $regex: query, $options: 'i' } } } },
          { 'coursesId.chaptersId.lessonsId': { $elemMatch: { lessonName: { $regex: query, $options: 'i' } } } },
          { 'coursesId.chaptersId.lessonsId.materialsId': { $elemMatch: { materialName: { $regex: query, $options: 'i' } } } }
        ],
      })
      .populate('coursesId', '-_id -__v')
      .populate('coursesId.chaptersId', '-_id -__v')
      .populate('coursesId.chaptersId.lessonsId', '-_id -__v')
      .populate('coursesId.chaptersId.lessonsId.materialsId', '-_id -__v');
      res.json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
}