const { Pet } = require('../../models/petModel')
const { NotFound } = require('http-errors')

const getByID = async (req, res) => {
  const { _id: owner } = req.user;
  const { petId } = req.params;
  const result = await Pet.findById(petId).findOne({owner});

  if (!result) 
    throw NotFound()
  
  res.json({ status: "success", data: result });
}

module.exports = getByID