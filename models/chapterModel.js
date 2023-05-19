const { Schema, model, default: mongoose } = require('mongoose');
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
        type: String,
        required: true,
        enum: ["first", "second", "both"]
    },
    CourseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'course',
        required: true
    },
    lessonsId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'lesson'
    }]
});
const chapter = model('chapter', chapterSchema);
module.exports = chapter;
