const { User } = require("../../models/userModel");
const { cloudinaryUpload } = require('../../services')

const updateAvatar = async (req, res, next) => {
  const {_id: id} = req.user;

  try {
    const avatarURL = await cloudinaryUpload(req.file, id, "avatars")
    await User.findByIdAndUpdate(id, {avatarURL});
    res.json({avatarURL});
  } catch (error) {
    throw error; //!!!
  }
}

module.exports = updateAvatar