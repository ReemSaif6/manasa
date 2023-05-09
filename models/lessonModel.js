const { Schema, model } = require('mongoose');
const lessonSchema = new Schema({
    lessonName: {
        type: String,
        required: true
    },
    lessonNumber: {
        type: Number,
        required: true
    },
    chapterNumber: {
        type: Number,
        required: true
    }

});
const lesson = model('lesson', lessonSchema);
module.exports = lesson;