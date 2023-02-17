const { Kind } = require('../../models/petModel')

const getAllKind = async (req, res) => {
  const result = await Kind.find({})
  res.json({status: "sucsess", data: result})
}

module.exports = getAllKind