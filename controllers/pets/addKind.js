const { Kind } = require('../../models/petModel')

const addKind = async (req, res) => {
  const { name } = req.body

  const newBreed =  await Kind.create({name})

  res.status(201).json({status: "sucsess", data: newBreed })
}

module.exports = addKind