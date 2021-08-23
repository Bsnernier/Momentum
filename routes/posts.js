const express = require('express');
const router = express.Router();
const {asyncHandler, handleValidationErrors, cookieParser, csrfProtection} = require('../utils');
const db = require('../db/models');
const { User, Comment, Story } = db;
const { requireAuth } = require('../auth')


router.get("/new/:id", requireAuth,asyncHandler(async(req, res)=>{
    try{
        // console.log("______IM HERE!!!!!!!!!");
        const id = parseInt(req.params.id, 10);
        const currentStory = await Story.findByPk(id);
        const {image, location, content} = currentStory;
        res.render("postPrefilled", {image, location, content, id, title1: "MOMENTUM"})
    }catch(e){
        throw e
    }

}))



module.exports = router;
