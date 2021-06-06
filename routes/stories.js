const express = require('express');
const router = express.Router();
const {asyncHandler, handleValidationErrors, csrfProtection} = require('../utils');
const db = require('../db/models');
const { User, Comment, Story, Like } = db;
const { requireAuth } = require('../auth')
const { Op } = require("sequelize")


// const likesRouter = require('../routes/likes');
const commentsRouter = require('./comments');
const user = require('../db/models/user');
// const apiStoriesRouter = require('./apiRoutes/likes')

router.use('/:id/comments', commentsRouter);
// router.use('/api/likes', apiStoriesRouter);

router.get("/", requireAuth, asyncHandler(async(req, res)=>{
    const loggedInUser = res.locals.user.id
    const allStories = await Story.findAll({include: [User, {model:Comment, order: [["createdAt", "DESC"]], include: User}], order: [["createdAt", "DESC"]]});
    const { userId } = req.session.auth;
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
    res.render("stories", {allStories, userId})
}))

// router.get("/", asyncHandler(async(req, res)=>{

//     const allStories = await Story.findAll({include: [User, {model:Comment, include: User}], order: [["createdAt", "DESC"]]});
//     res.render("stories", {allStories})
// }))

//--------------------GET User's Stories Profile-------------------------------
router.get("/mystories", asyncHandler(async(req, res)=>{


    const { userId } = req.session.auth;
//---------------------------------------------------------beginning of likes loop
    const allStories = await Story.findAll({
        include: [User, {model:Comment, include: User}],
        where: {userId},
        order: [["createdAt", "DESC"]]});

    for (i = 0; i < allStories.length; i++) {
        const storyId = allStories[i].id
        const currentLikes = await Like.findAndCountAll({
            where: {
                storyId,
            }
        })
        const userArr = currentLikes.rows.map((like) => like.userId)
        if (userArr.includes(userId)) {
            allStories[i].liked = true
        } else {
            allStories[i].liked = false
        }
        allStories[i].likes = currentLikes.count
    }

    res.render("storiesForPersonal", {allStories, userId})

}))

router.get('/:id/users/:id', requireAuth, asyncHandler( async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const currentUser = await User.findByPk(userId);

    res.render('user', {
        title: currentUser.username,
        currentUser
    })
}))


//-------------------PUT Update User's Story-----------------------------------
router.put('/:id/users/:id', requireAuth, asyncHandler( async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const currentUser = await User.findByPk(userId);

    res.render('signup', {
        title: currentUser.username,
        currentUser
    })
}))

router.put('/:id/users/:id/comments/:id', requireAuth, asyncHandler( async (req, res) => {
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
router.delete('/:id/users/:id', requireAuth, asyncHandler( async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const currentUser = await User.findByPk(userId);

    res.render('user', {
        title: currentUser.username,
        currentUser
    })
}))


router.get("/:category", requireAuth, asyncHandler( async (req, res) => {
    const category = req.params.category;
    // console.log(req.params);
    const { userId } = req.session.auth;
    const loggedInUser = res.locals.user.id
    const allStories = await Story.findAll({include: [User, {model:Comment, include: User}], order: [["createdAt", "DESC"]],
        where:{
            category
        }
    });

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

    res.render('stories', {
        userId,
        allStories
    })
}))

module.exports = router;
