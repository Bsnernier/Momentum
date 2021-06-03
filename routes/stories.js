const express = require('express');
const router = express.Router();
const {asyncHandler, handleValidationErrors, cookieParser, csrfProtection} = require('../utils');
const db = require('../db/models');
const { User, Comment, Story } = db;
const { requireAuth } = require('../auth')


const commentsRouter = require('../routes/comments');
const likesRouter = require('../routes/likes');
// const apiStoriesRouter = require('./apiRoutes/stories')

router.use('/:id/comments', commentsRouter);
router.use('/:id/likes', likesRouter);
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

// router.get('/', asyncHandler( async (req, res) => {
//     res.send('this is where all the stories will go')
// }));


//--------------------GET User's Stories Profile-------------------------------
router.get('/:id/users/:id', requireAuth, asyncHandler( async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const currentUser = await User.findByPk(userId);

    res.render('user', {
        title: currentUser.username,
        currentUser
    })
}))

//-------------------PUT Update User's Story-----------------------------------
router.put('/:id/users/:id', asyncHandler( async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const currentUser = await User.findByPk(userId);

    res.render('signup', {
        title: currentUser.username,
        currentUser
    })
}))

//-------------------PUT Update User's Comments------------------------------
router.put('/:id/users/:id/comments/:id', asyncHandler( async (req, res) => {
    const commentId = parseInt(req.params.id, 10); //IDK if this will work or how to fix
                                                   //if it doesn't
    const currentComment = await Comment.findByPk(commentId);
    const currentUser = await User.findByPk(currentComment.userId);

    res.render('comment', {
        title: `${currentUser.username}'s Comment`,
        currentComment
    })
}))

//-------------------DELETE User's Profile----------------------------------
router.delete('/:id/users/:id', asyncHandler( async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const currentUser = await User.findByPk(userId);

    res.render('user', {
        title: currentUser.username,
        currentUser
    })
}))

module.exports = router;
