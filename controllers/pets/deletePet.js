
const { Pet } = require('../../models/petModel')
const { NotFound } = require('http-errors')
const { cloudinaryDelete } = require('../../services')

const deletePet = async (req, res) => {
  const { _id: owner } = req.user;
  const { petId } = req.params;

  const result = await Pet.findByIdAndRemove(petId, {owner});

  if (!result ) 
    throw NotFound(`Not find pet with ID: ${petId}`)

  await cloudinaryDelete("pets", petId);

  res.json({ status: "success", data : {message : "pet deleted", id: petId}})
}

module.exports = deletePet