const express = require('express');
const router = express.Router();
const {asyncHandler, handleValidationErrors, cookieParser, csrfProtection} = require('../utils');
const db = require('../db/models');
const { User, Comment, Story, Like } = db;
const { requireAuth } = require('../auth')
const { Op } = require("sequelize")


const commentsRouter = require('./comments');
const user = require('../db/models/user');
// const apiStoriesRouter = require('./apiRoutes/likes')

router.use('/:id/comments', commentsRouter);
// router.use('/api/likes', apiStoriesRouter);

router.get("/", asyncHandler(async(req, res)=>{
    const loggedInUser = res.locals.user.id
    const allStories = await Story.findAll({include: User});

//---------------------------------------------------------beginning of likes loop
    for (i = 0; i < allStories.length; i++) {
        const storyId = allStories[i].id
        const currentLikes = await Like.findAndCountAll({
            where: {
                storyId,
            }
        })
        const userArr = currentLikes.rows.map((like) => like.userId)
        if (userArr.includes(loggedInUser)) {
            allStories[i].liked = true
        } else {
            allStories[i].liked = false
        }
        allStories[i].likes = currentLikes.count
    }
//---------------------------------------------------------end of likes loop
    res.render("stories", {allStories})
}))

// router.get("/:id", asyncHandler(async(req, res) => {
//     const id = req.params.id
//     const story = await Story.findByPk(`${id}`, {include: User});

//     const likesCount = await Like.findAndCountAll({
//         where: {
//             storyId: id,
//         }
//     })

//     story.likes = likesCount.count

//     res.render("stories", {story})
// }))

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
