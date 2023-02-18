const { User } = require("../../models/userModel");
const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env

async function login(req, res) {
    const { email, password } = req.body;
    
  const storedUser = await User.findOne({ email });

  if (!storedUser) {
    throw Unauthorized("Email or password is not valid");
  }

  // const isPasswordValid = await bcrypt.compare(password, storedUser.password);

  User.isValidPassword(password)

  if (!isPasswordValid) {
    throw Unauthorized("Email or password is not valid");
  }

  const payload = { id: storedUser._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(storedUser._id, { token });
  return res.json({
    token,
    user: {
        email,
        name: storedUser.name,
    },
  });
}

module.exports = login;
