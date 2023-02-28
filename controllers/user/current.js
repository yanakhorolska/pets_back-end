// const { User } = require("../../models/userModel");
const { Unauthorized } = require("http-errors");

const current = async (req, res) => {
  if (!req.user) {
    throw Unauthorized("Missing User in request body!");
  }

  const { name, birthday, email, city, phone, avatarURL } = req.user;
  res.json({
    status: "sucsses",
    data: { name, birthday, email, city, phone, avatarURL },
  });
};

module.exports = current;
