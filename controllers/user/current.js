const { User } = require('../../models/userModel');
// const { Pet }  = require('../../models/petModel')

const current = async (req, res) => {
    const {name, birthday, region, city, email, friend} = req.user;

    
    res.json({status: "sucsses", data: {name, birthday, email, region, city, friend}})
}

module.exports = current