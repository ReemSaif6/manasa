const userService = require('../services/userService');
const express = require('express');
module.exports.getUsers = async (req = express.request, res = express.response) =>{
    try {
		const users = await userService.getUsers();
		res.status(200).json(users);
	} catch (err) {
		const error = `Failed to get users, error: ${err}`;
		res.status(400).json({ error });
	}
};
module.exports.login = async (req = express.request, res = express.response) => {
    try {
        const response = await userService.login(req.body.email, req.body.password);
        if (response.result) {
            const token = jwt.createToken({ userId: response.user._id });
            return res.status(200).json({ token });
        }
        res.status(401).json({ message: "Login failed" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports.createUser = async (req = express.request, res = express.response) => {
    try {
        const user = await userService.createUser(req.body);
        const token = jwt.createToken({ userId: user._id });
        res.status(201).json({ user, token });
    }
    catch (err) {
        const error = `Failed to create user, error: ${err}`;
        res.status(400).json({ error });
    }
};
module.exports.getUserById = async (req = express.request, res = express.response) => {
    try {
        const user = await userService.getUserById(req.params.id);
        res.status(200).json(user);
    }
    catch (err) {
        const error = `Failed to get user, error: ${err}`;
        res.status(400).json({ error });
    }
};
module.exports.updateUser = async (req = express.request, res = express.response) => {
    const updateFields = req.body;
    try {
        const updatedUser = await userService.updateUser(req.params.id, updateFields);
        res.status(200).json(updatedUser);
    }
    catch (err) {
        const errors = `FAILD to Update user with id ${req.params.id}, err: ${error}`;
        res.status(400).json({ errors });
    }
};
module.exports.removeUser = async (req = express.request, res = express.response) => {
    try {
        await userService.removeUser(req.params.id);
        res.status(204);
    }
    catch (err) {
        const errors = `FAILD to delete this user with id: ${req.params.id}, error:${err}`;
        res.status(400).json({ errors });
    }
};