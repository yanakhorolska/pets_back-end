const getAll = require("./getAll")
const getById = require("./getPetById")

const addPet = require("./addPet");
const deletePet = require("./deletePet")

const updateById = require("./updatePetById")
const updateAvatar = require("./avatar")

module.exports = {
  getAll,
  getById,
  addPet,
  updateAvatar,
  updateById,
  deletePet,
}