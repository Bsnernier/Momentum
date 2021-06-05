const express = require('express');
const router = express.Router();
const { requireAuth } = require('../auth');
const db = require('../db/models');
const { User } = db;
const { asyncHandler } = require('../utils');

router.get('/', requireAuth, asyncHandler( async (req, res) => {
    // query to get all the user's followers
    const userId = res.locals.user.id;

    const usersFollowers = await User.findByPk(userId, {
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

    const allUsers = usersFollowers.followers

    const allIDs = allUsers.map(follower => follower.id) //
    const allFollowedIDs = allPeopleFollowed.users.map(user => user.id) // only need one time

    const mutualFollowers = (whoIfollowArray, whoFollowsMeArray) => {
        const ansArray = [];
        whoFollowsMeArray.forEach(personId => {
            if(whoIfollowArray.includes(personId)) {
                ansArray.push(true);
            } else {
                ansArray.push(false);
            }
        })
        return ansArray
    }

    const mutualArray = mutualFollowers(allFollowedIDs, allIDs)
    console.log(mutualArray)

    const allFollowers = []
    const populator = (userObjArray, booleanArray) => {
        userObjArray.forEach((userObj, i) => {
            allFollowers.push({ userObj: userObj, mutual: booleanArray[i]})
        })
    }

    populator(allUsers, mutualArray)
    res.render('followers', { allFollowers })
}))

module.exports = router;
