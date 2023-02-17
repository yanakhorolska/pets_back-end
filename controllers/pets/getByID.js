const { Pet } = require('../../models/petModel')

const getByID = async (req, res) => {
  const { _id: owner } = req.user;
  const { petId } = req.params;
  const result = await Pet.findById(petId).findOne({owner});

//   if (!result) 
//     throw requestError(404, "Not found")
  res.json({ status: "success", data: result });
}

module.exports = getByID