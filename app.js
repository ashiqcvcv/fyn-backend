var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var updateRouter = require('./routes/updateRouter');
var openAPIRouter = require('./routes/openAPIRouter');

var app = express();

let cors = require("cors");
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/update', updateRouter);
app.use('/api', openAPIRouter);

module.exports = app;
