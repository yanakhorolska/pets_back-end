
const { Pet } = require('../../models/petModel');
const { NotFound } = require('http-errors')

const deletePet = async (req, res) => {

  console.log("deletePet");
  const { _id: owner } = req.user;
  const { petId } = req.params

  const result = await Pet.findByIdAndRemove(petId, {owner});

  if (!result ) 
    throw NotFound

  res.json({ message : "pet deleted"})
}

module.exports = deletePet