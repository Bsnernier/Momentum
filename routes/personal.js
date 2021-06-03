const express = require('express');
const router = express.Router();
const { requireAuth } = require('../auth');
const db = require('../db/models');
const { User, Follower } = db;
const {asyncHandler, handleValidationErrors, csrfProtection} = require('../utils');




router.get('/followers/', requireAuth, asyncHandler( async (req, res) => {
    // query to get all the user's followers
    const userId = res.locals.user.id;

    const allFollowers = await User.findByPk(userId, {
        include: [{
            model: User,
            as: 'followers'
        }]
    })

    const allPeopleFollowed = await User.findByPk(userId, {
        include: [{
            model: User,
            as: 'users'
        }]
    })
    console.log(allFollowers)
    console.log(allPeopleFollowed)
    // const mutualFollower = (user, follower) => {

    //     const userId = user.id
    //     const followerId = follower.userId
    //     //grab the followerId here in a query, and check if they are mutual, return true




    //     return false
    // }

    // allFollowers.forEach(follower => {
    //     if (mutualFollower(user, follower)) {
    //         //1st button is go to user page
    //         //query or fetch to go to user/:id based on follower
    //         //2nd button is unfollow

                //update each follower to have a key of mutual or not!!!!
    //     } else {
    //         //buttons are go to user page
    //         //query or fetch to go to user/:id based on follower

    //     }
    // })
    // /*  checker to see if following state,
    //     if following,
    //         buttons are unfollow, and go to user page
    //     if not follow
    //         buttons are follow back, and go to user page
    // */

    res.render('followers', { allFollowers, allPeopleFollowed })
}))
