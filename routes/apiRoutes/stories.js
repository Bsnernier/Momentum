
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

const { Story, User } = db;

// router.use(requireAuth);

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.get(
    "/",
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
    validateStory,
    jsonParser,
    asyncHandler(async (req, res) => {
      const { content, image, location } = req.body;
      console.log(req.body);
      try{
        // const user = await User.create({ username: "XXX", firstName: "Jia", lastName:"X", email:"xyz@gmail.com", password:"dxaid#!"})
        const story = await Story.create({ category: "a", content, image, location, userId: 1 });
        res.json({user, story})
      }catch(e){
        console.log(e);
      }


    //   console.log(story);
    })
);

// router.put(
//     "/:id",
//     validateStory,
//     asyncHandler(async (req, res, next) => {
//       const story = await Story.findOne({
//         where: {
//           id: req.params.id,
//         },
//       });
//       if (req.user.id !== story.userId) {
//         const err = new Error("Unauthorized");
//         err.status = 401;
//         err.message = "You are not authorized to edit this story.";
//         err.title = "Unauthorized";
//         throw err;
//       }
//       if (story) {
//         await story.update({ content: req.body.content, image: req.body.image, location: req.body.location, userId: req.body.userId});
//         res.json({ story});
//       } else {
//         next(storyNotFoundError(req.params.id));
//       }
//     })
//   );


//   router.delete(
//     "/:id",
//     asyncHandler(async (req, res, next) => {
//       const story = await Story.findOne({
//         where: {
//           id: req.params.id,
//         },
//       });
//       if (req.user.id !== story.userId) {
//         const err = new Error("Unauthorized");
//         err.status = 401;
//         err.message = "You are not authorized to delete this story.";
//         err.title = "Unauthorized";
//         throw err;
//       }
//       if (story) {
//         await story.destroy();
//         res.json({ message: `Deleted story with id of ${req.params.id}.` });
//       } else {
//         next(storyNotFoundError(req.params.id));
//       }
//     })
//   );

  module.exports = router;
