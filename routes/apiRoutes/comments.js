const express = require("express");
const { check } = require("express-validator");
const bodyParser = require('body-parser');
const { handleValidationErrors, asyncHandler } = require("../../utils");
const { requireAuth } = require("../../auth");
const router = express.Router();
const jsonParser = bodyParser.json();
const db = require("../../db/models");
const user = require("../../db/models/user");

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
    //   res.render("comment")
      console.log("comment root render finished");
      res.json({comments})
      console.log("comment root get finished");
    //   res.redirect("/")
    })
  );

const validateComment = [
    check("content")
      .exists({ checkFalsy: true })
      .withMessage("Comment can't be empty."),
    //  message cannot be longer than 280 characters:
    check("content")
      .isLength({ max: 280 })
      .withMessage("Comment can't be longer than 280 characters."),
    handleValidationErrors,
];

router.post(
    "/",
    validateComment,
    jsonParser,
    asyncHandler(async (req, res) => {
      const { content,userId, storiesId } = req.body;
      console.log(req.body);
      try{
        // const user = await User.create({ username: "XXX", firstName: "Jia", lastName:"X", email:"xyz@gmail.com", password:"dxaid#!"})
        const Comments = await Comment.create({ content,userId, storiesId });
        res.json({comments})
      }catch(e){
        console.log(e);
      }
    //   console.log(Comment);
    })
);

module.exports = router;
