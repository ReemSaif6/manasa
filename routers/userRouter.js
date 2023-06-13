const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/users', userController.getUsers);
router.get('/user/:id', userController.getUserById);
router.post('/user', userController.createUser);
router.put("/user/:id", userController.updateUser);
router.delete("/user/:id", userController.removeUser);
router.post("/user/login", userController.login);
router.get('/user', userController.getCurrentUser);

module.exports = router;
