

const express = require("express");
const { check } = require("express-validator");
const bodyParser = require('body-parser');
const { handleValidationErrors, asyncHandler } = require("../utils");
const { requireAuth } = require("../auth");
const router = express.Router();
const jsonParser = bodyParser.json();
const db = require("../db/models");
const user = require("../db/models/user");

const { Comment, User,  Like } = db;

router.use(express.urlencoded({ extended: false }));

router.get(
    "/:id",
    asyncHandler(async (req, res) => {
        const id = req.params.id
        res.render("comment", { id })
    })
  );

  router.get(
    "/category/:id",
    asyncHandler(async (req, res) => {
        const id = req.params.id
        res.render("commentForCategory", { id })
    })
  );

  router.get(
    "/personal/:id",
    asyncHandler(async (req, res) => {
        const id = req.params.id
        res.render("commentForPersonal", { id })
    })
  );

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
