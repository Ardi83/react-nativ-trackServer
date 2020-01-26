const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');
const jwtSecret = require('../../config').jwtSecret;

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = new User({ email, password })
    await user.save();
    const token = jwt.sign({ userId: user._id}, jwtSecret)
    res.send(token)
    res.send('You made a post request')
  } catch (error) {
    res.status(422).send(error.message)
  }
})

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(422).send({error: 'Must provide email and password'})
  
  const user = await User.findOne({ email });
  if (!user) return res.status(404).send({error: 'Email not found'})
  
  try {
    await user.comparePassword(password);

    const token = jwt.sign({ userId: user._id}, jwtSecret)
    res.send({token})      
  } catch (error) {
    res.status(422).send(error.message)
  }
})

module.exports = router;