const express = require('express')
const router = express.Router()
const db = require("../db/models")
const {Story, User} = db

const commentsRouter = require('../routes/comments');
const likesRouter = require('../routes/likes');
// const apiStoriesRouter = require('./apiRoutes/stories')
const {asyncHandler, handleValidationErrors, cookieParser, csrfProtection} = require('../utils.js');

// router.use('/comments', commentsRouter);
// router.use('/likes', likesRouter);
// router.use('/api/stories', apiStoriesRouter);

router.get("/", asyncHandler(async(req, res)=>{
    const allStories = await Story.findAll({include: User});
    res.render("stories", {allStories})
}))

// router.get('/', csrfProtection, validators, asyncHandler(async(req, res)=>{
//     const allPost = await Story.findByPk(30, {include: User});

//     const {username, image, content} = allPost

//     console.log(username);
//     res.render("stories", {username, image, content})
// }))

module.exports = router;
