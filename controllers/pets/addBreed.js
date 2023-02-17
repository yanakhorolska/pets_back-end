const { Breed } = require('../../models/petModel')

const addBreed = async (req, res) => {
  const { kind, name } = req.body

  const newBreed =  await Breed.create({owner : kind, name})

  res.status(201).json({status: "sucsess", data: newBreed })
}

module.exports = addBreed