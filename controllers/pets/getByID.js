const { Pet } = require('../../models/petModel')
const { NotFound } = require('http-errors')

const getById = async (req, res) => {
  console.log("deletePet");
  const { _id: owner } = req.user;
  const { petId } = req.params;

  const result = await Pet.findById(petId).findOne({owner});

  if (!result) 
    throw NotFound("Not found")
  
  res.json({ status: "success", data: result});
}

module.exports = getById