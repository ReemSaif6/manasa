const User = require('../models/userModel');

module.exports.getUsers = async () => {
    return await User.find();
};
module.exports.createUser = async (userData) => {
	return await User.create(userData);
};
module.exports.login = async (email, password) => {
	try {
		const user = await User.findOne({ email });
		if (!user) {
			return {
				result: false,
				error: "failed to login, password or email is incorrect",
			}
		} else {
			if (await user.comparePasswords(password)) {
				return {
					result: true,
					user
				}
			}
			else return {
				result: false,
				error: "failed to login, password or email is incorrect",
			}
		}
	} catch (error) {
		return {
			result: false,
			error: error.message,
		};
	}
};
module.exports.updateUser = async (id, updateFields) => {
	return await User.findByIdAndUpdate(id, { $set: updateFields }, { new: true });
};
module.exports.removeUser = async _id => {
	return await User.deleteOne({ _id });
};
module.exports.getUserById = async (userId) => {
	const user = await User.findById(userId);
	return user;
};
module.exports.getCurrentUser = async (userId) => {
	const user = await User.findById(userId);
	return user;
};
