const { User } = require("../../models/userModel");

const { cloudinaryUpload } = require('../../services')

const fs = require('fs/promises')

const getBufferFromFile = async (pathToFile) => {
  const buffer = await fs.readFile(pathToFile)
  fs.unlink(pathToFile)
  return buffer
}

const getTempLoad = async (fileToUpload) =>{
  const {path, buffer} = fileToUpload;

  if (!!!path) {
    return buffer
  }
  
  return await getBufferFromFile(path);
}

const updateAvatar = async (req, res, next) => {
  
  const tempUpload = await getTempLoad(req.file);
  const {_id: id} = req.user;

  try {
    const avatarURL = await cloudinaryUpload(tempUpload, id, "avatars")
    await User.findByIdAndUpdate(id, {avatarURL});
    res.json({avatarURL});
  } catch (error) {
    throw error; //!!!
  }
}

module.exports = updateAvatar