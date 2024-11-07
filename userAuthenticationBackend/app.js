const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config();
const cors = require('cors')
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth.js')
const app = express();

mongoose.connect(process.env.DB_CONNECT,(err)=>{
    if(err) {
        console.error(err);
    } else {
        console.log("Connected to DB");
    }
})

app.use(logger('dev'));
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/authentication', authRouter)
app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
