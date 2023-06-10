const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const userRouter = require('./routers/userRouter');
const chapterRouter = require('./routers/chapterRouter');
const lessonRouter = require('./routers/lessonRouter');
const courseRouter = require('./routers/courseRouter');
const classRouter = require('./routers/classRouter');
const materialRouter = require('./routers/materialRouter');

const Chapter = require('./models/chapterModel');
const Lesson = require('./models/lessonModel');
const Course = require('./models/courseModel');
const Class = require('./models/classModel');
const Material = require('./models/materialModel');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const connectDb = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1/manasa');
        console.log('connected to DB');
        return true;
    } catch (err) {
        console.log(`failed to connect with the database with err: ${err.message}`);
        return false;
    }
}

connectDb();

app.use('/', userRouter);
app.use('/', chapterRouter);
app.use('/', lessonRouter);
app.use('/', courseRouter); 
app.use('/', classRouter);
app.use('/', materialRouter);

app.get('/search/:query', async (req, res) => {
    const query = req.params.query;
    try {
      const results = await Class.find({
        $or: [
          { className: { $regex: query, $options: 'i' } },
          { coursesId: { $elemMatch: { courseName: { $regex: query, $options: 'i' } } } },
          { 'coursesId.chaptersId': { $elemMatch: { chapterName: { $regex: query, $options: 'i' } } } },
          { 'coursesId.chaptersId.lessonsId': { $elemMatch: { lessonName: { $regex: query, $options: 'i' } } } },
          { 'coursesId.chaptersId.lessonsId.materialsId': { $elemMatch: { materialName: { $regex: query, $options: 'i' } } } }
        ],
      })
      .populate('coursesId', '-_id -__v')
      .populate('coursesId.chaptersId', '-_id -__v')
      .populate('coursesId.chaptersId.lessonsId', '-_id -__v')
      .populate('coursesId.chaptersId.lessonsId.materialsId', '-_id -__v');
  
      res.json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
});

app.listen(process.env.PORT | port);
