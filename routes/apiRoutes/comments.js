const express = require("express");
const { check } = require("express-validator");
const bodyParser = require('body-parser');
const { handleValidationErrors, asyncHandler } = require("../../utils");
const { requireAuth } = require("../../auth");
const router = express.Router();
const jsonParser = bodyParser.json();
const db = require("../../db/models");
const user = require("../../db/models/user");

const { Comment, Story, User, Like } = db;

// router.use(requireAuth);

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.get(
    "/",
    asyncHandler(async (req, res) => {

      const comments = await Comment.findAll({
        include: User,
        order: [["createdAt", "DESC"]]
      });

    //   res.render("stories", { stories });
    //   res.render("comment")

      res.json({comments})
     
    //   res.redirect("/")
    })
  );

const validateComment = [
    check("content")
      .exists({ checkFalsy: true })
      .withMessage("Comment can't be empty."),
    //  message cannot be longer than 280 characters:
    check("content")
      .isLength({ max: 500 })
      .withMessage("Comment can't be longer than 280 characters."),
    handleValidationErrors,
];

// router.get("/:id",
// validateComment,
// jsonParser,
// asyncHandler(async (req, res) => {



// }))

router.post(
    "/:id",
    validateComment,
    jsonParser,
    asyncHandler(async (req, res) => {
      const { content,userId, storyId } = req.body;
    //   console.log(req.body);
      try{
        // const user = await User.create({ username: "XXX", firstName: "Jia", lastName:"X", email:"xyz@gmail.com", password:"dxaid#!"})
        const id = req.params.id
        const { userId } = req.session.auth;
        const comments = await Comment.create({ content, userId: userId, storyId:id });
        res.json({comments})
      }catch(e){
        console.log("Error in posting comment");
        console.log(e);
      }
    //   console.log(Comment);
    })
);
//---------------------------------------------------------------------------


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

router.delete('/:id', asyncHandler( async (req, res) => {
    try{
        const commentId = parseInt(req.params.id, 10);
        const {userId} = req.session.auth;
        const currentComment = await Comment.findOne({
            include: Story,
            where: {
                id: commentId,
            }
        })
        if(currentComment){
            if(currentComment.userId == userId || currentComment.Story.userId == userId){
                await currentComment.destroy()
                res.send(200);
                // res.redirect('/stories');
            }else{
                res.send(400)
                console.log("you can not delete this!");
            }

        }else{
            res.send(400)
            console.log("comment not found!");
        }
    }catch(e){
        res.send(400)
        console.log(e);
    }
// console.log("finish deleting!!!!!");
}));


module.exports = router
