const { User } = require("../../models/userModel");
const { Unauthorized } = require("http-errors");

async function login(req, res) {
  const { email, password } = req.body;

  const storedUser = await User.findOne({ email });

  if (!storedUser) {
    throw Unauthorized("Email or password is not valid");
  }

  if (!storedUser.isValidPassword(password)) {
    throw Unauthorized("Email or password is not valid");
  }

  const token = storedUser.getToken();

  res.json({
    token,
    user: {
        email,
        name: storedUser.name,
    },
  });
}

module.exports = login;
