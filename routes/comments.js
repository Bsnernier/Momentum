
const express = require("express");
const { check } = require("express-validator");
const bodyParser = require('body-parser');
const { handleValidationErrors, asyncHandler } = require("../utils");
const { requireAuth } = require("../auth");
const router = express.Router();
const jsonParser = bodyParser.json();
const db = require("../db/models");
const user = require("../db/models/user");

const { Comment, User } = db;

// router.use(requireAuth);

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.get(
    "/",
    asyncHandler(async (req, res) => {
        console.log("!!!!!!!!comment root get");
      const comments = await Comment.findAll({
        include: User,
        order: [["createdAt", "DESC"]]
      });
      console.log("comment root find sql finished");
    //   res.render("stories", { stories });
      res.render("comment")
      console.log("comment root render finished");
    //   res.json({comments})
      console.log("comment root get finished");
    //   res.redirect("/")
    })
  );

  module.exports = router;
