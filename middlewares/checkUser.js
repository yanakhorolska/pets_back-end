const { User } = require("../models/userModel");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

async function checkUser(req, _, next) {
  const authHeader = req.headers.authorization || "";
  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer" && !token) {
    return next();
  } 

  try {
      const { id } = jwt.verify(token, SECRET_KEY);
      const user = await User.findById(id);
      if (user) req.user = user;
  } catch (error) {}
  
  next();

}

module.exports = checkUser;
