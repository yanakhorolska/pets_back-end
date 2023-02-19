const { User } = require("../../models/userModel");
const { cloudinaryUpload } = require('../../services')

const updateAvatar = async (req, res, next) => {
  const {_id: id} = req.user;

  const avatarURL = await cloudinaryUpload(req.file, id, "avatars")
  await User.findByIdAndUpdate(id, {avatarURL});
  res.json({avatarURL});

}

module.exports = updateAvatar