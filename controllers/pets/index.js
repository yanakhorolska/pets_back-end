const getAll = require('./getAll')
const getByID = require('./getByID')


// const getAllKind = require('./getAllKind')
// const getAllBreedOfKind = require('./getAllBreed')

// const addBreed = require('./addBreed')
// const addKind = require('./addKind')

const addPet = require('./addPet')
const deletePet = require('./deletePet')

const updateAvatar = require('./avatar')

// module.exports = { getAll, getByID, getAllKind, getAllBreedOfKind, addKind, addBreed, addPet, deletePet }
module.exports = { getAll, getByID, addPet, updateAvatar, deletePet }