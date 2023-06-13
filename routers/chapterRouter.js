const express = require('express');
const router = express.Router();
const chapterController = require('../controllers/chapterController');

router.get('/chapters', chapterController.getChapters);
router.post('/chapter', chapterController.createChapter);
router.put("/chapter/:id", chapterController.updateChapter);
router.get('/chapter/:id', chapterController.getChapterById);
router.delete("/chapter/:id", chapterController.removeChapter);

module.exports = router;
