// var express = require('express');
// var router = express.Router();
// const {asyncHandler, handleValidationErrors, cookieParser, csrfProtection} = require('../utils');
// const db = require('../db/models');
// const { Story, User } = db;
// const { validationResult, check } = require('express-validator')
// const bcrypt = require('bcryptjs')



// const validators = [
//     check('img')
//         .exists({ checkFalsy: true })
//         .withMessage('Please provide a url for img')
//         .isLength({ max: 50 })
//         .withMessage('img url must not be more than 50 characters long'),
//     check('location')
//         .exists({ checkFalsy: true })
//         .withMessage('Please provide a value for Location')
//         .isLength({ max: 50 })
//         .withMessage('Location must not be more than 50 characters long'),
//     check('content')
//         .exists({ checkFalsy: true })
//         .withMessage('Please provide a value for content')
//         .isLength({ max: 255 })
//         .withMessage('Content must not be more than 255 characters long')
//   ]





// router.get('/new',async function(req, res, next) {
//     res.render('post');
// });



// router.post('/new', validators, asyncHandler( async (req, res, next) => {
//     // console.log("test route")
//     const {
//       image,
//       content,
//       location,
//       userId,
//       category
//     } = req.body;

//     const story = await Story.build({
//         image,
//         content,
//         location,
//         userId,
//         category
//     });

//     const validatorErrors = validationResult(req);

//     if (validatorErrors.isEmpty()) {

//       await story.save();
//       const { image,content,location} = req.body

//       res.render('stories', {image,content,location})
//     } else {
//       const errors = validatorErrors.array().map((error) => error.msg)
//       console.log(errors)
//     }
//   }));

// // router.get('/', csrfProtection, validators, asyncHandler(async(req, res)=>{
// //     const allPost = await Story.findByPk(30, {include: User});
// //     const {username, image, content} = allPost
// //     res.render("stories", {username, image, content})
// // }))



// module.exports = router;
