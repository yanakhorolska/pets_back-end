const { servicesModel } = require("../models");

async function servicesControllers(req, res) {
    const ourFriends = await servicesModel.find();
    // console.log(ourFriends);
    res.status(200).json(ourFriends);
}

module.exports = {
    servicesControllers,
};