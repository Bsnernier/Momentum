const express = require('express');
const router = express.Router();
const {asyncHandler, handleValidationErrors, cookieParser, csrfProtection} = require('../utils');
const db = require('../db/models');
const { User, Comment } = db;

const commentsRouter = require('../routes/comments');
const likesRouter = require('../routes/likes');

// router.use('/comments', commentsRouter);
// router.use('/likes', likesRouter);

// router.get('/', asyncHandler( async (req, res) => {
//     res.send('this is where all the stories will go')
// }));


//--------------------GET User's Stories Profile-------------------------------
router.get('/:id/users/:id', asyncHandler( async (req, res) => {
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
