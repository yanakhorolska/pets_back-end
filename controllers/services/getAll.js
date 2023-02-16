const { Service } = require("../../models/servicesModel");

async function getAll (req, res) {
    const ourFriends = await Service.find({});
    // console.log(ourFriends);
    res.status(200).json(ourFriends);
}

module.exports = getAll;