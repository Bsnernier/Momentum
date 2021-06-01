var express = require('express');
var router = express.Router();
const {asyncHandler, handleValidationErrors, cookieParser, csrfProtection} = require('../utils');
const db = require('../db/models');
const { User } = db;

const storiesRouter = require('../routes/stories');
const followersRouter = require('../routes/followers');

// router.use('/stories', storiesRouter);
// router.use('/followers', followersRouter);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/signup', csrfProtection, asyncHandler( async (req, res) => {
  console.log('hello')
  const newUser = await User.build()
  res.render('signup', {
    title: 'New User',
    csrfToken: req.csrfToken(),
    newUser
  })
}));

module.exports = router;
