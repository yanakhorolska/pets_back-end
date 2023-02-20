const updateAvatar = require('./avatar')
const updateFilds = require('./update')

const currentUser = require('./current')
const userPets = require('./pets')
const userNotices = require('./notices')

module.exports = { 
    currentUser,
    userPets,
    userNotices,
    updateAvatar,
    updateFilds
};