const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()
const mongoUrl = require('../config').mongoURL;

const app = express();

mongoose.connect(mongoUrl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
mongoose.connection.on('connected', () => console.log('connected to db'))
mongoose.connection.on('error', (err) => console.error(err))


app.get('/', (req, res) => res.send( JSON.stringify({"msg": "express and route is work "})) )

app.listen(3000, () => console.log('Listening to 3000') )