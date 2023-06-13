const express = require('express');
const router = express.Router();
const materialController = require('../controllers/materialController');

router.post('/material', materialController.createMaterial);
router.get('/materials', materialController.getAllMaterials);
router.get('/material/:id', materialController.getMaterialById);
router.put('/material/:id', materialController.updateMaterial);
router.delete('/material/:id', materialController.deleteMaterial);
router.get('/material/search', materialController.searchMaterial);
 
module.exports = router;
