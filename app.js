const createError = require('http-errors');
const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { sequelize } = require('./db/models');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const {asyncHandler, handleValidationErrors, csrfProtection} = require('./utils');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const storiesRouter = require('./routes/stories');
const postsRouter = require('./routes/posts');
const commentsRouter = require('./routes/comments');
const apiStoriesRouter = require('./routes/apiRoutes/stories')
const apiUsersRouter = require('./routes/apiRoutes/users')
const apiCommentsRouter = require('./routes/apiRoutes/comments')
// const personalRouter = require('../routes/personal');

const apiRouter = require('./routes/apiRoutes');

const { restoreUser } = require('./auth')
const { environment, sessionSecret } = require('./config');
const app = express();



// view engine setup
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(sessionSecret));
app.use(express.static(path.join(__dirname, 'public')));
// set up session middleware
const store = new SequelizeStore({ db: sequelize });

app.use(
  session({
    secret: sessionSecret,
    store,
    saveUninitialized: false,
    resave: false,
  })
  );

  app.use(restoreUser)
  // create Session table if it doesn't already exist
  store.sync();


  app.use('/api/stories', apiStoriesRouter)
  app.use('/api/users', apiUsersRouter)
  app.use('/users', usersRouter);
  app.use('/', indexRouter);
  // app.use('/users/:id/', personalRouter);
  app.use('/stories', storiesRouter);
  app.use('/api/comments', apiCommentsRouter)
  app.use('/api', apiRouter)
  app.use('/comments', commentsRouter);
  app.use("/post", postsRouter);


// app.use('/post', postsRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
