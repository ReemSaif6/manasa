const { Schema, model, default: mongoose } = require('mongoose');

const lessonSchema = new Schema({
    lessonName: {
        type: String,
        required: true
    },
    lessonNumber: {
        type: Number,
        required: true
    },
    chapterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'chapter',
        required: true
    },
    MaterialsId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Material'
    }]
});

const lesson = model('lesson', lessonSchema);
module.exports = lesson;
