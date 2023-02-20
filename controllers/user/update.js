const { User } = require("../../models/userModel");

const update = async (req, res) => {
  const { _id: id } = req.user;

  const {
    _id,
    token,
    password,
    verify,
    createdAt,
    updatedAt,
    avatarURL,
    friends,
    ...fieldtoUpdate
  } = req.body;

  const result = await User.findByIdAndUpdate(
    id,
    fieldtoUpdate,
    { new: true }
  ).select("-_id -token -password -verify -createdAt -updatedAt -friends");

  res.json({ status: "sucsess", data: result });
};

module.exports = update;