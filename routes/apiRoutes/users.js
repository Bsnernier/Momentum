var express = require('express');
var router = express.Router();
const db = require('../../db/models');
const { User, Follower } = db;
const {asyncHandler, handleValidationErrors,csrfProtection} = require('../../utils');
const { validationResult, check } = require('express-validator')
const { requireAuth } = require('../auth.js')

router.post(
    `/users/${id}`,
    requireAuth,
    asyncHandler(async (req, res) => {
        const userId = res.locals.user.id
        const newFollower = await Follower.create({

        })
    })
  );


router.post(
"`/users/${id}`",
requireAuth,
asyncHandler(async (req, res) => {
    const stories = await Story.findAll({
    include: User,
    order: [["createdAt", "DESC"]]
    });
//   console.log(stories);
//   res.render("stories", { stories });
    res.json({stories})
//   res.redirect("/")
})
);

module.exports = router;
