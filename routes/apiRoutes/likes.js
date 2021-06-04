const express = require('express');
const router = express.Router();
const {asyncHandler} = require('../utils');
const db = require('../db/models');
const { Like } = db;

const { requireAuth } = require('../../auth');

router.get('/api/likes', requireAuth, asyncHandler( async (req, res) => {
    console.log("hey")
}))

router.post('/api/likes', requireAuth, asyncHandler( async (req, res) => {
    const storyId = parseInt(req.params.id, 10);
    const loggedUserId = res.locals.user.id
    console.log("THERE IS NO WAY THIS WORKS")

    const currentLike = await Like.findAll({
        where: {
            storyId: {
                [Op.eq]: storyId
            },
            userId: {
                [Op.eq]: loggedUserId
            }
        }
    })

    if(!currentLike) {
        await currentLike.update({
            userId,
            storiesId
        })
    }
}));

router.delete('/', requireAuth, asyncHandler( async (req, res) => {
    const storyId = parseInt(req.params.id, 10);
    const loggedUserId = res.locals.user.id

    const currentLike = await Like.findAll({
        where: {
            storyId: {
                [Op.eq]: storyId
            },
            userId: {
                [Op.eq]: loggedUserId
            }
        }
    })

    await currentLike.destroy()
}));

module.exports = router;
