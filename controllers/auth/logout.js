const { User } = require("../../models/userModel");

async function logout(req, res) {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: null });

  return res.status(204).json();
}

module.exports = logout;
