require('./models/User');
require('./models/Track');
const express = require('express');
const mongoose = require('mongoose');

const mongoUrl = require('../config').mongoURL;
const requireAuth = require('./middlewares/requireAuth');

const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');

const app = express();
app.use(express.json())

app.use(authRoutes);
app.use(trackRoutes);

mongoose.connect(
  mongoUrl, 
  { useNewUrlParser: true, 
    useCreateIndex: true, 
    useUnifiedTopology: true 
  }
)

mongoose.connection.on('connected', () => console.log('connected to db'))
mongoose.connection.on('error', (err) => console.error(err))


app.get('/', requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.email}`)
})

const PORT = process.env.PORT || 3434; 
const HOST = '0.0.0.0';

app.listen(PORT, HOST,  () => console.log(`Listening to ${PORT}`));
