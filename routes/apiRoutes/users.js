var express = require('express');
var router = express.Router();
const storiesRouter = require('./routes/stories');
const followersRouter = require('./routes/followers');

app.use('/stories', storiesRouter);
app.use('/followers', followersRouter);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
