const { Schema, model } = require('mongoose');
const chapterSchema = new Schema({
    chapterName: {
        type: String,
        required: true
    },
    chapterNumber: {
        type: Number,
        required: true
    },
    Semester: {
        type: Number,
        required: true
    }

});
const chapter = model('chapter', chapterSchema);
module.exports = chapter;