const express = require('express')
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express()
app.use(bodyParser.json());
app.use(morgan('dev'));
module.exports = app

const PORT = process.env.PORT || 4001



