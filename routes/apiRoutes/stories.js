
// const commentsRouter = require('./routes/comments');
// const likesRouter = require('./routes/likes');

// app.use('/comments', commentsRouter);
// app.use('/likes', likesRouter);

const express = require("express");
const { check } = require("express-validator");
const bodyParser = require('body-parser');
const { handleValidationErrors, asyncHandler } = require("../../utils");
const { requireAuth } = require("../../auth");
const router = express.Router();
const jsonParser = bodyParser.json();
const db = require("../../db/models");
const user = require("../../db/models/user");

const { Story, User,Comment } = db;

// router.use(requireAuth);

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.get(
    "/",
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


const storyNotFoundError = (id) => {
    const err = Error("Story not found");
    err.errors = [`Story with id of ${id} could not be found.`];
    err.title = "Story not found.";
    err.status = 404;
    return err;
};

const validateStory = [
    check("content")
      .exists({ checkFalsy: true })
      .withMessage("Story can't be empty."),
    //  message cannot be longer than 280 characters:
    check("content")
      .isLength({ max: 280 })
      .withMessage("Story can't be longer than 280 characters."),
    handleValidationErrors,
  ];

// router.get(
// "/:id",
// asyncHandler(async (req, res, next) => {
//     const story = await Story.findOne({
//     where: {
//         id: req.params.id,
//     },
//     });
//     if (story) {
//     res.json({ story });
//     } else {
//     next(storyNotFoundError(req.params.id));
//     }
// })
// );

router.post(
    "/",
    requireAuth,
    validateStory,
    jsonParser,
    asyncHandler(async (req, res) => {

      try{
        const { content, image, location, category} = req.body;
        const { userId } = req.session.auth;
        const story = await Story.create({ category, content, image, location, userId});
        res.send(200)
      }catch(e){
        console.log(e);
        res.send(400)
      }

    })
);


router.delete('/:id', asyncHandler( async (req, res) => {
  try{
      const storyId = parseInt(req.params.id, 10);
      if(req.session.auth){
        const {userId} = req.session.auth;
        console.log(userId);
      }

      const currentStory = await Story.findOne({
        where:{
          id: storyId,
        }
      })

      if(currentStory){
          await currentStory.destroy()
          res.send(200);

      }else{
          res.send(400)
          console.log("story not found!");
      }
  }catch(e){
      res.send(400)
      console.log(e);
  }
}));



router.put('/:id', async function (req, res) {
  try{
    const {content, image, category, location} = req.body
    const {userId} = req.session.auth;

    const currentStory = await Story.update({
      category,
      content,
      image,
      location,
      userId
    })
    const {category1,content1,image1,location1,userId1 } = currentStory
    res.render("postPrefilled", {category:category1,content:content1,image:image1,location:location1,userId: userId1});
    

}catch(e){
    res.send(400)
    console.log(e);
}
});

  module.exports = router;
