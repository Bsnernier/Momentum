var express = require('express');
var router = express.Router();
const db = require('../../db/models');
const { User } = db;
const storiesRouter = require('./routes/stories');
const followersRouter = require('./routes/followers');
const {asyncHandler, handleValidationErrors, cookieParser, csrfProtection} = require('../../utils');
const { validationResult, check } = require('express-validator')
const bcrypt = require('bcryptjs')

router.use('/stories', storiesRouter);
router.use('/followers', followersRouter);

const registerValidators = [
  check('firstName')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a value for First Name')
      .isLength({ max: 50 })
      .withMessage('First Name must not be more than 50 characters long'),
  check('lastName')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a value for Last Name')
      .isLength({ max: 50 })
      .withMessage('Last Name must not be more than 50 characters long'),
  check('emailAddress')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a value for Email Address')
      .isLength({ max: 255 })
      .withMessage('Email Address must not be more than 255 characters long')
      .isEmail()
      .withMessage('Email Address is not a valid email')
      .custom((value) => {
          return db.User.findOne({ where: { emailAddress: value } })
            .then((user) => {
              if (user) {
                return Promise.reject('The provided Email Address is already in use by another account');
              }
            })
      }),
  check('password')
      .exists({checkFalsy: true})
      .withMessage('Please provide a value for Password')
      .isLength({ max: 50 })
      .withMessage('Password must not be more than 50 characters long')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
      .withMessage('Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'),
  check('confirmPassword')
      .exists({checkFalsy: true})
      .withMessage('Please provide a value for Confirm Password')
      .isLength({ max: 50 })
      .withMessage('Password must not be more than 50 characters long')
      .custom((value, { req }) => {
          if (value !== req.body.password) {
            throw new Error('Confirm Password does not match Password');
          }
          return true;
      })
]

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// router.get('/signup', csrfProtection, asyncHandler( async (req, res) => {
//   const newUser = await User.build()
//   res.render('signup', {
//     title: 'New User',
//     csrfToken: req.csrfToken(),
//     newUser
//   })
// }));

router.post('/signup', csrfProtection, registerValidators, asyncHandler((req, res) => {
  const {
    username,
    firstName,
    lastName,
    emailAddress,
    password
  } = req.body;
  const user = await User.build({
    username,
    firstName,
    lastName,
    emailAddress
  })
  const validationErrors = validationResult(req)
  if (validatorErrors.isEmpty()) {
    const hashedPassword = await bcrypt.hash(password, 10);
    user.hashedPassword = hashedPassword;
    await user.save();
    res.redirect('/')
}
res.redirect('/')
}));

module.exports = router;
