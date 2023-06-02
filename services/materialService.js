const Material = require('../models/materialModel');
 
module.exports.createMaterial = async (materialData) => {
	const material = new Material(materialData);
	return await material.save();
};

module.exports.getAllMaterials = async () => {
	return await Material.find({}).populate('lessonsId');
};

module.exports.getMaterialById = async (materialId) => {
	return await Material.findById(materialId).populate('lessonsId');
};

module.exports.updateMaterial = async (materialId, materialData) => {
	return await Material.findByIdAndUpdate(materialId, materialData, { new: true });
};

module.exports.deleteMaterial = async (materialId) => {
	return await Material.findByIdAndDelete(materialId);
};
