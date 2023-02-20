const { Pet } = require("../../models/petModel");
const { NotFound } = require('http-errors')


const updateById = async (req, res) => {
  const { _id: owner } = req.user;
  const { petId } = req.params;

  const {
    _id,
    owner: ownerBody,
    createdAt,
    updatedAt,
    avatarURL,
    imagesURL,
    ...fieldtoUpdate
  } = req.body;

  const result = await Pet.findOneAndUpdate(
    { _id: petId, owner },
    fieldtoUpdate,
    { new: true }
  ).select("-owner -imagesURL -createdAt -updatedAt");

  if (!result) throw NotFound("Not found");

  res.json({ status: "success", data: result });
};

module.exports = updateById