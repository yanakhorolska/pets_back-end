const { Pet } = require("../../models/petModel");
const { NotFound } = require('http-errors')


const updateById = async (req, res) => {
  const { _id: owner } = req.user;
  const { petId } = req.params;

  const result = await Pet.findByIdAndUpdate(petId , req.body, { new: true}, ).findOne({owner})
  
  if (!result) 
    throw NotFound("Not found")

  res.json({ status: "success", data: result})
}

module.exports = updateById