const { User } = require("../../models/userModel");

const { cloudinaryUpload } = require('../../services')

const fs = require('fs/promises')

const updateAvatar = async (req, res, next) => {
  const {path: tempUpload, originalname} = req.file;
  const {_id: id} = req.user;
  
  try {
    const avatarURL = await cloudinaryUpload(tempUpload, id, "avatars")
    await User.findByIdAndUpdate(id, {avatarURL});
    res.json({avatarURL});
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
}

module.exports = updateAvatar