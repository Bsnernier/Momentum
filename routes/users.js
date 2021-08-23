const express = require('express');
const router = express.Router();
const {asyncHandler, handleValidationErrors, csrfProtection} = require('../utils');
const db = require('../db/models');
const { User } = db;
const { validationResult, check } = require('express-validator')
const bcrypt = require('bcryptjs')

const storiesRouter = require('../routes/stories');

const personalRouter = require('../routes/personal');
const { loginUser, logoutUser, requireAuth } = require('../auth');

// router.use('/stories', storiesRouter);



/* GET users listing. */
router.use('/followers', personalRouter)


// what is this???
router.get('/', asyncHandler( async(req, res, next) => {
  const users = await User.findAll();
  res.send(users[0].username)
}));



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



router.post('/signup', registerValidators, csrfProtection, registerValidators, asyncHandler( async (req, res, next) => {
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
    res.render('signup', {
      title: 'New User',
      errors,
      user,
      title1: "MOMENTUM",
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

router.get('/login', loginValidators, csrfProtection, asyncHandler(async (req, res) => {
  res.render('login', {
    title: 'Login',
    title1: "MOMENTUM",
    errors:"",
    csrfToken: req.csrfToken(),
  });
})
);

router.get('/signup', loginValidators, registerValidators, csrfProtection, (req, res) => {
  const newUser = User.build()
  res.render('signup', {
    title: 'New User',
    newUser,
    title1: "MOMENTUM",
    errors:"",
    csrfToken: req.csrfToken()
  })
});

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

      errors = validatorErrors.array().map((error) => error.msg);
    }
    res.render('login', {
      title: 'Login',
      email,
      errors,
      title1: "MOMENTUM",
      csrfToken: req.csrfToken(),
    });
  }));

  router.post('/demo', csrfProtection, loginValidators,
  asyncHandler(async (req, res) => {
    const email = 'troybarnes@gmail.com'
    const password = 'Ab1!'

    const user = await db.User.findOne({ where: { email } });
      if (user !== null) {
        const passwordMatch = await bcrypt.compare(password, user.password.toString());
        if (passwordMatch) {
          loginUser(req,res,user)
          return res.redirect('/');
        }
    res.render('login', {
      title: 'Login',
      email,
      errors,
      title1: "MOMENTUM",
      csrfToken: req.csrfToken(),
    });
    }
  }));



router.post('/logout', loginValidators, (req, res) => {
  logoutUser(req, res);
  res.redirect('/users/login');
});




// router.get('/:id', requireAuth, asyncHandler( async (req, res) => {
//   //pathway to show us the personal page of the user?

// }))

// router.get('/:id', requireAuth, asyncHandler( async (req, res) => {
//   //pathway to show us the personal page of the user?
// }))

module.exports = router;
