// const { requestError } = require('../helpers');

const validation = (schema, options = {}) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {...schema.options, ...options});
    if (error) {
      // next(requestError(400, error.message));
      return res.status(400).json(error.message)
    }
    next();
  };
};

module.exports = validation;
