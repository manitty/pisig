const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');






router.post('/register', (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  User.addUser(newUser, (err, user) =>{
      if(err){
        res.json({success: false, msg: 'failed to register'});
      } else {
        res.json({success: true, msg: 'Registration Success'})
      }


  });
});

router.post('/authenticate', (req, res, next) => {
  res.send('AUTHENTICATE')
});

router.get('/profile', (req, res, next) => {
  res.send('PROFILE')
});

router.get('/validate', (req, res, next) => {
  res.send('VALIDATE')
});





module.exports = router;