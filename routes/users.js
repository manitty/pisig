const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const config = require('../config/database');
const User = require('../models/users');


//Begin Register Route
router.post('/register', (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });


  User.addUser(newUser, (err, user) =>{
      if(err){
        res.json({success: false, msg: 'Registration Failed'});
      } else {
        res.json({success: true, msg: 'Registration Success'})
      }
  });

});
// End Redister Route


router.post('/authenticate', (req, res, next) => {

  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: 'User not Found'})
    }
    
    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign(user.toJSON(), config.secret, {
          expiresIn: 604800 // 1 week
        });

        res.json({
          success: true,
          token: 'jwt '+token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        });

      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }

    });

  });
  
});


router.get('/profile', passport.authenticate('jwt'), (req, res, next) => {
  res.json({user: req.user});
});


router.get('/validate', (req, res, next) => {
  res.send('VALIDATE')
});


module.exports = router;
