const express = require('express');
const router = express.Router();
const {asyncHandler} = require('../utils');
const db = require('../db/models');
const { Like } = db;

const { requireAuth } = require('../auth');

router.get("/commentId/likes", requireAuth, asyncHandler( async(req, res) => {
    const commentId = parseInt(req.params.commentId, 10);
    const currentLikes = await Like.findAndCountAll({
        where: {
            storyId: {
                [Op.eq]: commentId
            }
        }
    })
    return currentLikes
}))

module.exports = router;
