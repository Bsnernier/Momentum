const express = require('express');
const router = express.Router();
const db = require('../../db/models');
const { Follower } = db;
const { asyncHandler } = require('../../utils');
const { requireAuth } = require('../../auth')

router.post(
    `/:id`,
    requireAuth,
    asyncHandler(async (req, res) => {
        const userId = res.locals.user.id
        const followerId = req.params.id
        const followBack = await Follower.create({
            followerId: userId,
            userId: followerId,
        })
        res.json({followBack});
    })
  );

router.delete(
    `/:id`,
    requireAuth,
    asyncHandler(async (req, res) => {
        const userId = res.locals.user.id
        const followerId = req.params.id
        const followedUser = await Follower.findOne({
            where: {
                followerId: userId,
                userId: followerId,
            }
        })

        await followedUser.destroy()
        res.json({})
    })
);

router.delete(
    `/:id/block`,
    requireAuth,
    asyncHandler(async (req, res) => {
        const userId = res.locals.user.id
        const followerId = req.params.id
        const blockedUser = await Follower.findOne({
            where: {
                followerId: followerId,
                userId: userId,
            }
        })
        const followedUser = await Follower.findOne({
            where: {
                followerId: userId,
                userId: followerId,
            }
        })

        await followedUser.destroy()
        await blockedUser.destroy()
        res.json({})
    })
)
module.exports = router;
