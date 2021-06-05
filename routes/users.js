const express = require('express');
const router = express.Router();
const {asyncHandler, handleValidationErrors, cookieParser, csrfProtection} = require('../utils');
const db = require('../db/models');
const { User } = db;
const { validationResult, check } = require('express-validator')
const bcrypt = require('bcryptjs')

const storiesRouter = require('../routes/stories');
const followersRouter = require('../routes/followers');
const { loginUser, logoutUser, restoreUser } = require('../auth');

// router.use('/stories', storiesRouter);
// router.use('/followers', followersRouter);

/* GET users listing. */
router.get('/', asyncHandler( async(req, res, next) => {
  const users = await User.findAll();

  res.send(users[0].username)
}));

router.get('/signup', csrfProtection, (req, res) => {
  const newUser = User.build()
  res.render('signup', {
    title: 'New User',
    newUser,
    csrfToken: req.csrfToken()
  })
});

const registerValidators = [
  check('username')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a value for Username')
      .isLength({ max: 50 })
      .withMessage('Username must not be more than 50 characters long'),
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
  check('email')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a value for Email Address')
      .isLength({ max: 255 })
      .withMessage('Email Address must not be more than 255 characters long')
      .isEmail()
      .withMessage('Email Address is not a valid email')
      .custom((value) => {
          return db.User.findOne({ where: { email: value } })
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

router.post('/signup', csrfProtection, registerValidators, asyncHandler( async (req, res, next) => {
  const {
    username,
    firstName,
    lastName,
    email,
    password
  } = req.body;

  const user = await User.build({
    username,
    firstName,
    lastName,
    email
  });

  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) {
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();
    loginUser(req,res,user)
    res.redirect('/')
  } else {
    const errors = validatorErrors.array().map((error) => error.msg)
    console.log(errors)
    res.render('signup', {
      title: 'New User',
      errors,
      user,
      csrfToken: req.csrfToken()
    })
  }
}));


const loginValidators = [
  check('email')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Email Address'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Password'),
];

router.get('/login', csrfProtection, asyncHandler(async (req, res) => {
  res.render('login', {
    title: 'Login',
    csrfToken: req.csrfToken(),
  });
})
);

router.post('/login', csrfProtection, loginValidators,
  asyncHandler(async (req, res, next) => {
    const {
      email,
      password,
    } = req.body;

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      const user = await db.User.findOne({ where: { email } });
      if (user !== null) {
        const passwordMatch = await bcrypt.compare(password, user.password.toString());
        if (passwordMatch) {
          loginUser(req,res,user)
          return res.redirect('/');
        }
      }
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render('login', {
        title: 'Login',
        email,
        errors,
        csrfToken: req.csrfToken(),
      });
    }}));

router.post('/logout', (req, res) => {
  logoutUser(req, res);
  res.redirect('/users/login');
});

module.exports = router;
