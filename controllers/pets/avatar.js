
const { Pet }  = require('../../models/petModel')
const { cloudinaryUpload } = require('../../services')
const { BadRequest } = require('http-errors')

const updateAvatar = async (req, res, next) => {
  console.log("updateAvatar");
  const {_id: owner} = req.user;
  const { petId } = req.params;

  try {
    const avatarURL = await cloudinaryUpload(req.file, petId, "pets")
    await Pet.findByIdAndUpdate(petId, { avatarURL }, {owner},);
    res.json({status: "success", data : avatarURL});
  } catch (error) {
    next( BadRequest(error.message));
  }
}

module.exports = updateAvatar