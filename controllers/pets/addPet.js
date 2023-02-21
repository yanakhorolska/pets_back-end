const { Pet } = require("../../models/petModel");
const { cloudinaryUpload } = require("../../services");

const addPet = async (req, res) => {
  const { _id: id } = req.user;

  const newPet = new Pet({ owner: id, ...req.body });
  if (req.file) {
    const avatarURL = await cloudinaryUpload(req.file, newPet._id, "pets");
    newPet.avatarURL = avatarURL;
  }
  await newPet.save();

  const result = await Pet.findById(newPet._id, "-owner -imagesURL -createdAt -updatedAt")

  res.status(201).json({status: "success", data: result});
};

module.exports = addPet;