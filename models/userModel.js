const { Schema, model } = require('mongoose');
const validator = require('validator');

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: validator.isEmail,
            message: '{value} is not a valid email',
            isAsync: false
        },
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    }

});
userSchema.methods.comparePasswords = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}
const user = model('user', userSchema);
module.exports = user;