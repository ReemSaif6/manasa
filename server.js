const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const userRouter = require('./routers/userRouter');
const chapterRouter = require('./routers/chapterRouter');
const lessonRouter = require('./routers/lessonRouter');
const courseRouter = require('./routers/courseRouter');
const classRouter = require('./routers/classRouter');
const materialRouter = require('./routers/materialRouter');

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

app.listen(process.env.PORT | port);
