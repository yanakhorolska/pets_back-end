const { Pet } = require('../../models/petModel')

const getAll = async (req, res) => {
  //const {_id : id} = req.user;
  // const { page = 1, limit = 10, favorite = {$in : [false, true]} } = req.query;
  const { page = 1, limit = 10, } = req.query;
  
  const skip = (page - 1) * limit;
  const options = { skip, limit: Number(limit), }
  
  const result = await Pet.find({}, "-createdAt -updatedAt", options) //.populate("kind","-createdAt -updatedAt").populate("breed", "-owner -createdAt -updatedAt")
  res.json({status : "sucsess", page, data : result})

}

module.exports = getAll;