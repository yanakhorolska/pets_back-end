const { isValidObjectId } = require("mongoose");
const { BadRequest } = require("http-errors");

const isValidId = ( nameParam ) => {
  return (req, _, next) => {
      const paramId = req.params[nameParam];
      if (!isValidObjectId(paramId)) {
        next(BadRequest(`ID: ${paramId} has not correct format!`));
      }
      next();
  }
};

module.exports = isValidId;