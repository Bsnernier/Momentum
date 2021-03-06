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

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.get(
    "/",
    requireAuth,
    asyncHandler(async (req, res) => {

      const comments = await Comment.findAll({
        include: User,
        order: [["createdAt", "DESC"]]
      });

      res.json({comments})
    })
  );

const validateComment = [
    check("content")
      .exists({ checkFalsy: true })
      .withMessage("Comment can't be empty."),
    check("content")
      .isLength({ max: 500 })
      .withMessage("Comment can't be longer than 280 characters."),
    handleValidationErrors,
];

router.post(
    "/category/:id",
    validateComment,
    jsonParser,
    requireAuth,
    asyncHandler(async (req, res) => {
      const { content } = req.body;
      console.log('category')

      try{
        const id = req.params.id
        const { userId } = req.session.auth;
        const story = await Story.findByPk(id)
        const {category} = story;
        const comments = await Comment.create({ content, userId: userId, storyId:id });
        res.json({comments, category})
      }catch(e){
        console.log("Error in posting comment");
        console.log(e);
        res.send(400);
      }
      console.log("Finished commenting for category");
    })
);

router.post(
    "/:id",
    validateComment,
    jsonParser,
    requireAuth,
    asyncHandler(async (req, res) => {
      const { content } = req.body;
      console.log('normal')

      try{
        const id = req.params.id
        const { userId } = req.session.auth;
        const story = await Story.findByPk(id)
        const {category} = story;
        const comments = await Comment.create({ content, userId: userId, storyId:id });
        res.json({comments, category})
      }catch(e){
        console.log("Error in posting comment");
        console.log(e);
      }
    })
);

router.post(
    "/personal/:id",
    validateComment,
    jsonParser,
    requireAuth,
    asyncHandler(async (req, res) => {
      const { content } = req.body;
      console.log('personal')

      try{
        const id = req.params.id
        const { userId } = req.session.auth;
        const story = await Story.findByPk(id)
        const {category} = story;
        const comments = await Comment.create({ content, userId: userId, storyId:id });
        res.json({comments, category})
      }catch(e){
        console.log("Error in posting comment");
        console.log(e);
      }
    })
);



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

// router.delete('/', requireAuth, asyncHandler( async (req, res) => {
//     const commentId = parseInt(req.params.id, 10);
//     const loggedUserId = req.params.user.id

//     const currentLike = await Like.findAll({
//         where: {
//             commentId: {
//                 [Op.eq]: commentId
//             },
//             userId: {
//                 [Op.eq]: loggedUserId
//             }
//         }
//     })

//     await currentLike.destroy()
// }));

router.delete('/:id',requireAuth, asyncHandler( async (req, res) => {
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
}));

router.put('/:id', requireAuth, asyncHandler( async (req, res) => {
  const commentId = parseInt(req.params.id, 10); //IDK if this will work or how to fix
  const {content} = req.body                                          //if it doesn't

  const {userId} = req.session.auth;

  Comment.update({content},
    {
      where: {
        id:commentId,
        userId
      }
    })

    res.send(200);
}))


module.exports = router
