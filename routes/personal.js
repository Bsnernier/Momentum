const express = require('express');
const router = express.Router();
const { requireAuth } = require('../auth');
const db = require('../db/models');
const { User, Follower } = db;
const {asyncHandler, handleValidationErrors, csrfProtection} = require('../utils');

router.get('/', requireAuth, asyncHandler( async (req, res) => {
    // query to get all the user's followers
    const userId = res.locals.user.id;

    const allFollowers = await User.findByPk(userId, {
        include: [{
            model: User,
            as: 'followers',
        }]
    })


    const allPeopleFollowed = await User.findByPk(userId, {
        include: [{
            model: User,
            as: 'users'
        }]
    })



    const allUsers = allFollowers.followers
    const allUsernames = allUsers.map(user => user.username)

    const allIDs = allFollowers.followers.map(follower => follower.id) //
    const allFollowedIDs = allPeopleFollowed.users.map(user => user.id) // only need one time

    const mutualFollowers = (whoIfollowArray, whoFollowsMeArray) => {
        const ansArray = [];
        whoFollowsMeArray.forEach(personId => {
            if(whoIfollowArray.includes(personId)) {
                mutualArray.push = true;
            } else {
                mutualArray.push = false;
            }
        })
        return mutualArray
    }

    const mutualArray = mutualFollowers(allFollowedIDs, allIDs)
    //     if mutual = true;
    //         buttons are unfollow, and go to user's profile page
    //     else:
    //         buttons are follow back, and go to user's profile
    // *


    res.render('followers', { allFollowers, allPeopleFollowed})
}))

module.exports = router;
