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
        enum: ["الاول", "الثاني", "كليهما"]
    },
    CourseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    }

});
const chapter = model('chapter', chapterSchema);
module.exports = chapter;