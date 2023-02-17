const getAll = require('./getAll')
const getAllKind = require('./getAllKind')
const getAllBreedOfKind = require('./getAllBreed')
const addBreed = require('./addBreed')
const addKind = require('./addKind')

const addPet = require('./addPet')
const deletePet = require('./deletePet')

module.exports = { getAll, getAllKind, getAllBreedOfKind, addKind, addBreed, addPet, deletePet }