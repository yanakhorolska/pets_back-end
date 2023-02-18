const { Pet } = require('../../models/petModel');

const addPet = async (req, res) => {
    console.log("addPet");
    const { _id: id} = req.user;

    const newPet = new Pet({owner: id, ...req.body});
    await newPet.save();

    res.status(201).json({status: "sucsess", data: newPet})
}

module.exports = addPet