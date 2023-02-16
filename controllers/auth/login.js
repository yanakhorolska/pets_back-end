const { User } = require("../../models/userModel");
const bcrypt = require("bcrypt");
const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");

async function login(req, res) {
    const { email, password } = req.body;
    
  const storedUser = await User.findOne({ email });
  console.log(storedUser)
  if (!storedUser) {
    throw Unauthorized("Email or password is not valid");
  }

  const isPasswordValid = await bcrypt.compare(password, storedUser.password);

  if (!isPasswordValid) {
    throw Unauthorized("Email or password is not valid");
  }

  const payload = { id: storedUser._id };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
  await User.findByIdAndUpdate(storedUser._id, { token });
  return res.json({
    token: token,
    user: {
        email: email,
        name: storedUser.name,
    },
  });
}

module.exports = login;
