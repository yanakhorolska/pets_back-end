const { BadRequest } = require('http-errors') 

const validation = (schema, options = {}) => {
  return (req, _, next) => {
    const { error } = schema.validate(req.body, {
      ...schema.options,
      ...options,
    });
    if (error) {
      next(BadRequest(error.message));
    }
    next();
  };
};

module.exports = validation;