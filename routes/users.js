const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');


const User = require('../models/users');

router.post('/register', (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });


  User.addUserPassword( req.body.password, (err, user) =>{
      if(err){
        res.json({success: false, msg: 'password failed to register'});
      } else {
        res.json({success: true, msg: 'password Registration Success'})
      }
  });



/*
  User.addUsername(newUser, (err, user) =>{
      if(err){
        res.json({success: false, msg: 'Username failed to register'});
      } else {
        res.json({success: true, msg: 'Username Registration Success'})
      }
  });
*/


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
