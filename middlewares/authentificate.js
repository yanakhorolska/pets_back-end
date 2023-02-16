const { User } = require("../models/userModel");

const jwt = require("jsonwebtoken");

const { requestError } = require("../helpers");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer" || !token) next(requestError(401, "Not authorized"));
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token) next(requestError(401, "Not authorized"));
    req.user = user;
    next();
  } catch (error) {
    next(requestError(401, error.message));
  }
};

module.exports = authenticate;
