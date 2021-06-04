const express = require('express');
const router = express.Router();
const {asyncHandler, handleValidationErrors, cookieParser, csrfProtection} = require('../utils');
const db = require('../db/models');
const { User, Comment, Story } = db;
const { requireAuth } = require('../auth')


const commentsRouter = require('../routes/comments');
const likesRouter = require('../routes/likes');

router.get("/", asyncHandler(async(req, res)=>{

    const allStories = await Story.findAll({include: [User, {model:Comment, include: User}], order: [["createdAt", "DESC"]]});
    res.render("stories", {allStories})
}))

router.get("/mystories", asyncHandler(async(req, res)=>{

    const { userId } = req.session.auth;

    const allStories = await Story.findAll({
        include: [User, {model:Comment, include: User}],
        where: {userId},
        order: [["createdAt", "DESC"]]});
    res.render("storiesForPersonal", {allStories})
}))


router.get('/:id/users/:id', requireAuth, asyncHandler( async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const currentUser = await User.findByPk(userId);

    res.render('user', {
        title: currentUser.username,
        currentUser
    })
}))

router.put('/:id/users/:id', asyncHandler( async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const currentUser = await User.findByPk(userId);

    res.render('signup', {
        title: currentUser.username,
        currentUser
    })
}))

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
