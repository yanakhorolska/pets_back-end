const { Pet } = require('../../models/petModel')

const getAll = async (req, res) => {

    const result = await Pet.find({}, "-createdAt -updatedAt").populate("kind","-createdAt -updatedAt").populate("breed", "-owner -createdAt -updatedAt")
    res.json({status : "sucsess", data : result})

}

module.exports = getAll;