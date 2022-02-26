const router = require('express').Router();
const passport = require('passport');
//!!__________URRL REDIRECT AFTER SUCCESS
const Client_URL = 'http://localhost:3000';
router.get(
  '/login/failed',

  (req, res) => {
    res.status(401).json({
      success: false,
      message: 'failure',
    });
  }
);

router.get(
  '/login/success',

  (req, res) => {
    if (req.user) {
      res.status(200).json({
        success: true,
        message: 'success',
        user: req.user,
        //cookies:req.cookies
      });
    }
  }
);

router.get(
  '/logout',

  (req, res) => {
    req.logout();
    res.redirect(Client_URL);
  }
);

//! for google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));
router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: Client_URL,
    failureRedirect: '/login/failed',
  })
);

//! for github
router.get('/github', passport.authenticate('github', { scope: ['profile'] }));
router.get(
  '/github/callback',
  passport.authenticate('github', {
    successRedirect: Client_URL,
    failureRedirect: '/login/failed',
  })
);
//! for facebook
router.get(
  '/facebook',
  passport.authenticate('facebook', { scope: ['profile'] })
);
router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: Client_URL,
    failureRedirect: '/login/failed',
  })
);

module.exports = router;
