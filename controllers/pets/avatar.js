
const { Pet }  = require('../../models/petModel')
const { cloudinaryUpload } = require('../../services')
const { BadRequest } = require('http-errors')

const getBufferFromFile = async (pathToFile) => {
  const fs = require('fs/promises')

  const buffer = await fs.readFile(pathToFile)
  fs.unlink(pathToFile)
  return buffer
}

const getTempLoad = async (fileToUpload) =>{
  const {path, buffer} = fileToUpload;

  if (!path) {
    return buffer
  }
  
  return await getBufferFromFile(path);
}

const updateAvatar = async (req, res, next) => {
  console.log("updateAvatar");
  const {_id: owner} = req.user;
  const { petId } = req.params;
  const tempUpload = await getTempLoad(req.file);

  try {
    const avatarURL = await cloudinaryUpload(tempUpload, petId, "pets")
    await Pet.findByIdAndUpdate(petId, { avatarURL }, {owner},);
    res.json({avatarURL});
  } catch (error) {
    next( BadRequest(error.message));
  }
}

module.exports = updateAvatar