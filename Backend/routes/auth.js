// routes/auth.js
const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();


const comparePassword = async(password , hash)=>{
  const check =  bcrypt.compareSync(password, hash);
  return check;
  

}

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = new User({ name, email, password });
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token, user });
  } catch (error) {
    console.log(error.message);
    
    res.status(400).send('Registration failed');
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(email,password);
  
  const user = await User.findOne({ email });
  if (!user || !(await comparePassword(password, user.password))) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token, user });
});


// function comparePassword(password, hash){
//   const passcheck = bcrypt.compareSync(password , hash);
//   console.log(passcheck);    
//   return passcheck;
// }





module.exports = router;
