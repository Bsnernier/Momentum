const express = require('express')
const router = express.Router()

const commentsRouter = require('../routes/comments');
const likesRouter = require('../routes/likes');
const {asyncHandler, handleValidationErrors, cookieParser, csrfProtection} = require('../../utils');

// router.use('/comments', commentsRouter);
// router.use('/likes', likesRouter);

router.get("/", asyncHandler(async(req, res)=>{
    res.render("stories")
}))
