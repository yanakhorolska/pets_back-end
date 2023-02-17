const {Pet} = require('../../models/petModel');

const addPet = async (req, res) => {
    const { _id: id} = req.user;

    const newPet = await new Pet({owner: id, ...req.body});
    newPet.save();

    res.status(201).json({status: "sucsess", data: newPet})
}

module.exports = addPet