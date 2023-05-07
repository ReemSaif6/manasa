const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');
router.post('/class', classController.createClass);
router.get('/classes', classController.getAllClasses);
router.get('/class/:id', classController.getClassById);
router.put('/class/:id', classController.updateClass);
router.delete('/class/:id', classController.deleteClass);
 
module.exports = router; 