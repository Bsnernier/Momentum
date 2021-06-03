const express = require('express');
const router = express.Router();
const {asyncHandler} = require('../utils');
const db = require('../db/models');
const { Like } = db;

const { requireAuth } = require('../../auth');

router.post('/:commentId/likes', requireAuth, asyncHandler( async (req, res) => {
    const commentId = parseInt(req.params.commentId, 10);
    const loggedUserId = req.params.user.id

    const currentLike = await Like.findAll({
        where: {
            commentId: {
                [Op.eq]: commentId
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
    const commentId = parseInt(req.params.id, 10);
    const loggedUserId = req.params.user.id

    const currentLike = await Like.findAll({
        where: {
            commentId: {
                [Op.eq]: commentId
            },
            userId: {
                [Op.eq]: loggedUserId
            }
        }
    })

    await currentLike.destroy()
}));
