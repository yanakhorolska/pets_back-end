const { isValidObjectId } = require("mongoose");
const { BadRequest } = require("http-errors");

const isValidId = (req, _, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    next(BadRequest(`ID: ${contactId} has not correct format!`));
  }
  next();
};

module.exports = isValidId;
