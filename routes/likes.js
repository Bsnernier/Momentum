const express = require('express');
const router = express.Router();
const {asyncHandler} = require('../utils');
const db = require('../db/models');
const { Like } = db;

const { requireAuth } = require('../auth');

router.get("/", requireAuth, asyncHandler( async(req, res) => {
    const storyId = parseInt(req.params.id, 10);
    const currentLikes = await Like.findAndCountAll({
        where: {
            storyId: {
                [Op.eq]: storyId
            }
        }
    })
    return currentLikes
}))

module.exports = router;
