const { Sponsor } = require("../../models/sponsorModel");

async function getAll (_, res) {
  const ourFriends = await Sponsor.find({});
  res.json({status: "success", data: ourFriends});
}

module.exports = getAll;