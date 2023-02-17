const { Breed } = require('../../models/petModel')

const getAll = async (req, res) => {
    const { kind } = req.body

    const find = !!kind ? {owner: kind}: {}
    const result = await Breed.find(find).populate("owner");
    res.json({status: "sucsess", data: result})
}

module.exports = getAll