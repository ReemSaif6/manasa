const { Schema, model, default: mongoose } = require('mongoose');

const validator = require('validator');
const bcrypt = require('bcrypt');

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
    },
    isSubAdmin: {
        type: Boolean,
        default: true,
        require: true
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
});

userSchema.pre('save', async function (next) {
    let salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.comparePasswords = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}

const user = model('user', userSchema);
module.exports = user;
