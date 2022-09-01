const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', function (req, res, next) {
    res.redirect('/mangas');
});


// Google login
router.get('/auth/google', passport.authenticate(
    'google',
    {scope: ['profile', 'email']}
));


// Google call back route
router.get('/auth/google/oauth2callback', passport.authenticate(
    'google',
    {
        successRedirect: '/mangas',
        failureRedirect: '/mangas'
    }
));


// Google logout
// router.get('/logout', function (req, res) {
//     req.logout();
//     res.redirect('/mangas');
// });


// copied from stack overflow
router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/mangas');
    });
  });

module.exports = router;
