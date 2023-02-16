const { requestError } = require('../helpers');

const validation = (schema, options = {}) => {
  return (req, _, next) => {
    const { error } = schema.validate(req.body, {...schema.options, ...options});
    if (error) {
      next(requestError(400, error.message));
    }
    next();
  };
};

module.exports = validation;
