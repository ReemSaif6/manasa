const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const userRouter = require('./routers/userRouter');
const classRouter = require('./routers/classRouter');

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

app.use('/',userRouter);
app.use('/',classRouter);

app.listen(process.env.PORT | port);
