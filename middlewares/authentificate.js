const { User } = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { Unauthorized } = require('http-errors')


const { SECRET_KEY } = process.env;


async function authentificate(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const [type, token] = authHeader.split(" ");
 
  if (type !== "Bearer") {
    return next (Unauthorized("token type is not valid"));
  }

  if (!token) {
    return next (Unauthorized("no token provided"));
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    
    req.user = user;
  } catch (error) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      return next (Unauthorized("jwt token is not valid"));
    }
    throw error;
  }

  next();
}

module.exports = authentificate;

