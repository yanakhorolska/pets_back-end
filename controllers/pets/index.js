const getAll = require('./getAll');
//const getById = require('./getById');//

const addPet = require('./addPet');
const deletePet = require('./deletePet');

const updateById = require('./updateById');
const updateAvatar = require('./avatar');

module.exports = { getAll, addPet, updateAvatar, updateById, deletePet }