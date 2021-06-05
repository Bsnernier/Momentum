const express = require('express');
const router = express.Router();
const {asyncHandler, handleValidationErrors, cookieParser, csrfProtection} = require('../utils');
const db = require('../db/models');
const { User, Comment, Story } = db;
const { requireAuth } = require('../auth')


router.get("/post/new/:id", asyncHandler(async(req, res)=>{


    

    res.render("postPrefilled", {content, image, location})
}))



module.exports = router;
