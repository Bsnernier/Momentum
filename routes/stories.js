const express = require('express')
const router = express.Router()

const commentsRouter = require('../routes/comments');
const likesRouter = require('../routes/likes');
// const apiStoriesRouter = require('./apiRoutes/stories')
const {asyncHandler, handleValidationErrors, cookieParser, csrfProtection} = require('../utils.js');

// router.use('/comments', commentsRouter);
// router.use('/likes', likesRouter);
// router.use('/api/stories', apiStoriesRouter);

router.get("/", asyncHandler(async(req, res)=>{
    res.render("stories")
}))



module.exports = router;
