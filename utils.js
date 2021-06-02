const {validationResult} = require ('express-validator');
const csrf = require('csurf');

const csrfProtection = csrf({ cookie: true });

const asyncHandler = (handler) => (req,res,next) => handler(req, res, next).catch(next);

const handleValidationErrors = (req, res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      const errors = validationErrors.array().map((error) => error.msg);

      const err = Error("Bad request.");
      err.errors = errors;
      err.status = 400;
      err.title = "Bad request.";
      return next(err);
    }
    next();
};

const validationErrorsSummary = (errors) => {
  errors.forEach(error => {
    console.log(error)
    //still have to create divs and show the errors here
  })
}


module.exports = {asyncHandler, handleValidationErrors, csrfProtection};
