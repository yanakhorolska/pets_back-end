const { User } = require("../models/userModel");
const jwt = require("jsonwebtoken");

const {SECRET_KEY} = process.env;

async function checkUser(req, _, next) {
  const authHeader = req.headers.authorization || "";
  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer" && !token) {
    return next();
  }

  jwt.verify(token, SECRET_KEY, (_, {id}) => {
    if (!id) return next();
    User.findById(id).exec((_, user) => {
      if (user) {
        req.user = user;
        return next();
      }
      return next();
    });
    
  });

}

module.exports = checkUser;
