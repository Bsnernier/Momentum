
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


const { Story, User, Like, Comment } = db;


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

// router.post(
//     "/",
//     requireAuth,
//     validateStory,
//     jsonParser,
//     asyncHandler(async (req, res) => {

//       try{
//         const { content, image, location, category} = req.body;
//         const { userId } = req.session.auth;
//         const story = await Story.create({ category, content, image, location, userId});
//         res.send(200)
//       }catch(e){
//         console.log(e);
//         res.send(400)
//       }

//     })
// );

router.post(
  "/",
  requireAuth,
  validateStory,
  jsonParser,
  asyncHandler(async (req, res) => {
    console.log("api/posting")
    try{
      const { content, image, location, category} = req.body;
      const { userId } = req.session.auth;
      const story = await Story.create({ category, content, image, location, userId});
      // res.json({story})
      res.send(200)
    }catch(e){
      console.log(e);
      res.send(400)
    }
    console.log("guschen802: api/posting finished")
  })
);

router.get('/:id/likes', requireAuth, asyncHandler( async (req, res) => {
  const storyId = parseInt(req.params.id, 10);
  const loggedUserId = res.locals.user.id
  let likeState = ''

  const currentLike = await Like.findAll({
    where: {
        storyId,
    }
  })

  const userLike = await Like.findOne({
    where: {
        storyId,
        userId: loggedUserId
    }
  })
  if(userLike) {
    likeState = true
  } else {
    likeState = false
  }
  await res.json({currentLike, likeState})
}))

router.post('/:id/likes', requireAuth, asyncHandler( async (req, res) => {
  const storyId = parseInt(req.params.id, 10);
  const loggedUserId = res.locals.user.id
  let likeState = false

  const currentLike = await Like.findOne({
    where: {
        storyId,
        userId: loggedUserId
    }
  })

  if(!currentLike) {
      const newLike = await Like.build({
          count: 1,
          userId: loggedUserId,
          storyId
      })
      likeState = true
      res.locals.storyId = true
      await newLike.save()
  }

  res.json({currentLike, likeState})
}));

router.delete('/:id/likes', requireAuth, asyncHandler( async (req, res) => {
  const storyId = parseInt(req.params.id, 10);
  const loggedUserId = res.locals.user.id
  let likeState = true

  const currentLike = await Like.findOne({
    where: {
      storyId,
      userId: loggedUserId
  }
  })

  if(currentLike) {
    await currentLike.destroy()
    likeState = false
    res.locals.storyId = false
  }

  res.json({currentLike, likeState})
}));


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
    const storyId = req.params.id

    const currentStory = await Story.update({
      category,
      content,
      image,
      location,
    },
    {
      where: {
        id:storyId,
        userId
      }
    })
    // const {category1,content1,image1,location1,userId1 } = currentStory
    // res.render("postPrefilled", {category:category1,content:content1,image:image1,location:location1,userId: userId1});
    // res.json({currentStory})
    res.send(200)

}catch(e){
    res.send(400)
    console.log(e);
}
});


  module.exports = router;
