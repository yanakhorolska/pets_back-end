const getAll = require('./getAll')
const getByID = require('./getById')

const addPet = require('./addPet')
const deletePet = require('./deletePet')

const updateById = require('./updateById')
const updateAvatar = require('./avatar')

module.exports = { getAll, getByID, addPet, updateAvatar, updateById, deletePet }