const { Pet } = require('../../models/petModel')

const petsUser = async (req, res) => {
  const {_id: id} = req.user;

  const result = await Pet.find({owner: id}, "-owner -imagesURL -createdAt -updatedAt")

  res.json({status: "sucsses", data: result})
}

module.exports = petsUser