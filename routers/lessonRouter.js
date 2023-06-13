const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');

router.get('/lessons', lessonController.getLessons);
router.post('/lesson', lessonController.createLesson);
router.put("/lesson/:id", lessonController.updateLesson);
router.get('/lesson/:id', lessonController.getLessonById);
router.delete("/lesson/:id", lessonController.removeLesson);

module.exports = router;
